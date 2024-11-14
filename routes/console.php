<?php

use App\Models\PostSchedule;
use App\Models\SocialAccount;
use GuzzleHttp\Client;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Subscriber\Oauth\Oauth1;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Schedule::call(function () {

    $posts = PostSchedule::with('socialAccount:id,social_media_type,api_token,api_token_secret')->get();
    foreach ($posts as $post) {

        if (($post->post_date <= date("Y-m-d H:i:s") && $post->status == 'posted') || $post->post_date > date("Y-m-d H:i:s")) {
            continue;
        }
        error_log($post->socialAccount);

        foreach ($post->socialAccount as $social_account) {
            if ($social_account->social_media_type == "tumblr") {
                // Set up the Tumblr client
                $client = new Tumblr\API\Client(env('TUMBLR_CLIENT_ID'), env('TUMBLR_CLIENT_SECRET'));
                $client->setToken($social_account->api_token, $social_account->api_token_secret);

                // Get the blog name
                $blogName = '';
                foreach ($client->getUserInfo()->user->blogs as $blog) {
                    if ($blog->primary) {
                        $blogName = $blog->name;
                        break;
                    }
                }

                // Prepare upload data
                if ($post->image != null) {
                    $image = Storage::disk('local')->path($post->image);
                    $end = explode('.', $image);
                    $uploadData = [
                        'multipart' => [
                            [
                                'name' => 'json',
                                'contents' => json_encode([
                                    'content' => [
                                        [
                                            'type' => 'text',
                                            'subtype' => 'heading1',
                                            'text' => $post->title
                                        ],
                                        [
                                            'type' => 'text',
                                            'text' => $post->body
                                        ],
                                        [
                                            'type' => 'image',
                                            'media' => [
                                                'type' => 'image/' . end($end),
                                                'identifier' => 'image',
                                                'width' => getimagesize($image)[0],
                                                'height' => getimagesize($image)[1]
                                            ]
                                        ]
                                    ],
                                ])
                            ],
                            [
                                'name' => 'image',
                                'contents' => fopen($image, 'r'),
                                'filename' => 'image.jpg',
                            ]
                        ]
                    ];
                } else {
                    $uploadData = [
                        'json' => [
                            'content' => [
                                [
                                    "type" => "text",
                                    "subtype" => "heading1",
                                    "text" => $post->title
                                ],
                                [
                                    "type" => "text",
                                    "text" => $post->body
                                ]
                            ],
                        ]
                    ];
                }

                // Post to Tumblr
                $stack = HandlerStack::create();
                $middleware = new Oauth1([
                    'consumer_key' => env('TUMBLR_CLIENT_ID'),
                    'consumer_secret' => env('TUMBLR_CLIENT_SECRET'),
                    'token' => $social_account->api_token,
                    'token_secret' => $social_account->api_token_secret
                ]);
                $stack->push($middleware);

                $client2 = new Client([
                    'base_uri' => 'https://api.tumblr.com/v2/',
                    'handler' => $stack,
                    'auth' => 'oauth'
                ]);

                $res = $client2->post('blog/' . $blogName . '/posts/', $uploadData);
                
            }if ($social_account->social_media_type == "twitter") {
                error_log("twitter why");
                $uploadData = [];
                $dateTime = new DateTime($post->post_date);
                $stack = HandlerStack::create();

                $middleware = new Oauth1([
                    'consumer_key' => env('TWITTER_CLIENT_ID'),
                    'consumer_secret' => env('TWITTER_CLIENT_SECRET'),
                    'token' => $social_account->api_token,
                    'token_secret' => $social_account->api_token_secret
                ]);
                $stack->push($middleware);

                $client2 = new Client([
                    'base_uri' => '',
                    'handler' => $stack,
                    'auth' => 'oauth'
                ]);
                if ($post->image != null) {
                    $image = Storage::disk('local')->path($post->image);
                    //$base64 = base64_encode(fopen($image, 'r'));





                    $uploadImageData = [
                        'multipart' => [
                            [
                                'name' => 'media',
                                'contents' => fopen($image, 'r')
                            ]
                        ]
                    ];

                    $res = $client2->post('https://upload.twitter.com/1.1/media/upload.json', $uploadImageData);

                    $responseBody = json_decode($res->getBody(), true);
                    $image_id = $responseBody['media_id_string'];

                    $uploadData = [
                        'json' => [
                            'text' => $post->title . ': ' . $post->body,
                            'media' => [
                                'media_ids' => [$image_id]
                            ]
                        ]
                    ];
                } else {
                    $uploadData = [
                        'json' => [
                            'text' => $post->title . ': ' . $post->body
                        ]
                    ];
                }


                $res2 = $client2->post('https://api.x.com/2/tweets', $uploadData);

                error_log($res2->getBody());





            }
        }


        $poste = PostSchedule::find($post->id);
        $poste->status = 'posted';
        $poste->save();
    }



})->everyMinute();

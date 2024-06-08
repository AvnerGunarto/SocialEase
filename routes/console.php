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
        $uploadData = [];
        $dateTime = new DateTime($post->post_date);
        if ($post->image != null) {
            $image = Storage::disk('local')->path($post->image);
            $end = explode('.', $image);
            $uploadData = [
                'multipart' =>
                [
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
            error_log(json_encode($uploadData));
        }
        else {
            $uploadData = ['json' => [
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

            ]];
        }
        $blogName = '';
        $client = new Tumblr\API\Client(env('TUMBLR_CLIENT_ID'), env('TUMBLR_CLIENT_SECRET'));
        foreach ($post->SocialAccount as $social_account) {
            $account = SocialAccount::find($social_account->id);
            if ($account->social_media_type == 'tumblr') {
                $client->setToken($account->api_token, $account->api_token_secret);
                break;
            }
        }
        foreach ($client->getUserInfo()->user->blogs as $blog) {
            if ($blog->primary) {
                $blogName = $blog->name;
                break;
            }
        }





        foreach ($post->SocialAccount as $social_account) {
            $account = SocialAccount::find($social_account->id);
            if ($account->social_media_type == 'tumblr') {
                $stack = HandlerStack::create();

                $middleware = new Oauth1([
                    'consumer_key'    => env('TUMBLR_CLIENT_ID'),
                    'consumer_secret' => env('TUMBLR_CLIENT_SECRET'),
                    'token'           => $account->api_token,
                    'token_secret'    => $account->api_token_secret
                ]);
                $stack->push($middleware);

                $client2 = new Client([
                    'base_uri' => 'https://api.tumblr.com/v2/',
                    'handler' => $stack,
                    'auth' => 'oauth'
                ]);

                $res = $client2->post('blog/' . $blogName . '/posts/', $uploadData);
            }
        }
        $poste = PostSchedule::find($post->id);
        $poste->status = 'posted';
        $poste->save();
    }
})->everyMinute();

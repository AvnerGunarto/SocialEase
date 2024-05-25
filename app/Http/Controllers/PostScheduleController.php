<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\PostSchedule;
use App\Models\SocialAccount;
use DateInterval;
use DateTime;
use GuzzleHttp\Client;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Subscriber\Oauth\Oauth1;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Tumblr;

class PostScheduleController extends Controller
{

    public function index(): Response
    {
        // $postSchedules = PostSchedule::where('user_id',Auth::id())->orderBy('post_date', 'asc')->get();
        $postSchedules = PostSchedule::with('socialAccount')->where('user_id', Auth::id())->WhereDate('post_date', '>', date("Y-m-d H:i:s"))->orderBy('post_date', 'asc')->get();
        $social_accounts = SocialAccount::where('user_id', Auth::id())->orderBy('social_media_type')->get();
        return Inertia::render('Dashboard', [
            'postSchedules' => $postSchedules,
            'socialAccounts' => $social_accounts,
            'submitted' => request('submitted'),
        ]);
    }

    public function showHistory()
    {
        $postSchedules = PostSchedule::with('socialAccount')->where('user_id', Auth::id())->WhereDate('post_date', '<=', date("Y-m-d H:i:s"))->orderBy('post_date', 'asc')->get();
        $social_accounts = SocialAccount::where('user_id', Auth::id())->orderBy('social_media_type')->get();
        return Inertia::render('PostHistory', [
            'postSchedules' => $postSchedules,
            'socialAccounts' => $social_accounts,
            'submitted' => request('submitted'),
        ]);
    }

    public function create()
    {
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'body' => 'required|string',
            'social_account' => 'required',
            'post_title' => 'required|string',
            'post_date' => 'required|date|after:today',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        $uploadData = [];
        $dateTime = new DateTime($request->post_date);
        $image = null;
        if ($request->file('image') !== null) {
            $image = $request->file('image')->store('images');
            // $uploadData = [
            //     'multipart' =>
            //     [
            //         [
            //             'name' => 'json',
            //             'contents' => json_encode([
            //                 'content' => [
            //                     [
            //                         'type' => 'text',
            //                         'subtype' => 'heading1',
            //                         'text' => $request->post_title
            //                     ],
            //                     [
            //                         'type' => 'text',
            //                         'text' => $request->body
            //                     ],
            //                     [
            //                         'type' => 'image',
            //                         'media' => [
            //                             'type' => 'image/' . $request->file('image')->extension(),
            //                             'identifier' => 'image',
            //                             'width' => getimagesize($image)[0],
            //                             'height' => getimagesize($image)[1]
            //                         ]
            //                     ]
            //                 ],
            //                 'state' => 'queue',
            //                 'publish_on' => $dateTime->sub(new DateInterval('PT7H'))->format(DateTime::ATOM)



            //             ])
            //         ],
            //         [
            //             'name' => 'image',
            //             'contents' => fopen($request->file('image'), 'r'),
            //             'filename' => 'image.jpg',
            //         ]


            //     ]
            // ];

        }
        // else {
        //     $uploadData = ['json' => [
        //         'content' => [
        //             [
        //                 "type" => "text",
        //                 "subtype" => "heading1",
        //                 "text" => $request->post_title
        //             ],
        //             [
        //                 "type" => "text",
        //                 "text" => $request->body
        //             ]
        //         ],
        //         'state' => 'queue',
        //         'publish_on' => $dateTime->sub(new DateInterval('PT7H'))->format(DateTime::ATOM)
        //     ]];
        // }
        // $blogName = '';
        // $client = new Tumblr\API\Client(env('TUMBLR_CLIENT_ID'), env('TUMBLR_CLIENT_SECRET'));
        // foreach ($request->social_account as $social_account) {
        //     $account = SocialAccount::find($social_account);
        //     if ($account->social_media_type == 'tumblr') {
        //         $client->setToken($account->api_token, $account->api_token_secret);
        //         break;
        //     }
        // }
        // foreach ($client->getUserInfo()->user->blogs as $blog) {
        //     if ($blog->primary) {
        //         $blogName = $blog->name;
        //         break;
        //     }
        // }





        // foreach ($request->social_account as $social_account) {
        //     $account = SocialAccount::find($social_account);
        //     if ($account->social_media_type == 'tumblr') {
        //         $stack = HandlerStack::create();

        //         $middleware = new Oauth1([
        //             'consumer_key'    => env('TUMBLR_CLIENT_ID'),
        //             'consumer_secret' => env('TUMBLR_CLIENT_SECRET'),
        //             'token'           => $account->api_token,
        //             'token_secret'    => $account->api_token_secret
        //         ]);
        //         $stack->push($middleware);

        //         $client2 = new Client([
        //             'base_uri' => 'https://api.tumblr.com/v2/',
        //             'handler' => $stack,
        //             'auth' => 'oauth'
        //         ]);

        //         $res = $client2->post('blog/' . $blogName . '/posts/', $uploadData);
        //     }
        // }

        $postSchedule = PostSchedule::create([
            'user_id' => Auth::id(),
            'title' => $request->post_title,
            'body' => $request->body,
            'post_date' => $request->post_date,
            'image' => $image,
            'post_id' => 'placeholder'
        ]);

        foreach ($request->social_account as $social_account) {
            $postSchedule->socialAccount()->attach($social_account);
        }
        return redirect()->route('dashboard', ['submitted' => true]);
    }

    public function edit(PostSchedule $postSchedule)
    {
    }

    public function update(Request $request, PostSchedule $postSchedule): RedirectResponse
    {
        $request->validate([
            'body' => 'required|string',
            'social_account' => 'required',
            'post_title' => 'required|string',
            'post_date' => 'required|date|after:today',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $image = null;
        if ($request->file('image') !== null) {
            $image = $request->file('image')->store('images');
        }

        $postSchedule->update(
            [
                'title' => $request->post_title,
                'body' => $request->body,
                'post_date' => $request->post_date,
                'image' => $image,
            ]

        );
        foreach ($request->social_account as $social_account) {
            $postSchedule->socialAccount()->sync($social_account);
        }
        return redirect()->route('dashboard');
    }

    public function destroy(PostSchedule $postSchedule): RedirectResponse
    {
        $postSchedule->delete();

        return redirect()->route('dashboard');
    }
}

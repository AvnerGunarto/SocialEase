<?php

namespace App\Http\Controllers;

use App\Models\SocialAccount;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Auth;
use Tumblr\API\Client as API;


class AnalyticsController extends Controller
{
    private function getAccount()
    {
        $accounts = SocialAccount::where("user_id", Auth::id())->get();
        foreach ($accounts as $account) {
            if ($account->social_media_type == "tumblr") {
                return $account;
            }

        }
        return null;
    }

    public function getTumblrPosts(Request $request)
    {
        $account = $this->getAccount();
        $client = new API(env('TUMBLR_CLIENT_ID'), env('TUMBLR_CLIENT_SECRET'));
        $client->setToken($account->api_token, $account->api_token_secret);
        foreach ($client->getUserInfo()->user->blogs as $blog) {
            if ($blog->primary) {
                $blogName = $blog->name;
                break;
            }
        }

        $client = new Client();
        $limit = $request->input('limit', 99999); // Default limit is 10

        try {
            // Fetch text posts
            $textPostsResponse = $client->request('GET', 'https://api.tumblr.com/v2/blog/' . $blogName . '/posts/text', [
                'query' => [
                    'notes_info' => 'true',
                    'limit' => $limit,
                ],
                'headers' => [
                    'Authorization' => 'OAuth ' . $this->getOauthHeader($account, $blogName)
                ]
            ]);

            // Fetch photo posts
            $photoPostsResponse = $client->request('GET', 'https://api.tumblr.com/v2/blog/' . $blogName . '/posts/photo', [
                'query' => [
                    'notes_info' => 'true',
                    'limit' => $limit,
                ],
                'headers' => [
                    'Authorization' => 'OAuth ' . $this->getOauthHeader($account, $blogName)
                ]
            ]);

            $textPostsData = json_decode($textPostsResponse->getBody(), true);
            $photoPostsData = json_decode($photoPostsResponse->getBody(), true);

            // Combine the results
            $postsData = $this->extractPostDetails(array_merge($textPostsData['response']['posts'], $photoPostsData['response']['posts']));

            // Return JSON response
            return response()->json($postsData);
        } catch (\Exception $e) {
            \Log::error('Error fetching Tumblr posts: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch Tumblr posts'], 500);
        }
    }

    private function getOauthHeader(SocialAccount $socialAccount, $blogName)
    {
        $consumerKey = env('TUMBLR_CLIENT_ID');
        $consumerSecret = env('TUMBLR_CLIENT_SECRET');
        $token = $socialAccount->api_token;
        $tokenSecret = $socialAccount->api_token_secret;

        $oauth = [
            'oauth_consumer_key' => $consumerKey,
            'oauth_token' => $token,
            'oauth_nonce' => (string) mt_rand(),
            'oauth_timestamp' => time(),
            'oauth_signature_method' => 'HMAC-SHA1',
            'oauth_version' => '1.0'
        ];

        $baseInfo = $this->buildBaseString('https://api.tumblr.com/v2/blog' . $blogName . 'posts/text', 'GET', $oauth);
        $compositeKey = rawurlencode($consumerSecret) . '&' . rawurlencode($tokenSecret);
        $oauthSignature = base64_encode(hash_hmac('sha1', $baseInfo, $compositeKey, true));
        $oauth['oauth_signature'] = $oauthSignature;

        $header = 'OAuth ';
        $values = [];
        foreach ($oauth as $key => $value) {
            $values[] = "$key=\"" . rawurlencode($value) . "\"";
        }
        $header .= implode(', ', $values);
        return $header;
    }

    private function buildBaseString($baseURI, $method, $params)
    {
        $r = [];
        ksort($params);
        foreach ($params as $key => $value) {
            $r[] = "$key=" . rawurlencode($value);
        }
        return $method . "&" . rawurlencode($baseURI) . '&' . rawurlencode(implode('&', $r));
    }

    private function extractPostDetails($posts)
    {
        $postsData = [];
        $totalLikes = 0;
        $totalReblogs = 0;
        $totalComments = 0;

        foreach ($posts as $post) {
            $likes = 0;
            $reblogs = 0;
            $comments = 0;

            if (isset($post['notes'])) {
                foreach ($post['notes'] as $note) {
                    if ($note['type'] == 'like') {
                        $likes++;
                    } elseif ($note['type'] == 'reblog') {
                        $reblogs++;
                    } elseif ($note['type'] == 'reply') {
                        $comments++;
                    }
                }
            }

            $postsData[] = [
                'id' => $post['id'],
                'likes' => $likes,
                'reblogs' => $reblogs,
                'comments' => $comments,
            ];

            $totalLikes += $likes;
            $totalReblogs += $reblogs;
            $totalComments += $comments;
        }

        return [
            'posts' => $postsData,
            'total_likes' => $totalLikes,
            'total_reblogs' => $totalReblogs,
            'total_comments' => $totalComments,
            'total_posts' => count($posts),
        ];
    }
}

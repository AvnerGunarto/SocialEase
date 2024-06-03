<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class AnalyticsController extends Controller
{
    public function getTumblrPosts(Request $request)
    {
        $client = new Client();
        $limit = $request->input('limit', 10); // Default limit is 10

        try {
            // Fetch text posts
            $textPostsResponse = $client->request('GET', 'https://api.tumblr.com/v2/blog/yantvyu.tumblr.com/posts/text', [
                'query' => [
                    'notes_info' => 'true',
                    'limit' => $limit,
                ],
                'headers' => [
                    'Authorization' => 'OAuth ' . $this->getOauthHeader()
                ]
            ]);

            // Fetch photo posts
            $photoPostsResponse = $client->request('GET', 'https://api.tumblr.com/v2/blog/yantvyu.tumblr.com/posts/photo', [
                'query' => [
                    'notes_info' => 'true',
                    'limit' => $limit,
                ],
                'headers' => [
                    'Authorization' => 'OAuth ' . $this->getOauthHeader()
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

    private function getOauthHeader()
    {
        $consumerKey = env('TUMBLR_CLIENT_ID');
        $consumerSecret = env('TUMBLR_CLIENT_SECRET');
        $token = env('TUMBLR_TOKEN');
        $tokenSecret = env('TUMBLR_TOKEN_SECRET');

        $oauth = [
            'oauth_consumer_key' => $consumerKey,
            'oauth_token' => $token,
            'oauth_nonce' => (string) mt_rand(),
            'oauth_timestamp' => time(),
            'oauth_signature_method' => 'HMAC-SHA1',
            'oauth_version' => '1.0'
        ];

        $baseInfo = $this->buildBaseString('https://api.tumblr.com/v2/blog/yantvyu.tumblr.com/posts/text', 'GET', $oauth);
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

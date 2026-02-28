<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'flexoffers' => [
        'advertiser_id' => env('FLEXOFFERS_ADVERTISER_ID', '858300D2-9FD5-4288-94E8-96FB1ECA320F'),
        'postback_url' => env('FLEXOFFERS_POSTBACK_URL', 'https://track.flexlinkspro.com/da.ashx'),
        'timeout' => (int) env('FLEXOFFERS_TIMEOUT', 10),
        'default_order_amount' => env('FLEXOFFERS_DEFAULT_ORDER_AMOUNT'),
        'default_currency' => env('FLEXOFFERS_DEFAULT_CURRENCY', 'USD'),
        'default_geo' => env('FLEXOFFERS_DEFAULT_GEO', 'USA'),
    ],

];

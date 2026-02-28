<?php

declare(strict_types=1);

require __DIR__ . '/common.php';

apply_cors_headers();
handle_options_preflight();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    send_json(405, [
        'status' => 'failed',
        'message' => 'Method not allowed. Use POST.',
    ]);
}

$payload = read_json_payload();

$clickId = trim((string) ($payload['clickid'] ?? ''));
$orderNumber = trim((string) ($payload['ordernumber'] ?? ''));
$orderAmount = $payload['orderamount'] ?? null;

if ($clickId === '' || $orderNumber === '' || !is_numeric($orderAmount)) {
    send_json(422, [
        'status' => 'failed',
        'message' => 'Missing required fields: clickid, ordernumber, orderamount.',
    ]);
}

$clickIdLower = strtolower($clickId);
if ($clickIdLower === 'refid' || strlen($clickId) < 12) {
    send_json(422, [
        'status' => 'failed',
        'message' => 'Invalid clickid. Use the real FlexOffers click ID from the refid URL parameter or Diagnosis Tool.',
    ]);
}

$advertiserId = trim((string) (getenv('FLEXOFFERS_ADVERTISER_ID') ?: '858300D2-9FD5-4288-94E8-96FB1ECA320F'));
$postbackBase = trim((string) (getenv('FLEXOFFERS_POSTBACK_URL') ?: 'https://track.flexlinkspro.com/da.ashx'));

$query = [
    'advertiserid' => $advertiserId,
    'clickid' => $clickId,
    'orderamount' => number_format((float) $orderAmount, 2, '.', ''),
    'ordernumber' => $orderNumber,
];

$coupon = trim((string) ($payload['coupon'] ?? ''));
if ($coupon !== '') {
    $query['coupon'] = $coupon;
}

$currency = strtoupper(trim((string) ($payload['currency'] ?? 'USD')));
if ($currency !== '') {
    $query['currency'] = $currency;
}

$geo = strtoupper(trim((string) ($payload['geo'] ?? 'USA')));
if ($geo !== '') {
    $query['geo'] = $geo;
}

$commissionId = trim((string) ($payload['commissionid'] ?? ''));
if ($commissionId !== '') {
    $query['commissionid'] = $commissionId;
}

$postbackUrl = $postbackBase . '?' . http_build_query($query, '', '&', PHP_QUERY_RFC3986);

$containsOrderItems = isset($payload['order_items']) && is_array($payload['order_items']);
$jsonBody = $containsOrderItems
    ? json_encode(['order_items' => $payload['order_items']], JSON_UNESCAPED_SLASHES)
    : null;
$postPayload = $jsonBody ?? '{}';

// Primary conversion fire: GET request is the most reliable for da.ashx.
$getResponse = send_http_request($postbackUrl, 'GET', null);
$getBody = (string) $getResponse['body'];
$getBodyLower = strtolower($getBody);
$getContainsNoClick = strpos($getBodyLower, 'no click id found') !== false;
$getContainsServerError = strpos($getBodyLower, '/errors/500') !== false || strpos($getBodyLower, 'object moved') !== false;
$getSuccessful = $getResponse['status'] >= 200 && $getResponse['status'] < 300 && !$getContainsNoClick && !$getContainsServerError;

if ($getContainsNoClick) {
    send_json(422, [
        'status' => 'failed',
        'message' => 'FlexOffers rejected the click ID (No click ID found).',
        'postback_url' => $postbackUrl,
        'http_status' => $getResponse['status'],
        'response_body' => substr($getBody, 0, 1000),
    ]);
}

if ($getSuccessful && !$containsOrderItems) {
    send_json(200, [
        'status' => 'sent',
        'message' => 'FlexOffers postback sent.',
        'postback_url' => $postbackUrl,
        'http_status' => $getResponse['status'],
        'response_body' => substr($getBody, 0, 1000),
    ]);
}

if ($getSuccessful && $containsOrderItems) {
    // Optional product payload (best effort): do not block conversion success.
    $postResponse = send_http_request($postbackUrl, 'POST', $postPayload);
    $postBody = (string) $postResponse['body'];
    $postBodyLower = strtolower($postBody);
    $postContainsServerError = strpos($postBodyLower, '/errors/500') !== false || strpos($postBodyLower, 'object moved') !== false;
    $postSuccessful = $postResponse['status'] >= 200 && $postResponse['status'] < 300 && !$postContainsServerError;

    $response = [
        'status' => 'sent',
        'message' => 'FlexOffers conversion sent via GET.',
        'postback_url' => $postbackUrl,
        'http_status' => $getResponse['status'],
        'response_body' => substr($getBody, 0, 1000),
    ];

    $response['order_items_status'] = $postSuccessful ? 'sent' : 'failed';
    if (!$postSuccessful) {
        $response['order_items_warning'] = 'Order items POST failed but conversion GET succeeded.';
        $response['order_items_http_status'] = $postResponse['status'];
        $response['order_items_response_body'] = substr($postBody, 0, 1000);
    }

    send_json(200, $response);
}

// If GET did not succeed and did not report "No click ID found", try POST as a fallback.
$postFallback = send_http_request($postbackUrl, 'POST', $postPayload);
$postFallbackBody = (string) $postFallback['body'];
$postFallbackLower = strtolower($postFallbackBody);
$postFallbackContainsNoClick = strpos($postFallbackLower, 'no click id found') !== false;
$postFallbackContainsServerError = strpos($postFallbackLower, '/errors/500') !== false || strpos($postFallbackLower, 'object moved') !== false;
$postFallbackSuccessful = $postFallback['status'] >= 200 && $postFallback['status'] < 300 && !$postFallbackContainsNoClick && !$postFallbackContainsServerError;

if ($postFallbackContainsNoClick) {
    send_json(422, [
        'status' => 'failed',
        'message' => 'FlexOffers rejected the click ID (No click ID found).',
        'postback_url' => $postbackUrl,
        'http_status' => $postFallback['status'],
        'response_body' => substr($postFallbackBody, 0, 1000),
    ]);
}

if ($postFallbackSuccessful) {
    send_json(200, [
        'status' => 'sent',
        'message' => 'FlexOffers postback sent.',
        'postback_url' => $postbackUrl,
        'http_status' => $postFallback['status'],
        'response_body' => substr($postFallbackBody, 0, 1000),
    ]);
}

$failure = [
    'status' => 'failed',
    'message' => 'FlexOffers postback returned an error response.',
    'postback_url' => $postbackUrl,
    'http_status' => $getResponse['status'],
    'response_body' => substr($getBody, 0, 1000),
    'post_http_status' => $postFallback['status'],
    'post_response_body' => substr($postFallbackBody, 0, 1000),
];

if ($getResponse['error'] !== null) {
    $failure['error'] = $getResponse['error'];
}
if ($postFallback['error'] !== null) {
    $failure['post_error'] = $postFallback['error'];
}

send_json(502, $failure);

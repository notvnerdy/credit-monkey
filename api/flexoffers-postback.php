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

$jsonBody = null;
if (isset($payload['order_items']) && is_array($payload['order_items'])) {
    $jsonBody = json_encode(['order_items' => $payload['order_items']], JSON_UNESCAPED_SLASHES);
}

$response = post_request($postbackUrl, $jsonBody);

$responseBody = (string) $response['body'];
$bodyLower = strtolower($responseBody);
$containsNoClick = strpos($bodyLower, 'no click id found') !== false;
$containsServerError = strpos($bodyLower, '/errors/500') !== false || strpos($bodyLower, 'object moved') !== false;

if ($response['status'] >= 200 && $response['status'] < 300 && !$containsNoClick && !$containsServerError) {
    send_json(200, [
        'status' => 'sent',
        'message' => 'FlexOffers postback sent.',
        'postback_url' => $postbackUrl,
        'http_status' => $response['status'],
        'response_body' => substr($responseBody, 0, 1000),
    ]);
}

if ($containsNoClick) {
    send_json(422, [
        'status' => 'failed',
        'message' => 'FlexOffers rejected the click ID (No click ID found).',
        'postback_url' => $postbackUrl,
        'http_status' => $response['status'],
        'response_body' => substr($responseBody, 0, 1000),
    ]);
}

$failure = [
    'status' => 'failed',
    'message' => 'FlexOffers postback returned an error response.',
    'postback_url' => $postbackUrl,
    'http_status' => $response['status'],
    'response_body' => substr($responseBody, 0, 1000),
];

if ($response['error'] !== null) {
    $failure['error'] = $response['error'];
}

send_json(502, $failure);

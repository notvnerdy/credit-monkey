<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Throwable;

class FlexOffersPostbackService
{
    public function send(array $payload, ?int $leadId = null): array
    {
        $advertiserId = trim((string) config('services.flexoffers.advertiser_id', ''));
        $postbackBase = trim((string) config('services.flexoffers.postback_url', 'https://track.flexlinkspro.com/da.ashx'));

        if ($advertiserId === '') {
            return $this->skipped('FlexOffers advertiser ID is not configured.', $leadId);
        }

        $clickId = trim((string) ($payload['clickid'] ?? ''));
        if ($clickId === '') {
            return $this->skipped('Missing clickid (refid).', $leadId);
        }

        $orderAmount = $payload['orderamount'] ?? config('services.flexoffers.default_order_amount');
        if ($orderAmount === null || $orderAmount === '') {
            return $this->skipped('Missing orderamount and no default is configured.', $leadId);
        }

        if (!is_numeric($orderAmount)) {
            return $this->skipped('Invalid orderamount. Expected a numeric value.', $leadId);
        }

        $normalizedAmount = number_format((float) $orderAmount, 2, '.', '');

        $orderNumber = trim((string) ($payload['ordernumber'] ?? ''));
        if ($orderNumber === '') {
            $orderNumber = $leadId !== null
                ? 'LEAD-' . $leadId
                : 'ORDER-' . now()->format('YmdHisv');
        }

        $query = [
            'advertiserid' => $advertiserId,
            'clickid' => $clickId,
            'orderamount' => $normalizedAmount,
            'ordernumber' => $orderNumber,
        ];

        $coupon = trim((string) ($payload['coupon'] ?? ''));
        if ($coupon !== '') {
            $query['coupon'] = $coupon;
        }

        $currency = strtoupper(trim((string) ($payload['currency'] ?? config('services.flexoffers.default_currency', 'USD'))));
        if ($currency !== '') {
            $query['currency'] = $currency;
        }

        $geo = strtoupper(trim((string) ($payload['geo'] ?? config('services.flexoffers.default_geo', 'USA'))));
        if ($geo !== '') {
            $query['geo'] = $geo;
        }

        $commissionId = trim((string) ($payload['commissionid'] ?? ''));
        if ($commissionId !== '') {
            $query['commissionid'] = $commissionId;
        }

        $postbackUrl = $postbackBase . '?' . http_build_query($query, '', '&', PHP_QUERY_RFC3986);

        $body = [];
        if (!empty($payload['order_items']) && is_array($payload['order_items'])) {
            $body['order_items'] = $payload['order_items'];
        }
        $hasOrderItems = $body !== [];

        try {
            $timeout = (int) config('services.flexoffers.timeout', 10);
            $http = Http::timeout($timeout > 0 ? $timeout : 10)
                ->withoutRedirecting()
                ->withHeaders([
                    'Accept' => '*/*',
                ]);

            // Primary conversion fire: GET is the most reliable for da.ashx.
            $getResponse = $http->send('GET', $postbackUrl);
            $getBody = (string) $getResponse->body();
            $getBodyLower = mb_strtolower($getBody);
            $getContainsNoClick = str_contains($getBodyLower, 'no click id found');
            $getContainsServerError = str_contains($getBodyLower, '/errors/500') || str_contains($getBodyLower, 'object moved');
            $getSuccessful = $getResponse->successful() && !$getContainsNoClick && !$getContainsServerError;

            if ($getContainsNoClick) {
                return [
                    'status' => 'failed',
                    'message' => 'FlexOffers rejected the click ID (No click ID found).',
                    'postback_url' => $postbackUrl,
                    'http_status' => $getResponse->status(),
                    'response_body' => mb_substr($getBody, 0, 1000),
                    'lead_id' => $leadId,
                ];
            }

            if ($getSuccessful && !$hasOrderItems) {
                return [
                    'status' => 'sent',
                    'message' => 'FlexOffers postback sent.',
                    'postback_url' => $postbackUrl,
                    'http_status' => $getResponse->status(),
                    'response_body' => mb_substr($getBody, 0, 1000),
                    'lead_id' => $leadId,
                ];
            }

            if ($getSuccessful && $hasOrderItems) {
                // Best-effort order_items POST; conversion already sent via GET.
                $postItemsResponse = $http
                    ->withBody((string) json_encode($body), 'application/json')
                    ->send('POST', $postbackUrl);

                $postItemsBody = (string) $postItemsResponse->body();
                $postItemsBodyLower = mb_strtolower($postItemsBody);
                $postItemsContainsServerError = str_contains($postItemsBodyLower, '/errors/500') || str_contains($postItemsBodyLower, 'object moved');
                $postItemsSuccessful = $postItemsResponse->successful() && !$postItemsContainsServerError;

                $result = [
                    'status' => 'sent',
                    'message' => 'FlexOffers conversion sent via GET.',
                    'postback_url' => $postbackUrl,
                    'http_status' => $getResponse->status(),
                    'response_body' => mb_substr($getBody, 0, 1000),
                    'lead_id' => $leadId,
                    'order_items_status' => $postItemsSuccessful ? 'sent' : 'failed',
                ];

                if (!$postItemsSuccessful) {
                    $result['order_items_warning'] = 'Order items POST failed but conversion GET succeeded.';
                    $result['order_items_http_status'] = $postItemsResponse->status();
                    $result['order_items_response_body'] = mb_substr($postItemsBody, 0, 1000);
                }

                return $result;
            }

            // If GET failed for non-click-id reasons, try POST as fallback.
            $fallbackBody = $hasOrderItems ? (string) json_encode($body) : '{}';
            $postFallbackResponse = $http
                ->withBody($fallbackBody, 'application/json')
                ->send('POST', $postbackUrl);
            $postFallbackBody = (string) $postFallbackResponse->body();
            $postFallbackBodyLower = mb_strtolower($postFallbackBody);
            $postFallbackContainsNoClick = str_contains($postFallbackBodyLower, 'no click id found');
            $postFallbackContainsServerError = str_contains($postFallbackBodyLower, '/errors/500') || str_contains($postFallbackBodyLower, 'object moved');
            $postFallbackSuccessful = $postFallbackResponse->successful() && !$postFallbackContainsNoClick && !$postFallbackContainsServerError;

            if ($postFallbackContainsNoClick) {
                return [
                    'status' => 'failed',
                    'message' => 'FlexOffers rejected the click ID (No click ID found).',
                    'postback_url' => $postbackUrl,
                    'http_status' => $postFallbackResponse->status(),
                    'response_body' => mb_substr($postFallbackBody, 0, 1000),
                    'lead_id' => $leadId,
                ];
            }

            if ($postFallbackSuccessful) {
                return [
                    'status' => 'sent',
                    'message' => 'FlexOffers postback sent.',
                    'postback_url' => $postbackUrl,
                    'http_status' => $postFallbackResponse->status(),
                    'response_body' => mb_substr($postFallbackBody, 0, 1000),
                    'lead_id' => $leadId,
                ];
            }

            Log::warning('FlexOffers postback failed for both GET and POST.', [
                'lead_id' => $leadId,
                'get_http_status' => $getResponse->status(),
                'post_http_status' => $postFallbackResponse->status(),
            ]);

            return [
                'status' => 'failed',
                'message' => 'FlexOffers postback returned an error response.',
                'postback_url' => $postbackUrl,
                'http_status' => $getResponse->status(),
                'response_body' => mb_substr($getBody, 0, 1000),
                'post_http_status' => $postFallbackResponse->status(),
                'post_response_body' => mb_substr($postFallbackBody, 0, 1000),
                'lead_id' => $leadId,
            ];
        } catch (Throwable $exception) {
            Log::error('FlexOffers postback request failed.', [
                'lead_id' => $leadId,
                'error' => $exception->getMessage(),
            ]);

            return [
                'status' => 'failed',
                'message' => 'FlexOffers postback request failed.',
                'postback_url' => $postbackUrl,
                'lead_id' => $leadId,
                'error' => $exception->getMessage(),
            ];
        }
    }

    private function skipped(string $message, ?int $leadId = null): array
    {
        return [
            'status' => 'skipped',
            'message' => $message,
            'lead_id' => $leadId,
        ];
    }
}

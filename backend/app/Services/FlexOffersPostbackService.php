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

        try {
            $timeout = (int) config('services.flexoffers.timeout', 10);
            $http = Http::timeout($timeout > 0 ? $timeout : 10)
                ->withoutRedirecting()
                ->withHeaders([
                    'Accept' => '*/*',
                ]);

            if ($body !== []) {
                $response = $http
                    ->withBody((string) json_encode($body), 'application/json')
                    ->send('POST', $postbackUrl);
            } else {
                $response = $http->send('POST', $postbackUrl);
            }

            $responseBody = (string) $response->body();
            $responseBodyLower = mb_strtolower($responseBody);
            $containsNoClick = str_contains($responseBodyLower, 'no click id found');
            $containsServerError = str_contains($responseBodyLower, '/errors/500') || str_contains($responseBodyLower, 'object moved');

            if ($response->successful() && !$containsNoClick && !$containsServerError) {
                return [
                    'status' => 'sent',
                    'message' => 'FlexOffers postback sent.',
                    'postback_url' => $postbackUrl,
                    'http_status' => $response->status(),
                    'response_body' => mb_substr($responseBody, 0, 1000),
                    'lead_id' => $leadId,
                ];
            }

            Log::warning('FlexOffers postback returned a non-success status.', [
                'lead_id' => $leadId,
                'http_status' => $response->status(),
            ]);

            $message = $containsNoClick
                ? 'FlexOffers rejected the click ID (No click ID found).'
                : 'FlexOffers postback returned an error response.';

            return [
                'status' => 'failed',
                'message' => $message,
                'postback_url' => $postbackUrl,
                'http_status' => $response->status(),
                'response_body' => mb_substr($responseBody, 0, 1000),
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

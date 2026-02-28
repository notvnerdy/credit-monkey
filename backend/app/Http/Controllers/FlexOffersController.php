<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FlexOffersController extends Controller
{
    private const ADVERTISER_ID = '858300D2-9FD5-4288-94E8-96FB1ECA320F';
    private const POSTBACK_URL = 'https://track.flexlinkspro.com/da.ashx';

    public function postback(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'clickid' => ['required', 'string', 'max:255'],
            'ordernumber' => ['required', 'string', 'max:255'],
            'orderamount' => ['required', 'numeric', 'min:0.01'],
            'coupon' => ['nullable', 'string', 'max:300'],
            'currency' => ['nullable', 'string', 'max:3'],
            'geo' => ['nullable', 'string', 'max:3'],
            'commissionid' => ['nullable', 'string', 'max:255'],
            'order_items' => ['nullable', 'array'],
            'order_items.*.sku' => ['nullable', 'string'],
            'order_items.*.amount' => ['nullable', 'numeric'],
            'order_items.*.quantity' => ['nullable', 'integer'],
            'order_items.*.order_coupon' => ['nullable', 'string'],
            'order_items.*.commissionid' => ['nullable', 'string'],
            'order_items.*.order_discount' => ['nullable', 'array'],
            'order_items.*.order_category' => ['nullable', 'array'],
        ]);

        $queryParams = [
            'advertiserid' => self::ADVERTISER_ID,
            'clickid' => $validated['clickid'],
            'orderamount' => $validated['orderamount'],
            'ordernumber' => $validated['ordernumber'],
        ];

        if (!empty($validated['coupon'])) {
            $queryParams['coupon'] = $validated['coupon'];
        }
        if (!empty($validated['currency'])) {
            $queryParams['currency'] = $validated['currency'];
        }
        if (!empty($validated['geo'])) {
            $queryParams['geo'] = $validated['geo'];
        }
        if (!empty($validated['commissionid'])) {
            $queryParams['commissionid'] = $validated['commissionid'];
        }

        $postBody = [];
        if (!empty($validated['order_items'])) {
            $postBody['order_items'] = $validated['order_items'];
        }

        $url = self::POSTBACK_URL . '?' . http_build_query($queryParams);

        Log::info('FlexOffers postback request', [
            'url' => $url,
            'body' => $postBody,
        ]);

        try {
            $response = Http::timeout(15)
                ->withBody(json_encode($postBody), 'application/json')
                ->post($url);

            $statusCode = $response->status();
            $responseBody = $response->body();

            Log::info('FlexOffers postback response', [
                'status' => $statusCode,
                'body' => $responseBody,
            ]);

            return response()->json([
                'success' => $statusCode >= 200 && $statusCode < 300,
                'flexoffers_status' => $statusCode,
                'flexoffers_response' => $responseBody,
                'postback_url' => $url,
            ]);
        } catch (\Exception $e) {
            Log::error('FlexOffers postback failed', [
                'error' => $e->getMessage(),
                'url' => $url,
            ]);

            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
                'postback_url' => $url,
            ], 502);
        }
    }
}

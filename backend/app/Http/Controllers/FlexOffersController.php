<?php

namespace App\Http\Controllers;

use App\Services\FlexOffersPostbackService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FlexOffersController extends Controller
{
    public function store(Request $request, FlexOffersPostbackService $flexOffers): JsonResponse
    {
        $validated = $request->validate([
            'clickid' => ['required', 'string', 'max:255'],
            'orderamount' => ['required', 'numeric', 'min:0'],
            'ordernumber' => ['required', 'string', 'max:255'],
            'coupon' => ['nullable', 'string', 'max:300'],
            'currency' => ['nullable', 'string', 'size:3'],
            'geo' => ['nullable', 'string', 'size:3'],
            'commissionid' => ['nullable', 'string', 'max:255'],
            'order_items' => ['nullable', 'array'],
            'order_items.*.sku' => ['nullable', 'string', 'max:255'],
            'order_items.*.amount' => ['required_with:order_items', 'numeric', 'min:0'],
            'order_items.*.quantity' => ['required_with:order_items', 'integer', 'min:1'],
            'order_items.*.order_coupon' => ['nullable', 'string', 'max:300'],
            'order_items.*.commissionid' => ['nullable', 'string', 'max:255'],
            'order_items.*.order_discount' => ['nullable', 'array'],
            'order_items.*.order_discount.*' => ['numeric', 'min:0'],
            'order_items.*.order_category' => ['nullable', 'array'],
            'order_items.*.order_category.*' => ['numeric', 'min:0'],
        ]);

        $result = $flexOffers->send($validated);

        $statusCode = match ($result['status']) {
            'sent' => 200,
            'skipped' => 422,
            default => 502,
        };

        return response()->json($result, $statusCode);
    }
}

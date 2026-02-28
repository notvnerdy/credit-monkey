<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use App\Services\FlexOffersPostbackService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    public function store(Request $request, FlexOffersPostbackService $flexOffers): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'state' => ['nullable', 'string', 'max:120'],
            'message' => ['nullable', 'string', 'max:2000'],
            'source' => ['nullable', 'string', 'max:120'],
            'utm_source' => ['nullable', 'string', 'max:120'],
            'utm_medium' => ['nullable', 'string', 'max:120'],
            'utm_campaign' => ['nullable', 'string', 'max:120'],
            'utm_term' => ['nullable', 'string', 'max:120'],
            'utm_content' => ['nullable', 'string', 'max:120'],
            'clickid' => ['nullable', 'string', 'max:255'],
            'orderamount' => ['nullable', 'numeric', 'min:0'],
            'ordernumber' => ['nullable', 'string', 'max:255'],
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

        $lead = Lead::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'state' => $validated['state'] ?? null,
            'message' => $validated['message'] ?? null,
            'source' => $validated['source'] ?? null,
            'utm_source' => $validated['utm_source'] ?? null,
            'utm_medium' => $validated['utm_medium'] ?? null,
            'utm_campaign' => $validated['utm_campaign'] ?? null,
            'utm_term' => $validated['utm_term'] ?? null,
            'utm_content' => $validated['utm_content'] ?? null,
        ]);

        $postback = $flexOffers->send($validated, (int) $lead->id);

        return response()->json([
            'success' => true,
            'id' => $lead->id,
            'flexoffers' => $postback,
        ], 201);
    }
}

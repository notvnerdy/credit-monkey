<?php

namespace App\Http\Controllers;

use App\Models\CreditCase;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CreditCaseController extends Controller
{
    public function index(): JsonResponse
    {
        $cases = CreditCase::with(['lead', 'assignee'])->latest()->paginate(25);

        return response()->json($cases);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'lead_id' => ['nullable', 'exists:leads,id'],
            'status' => ['nullable', 'string', 'max:50'],
            'summary' => ['nullable', 'string', 'max:255'],
            'assigned_to' => ['nullable', 'exists:users,id'],
        ]);

        $case = CreditCase::create($validated);

        return response()->json($case, 201);
    }

    public function show(CreditCase $creditCase): JsonResponse
    {
        $creditCase->load(['lead', 'assignee', 'notes', 'documents']);

        return response()->json($creditCase);
    }

    public function update(Request $request, CreditCase $creditCase): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['nullable', 'string', 'max:50'],
            'summary' => ['nullable', 'string', 'max:255'],
            'assigned_to' => ['nullable', 'exists:users,id'],
        ]);

        $creditCase->update($validated);

        return response()->json($creditCase);
    }
}

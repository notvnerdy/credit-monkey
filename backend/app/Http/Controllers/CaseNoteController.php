<?php

namespace App\Http\Controllers;

use App\Models\CaseNote;
use App\Models\CreditCase;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CaseNoteController extends Controller
{
    public function store(Request $request, CreditCase $creditCase): JsonResponse
    {
        $validated = $request->validate([
            'body' => ['required', 'string', 'max:5000'],
        ]);

        $note = $creditCase->notes()->create([
            'body' => $validated['body'],
            'user_id' => $request->user()->id ?? null,
        ]);

        return response()->json($note, 201);
    }
}

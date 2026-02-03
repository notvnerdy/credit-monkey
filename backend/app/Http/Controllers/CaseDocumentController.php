<?php

namespace App\Http\Controllers;

use App\Models\CreditCase;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CaseDocumentController extends Controller
{
    public function store(Request $request, CreditCase $creditCase): JsonResponse
    {
        $validated = $request->validate([
            'file' => ['required', 'file', 'max:10240'],
        ]);

        $file = $validated['file'];
        $path = $file->store('case-documents', 'local');

        $document = $creditCase->documents()->create([
            'user_id' => $request->user()->id ?? null,
            'original_name' => $file->getClientOriginalName(),
            'path' => $path,
            'mime_type' => $file->getClientMimeType(),
            'size' => $file->getSize(),
        ]);

        return response()->json($document, 201);
    }
}

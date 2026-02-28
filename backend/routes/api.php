<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CreditCaseController;
use App\Http\Controllers\CaseNoteController;
use App\Http\Controllers\CaseDocumentController;

Route::post('/leads', [LeadController::class, 'store']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::get('/cases', [CreditCaseController::class, 'index']);
    Route::post('/cases', [CreditCaseController::class, 'store']);
    Route::get('/cases/{creditCase}', [CreditCaseController::class, 'show']);
    Route::patch('/cases/{creditCase}', [CreditCaseController::class, 'update']);
    Route::post('/cases/{creditCase}/notes', [CaseNoteController::class, 'store']);
    Route::post('/cases/{creditCase}/documents', [CaseDocumentController::class, 'store']);
});

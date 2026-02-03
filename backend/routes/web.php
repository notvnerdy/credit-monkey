<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

Route::get('/', function () {
    return redirect('/admin');
});

// Admin Routes
Route::get('/admin', [AdminController::class, 'loginForm']);
Route::post('/admin/login', [AdminController::class, 'login']);
Route::get('/admin/logout', [AdminController::class, 'logout']);
Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->middleware('auth');

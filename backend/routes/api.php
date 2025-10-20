<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersHelmController;

Route::post('/register', [UsersHelmController::class, 'register']);

Route::post('/login', [UsersHelmController::class, 'login']);

Route::middleware('auth:sanctum')->post('/logout', [UsersHelmController::class, 'logout']);

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UsersHelmController::class, 'getUser']);
    Route::put('/user/emergency', [UsersHelmController::class, 'updateEmergencyContact']);
});

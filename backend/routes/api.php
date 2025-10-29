<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersHelmController;
use App\Http\Controllers\PairingController;

Route::post('/register', [UsersHelmController::class, 'register']);

Route::post('/login', [UsersHelmController::class, 'login']);

Route::middleware('auth:sanctum')->post('/logout', [UsersHelmController::class, 'logout']);

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UsersHelmController::class, 'getUser']);
    Route::put('/user/emergency', [UsersHelmController::class, 'updateEmergencyContact']);
    Route::post('/user/helm', [UsersHelmController::class, 'addHelm']);
    Route::get('/user/helm-devices', [UsersHelmController::class, 'index']);
});

Route::get('/pairing/{serial_number}', [PairingController::class, 'getEmergencyNumber']);
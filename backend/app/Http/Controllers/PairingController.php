<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HelmDevice;
use Illuminate\Support\Facades\Log;

class PairingController extends Controller
{
    public function getEmergencyNumber($serial_number, Request $request)
    {
        Log::info('=== Pairing request diterima dari STM ===', [
            'serial_number' => $serial_number,
            'ip' => $request->ip(),
            'user_agent' => $request->header('User-Agent'),
        ]);
        $helm = HelmDevice::where('serial_number', $serial_number)->first();
        if (!$helm) {
            Log::warning('Helm tidak ditemukan', ['serial_number' => $serial_number]);
            return response()->json(['error' => 'Helm not found'], 404);
        }
        $helm->pairing_status = 'Connected';
        $helm->save();
        $response = [
            'message' => 'Pairing success',
            'serial_number' => $helm->serial_number,
            'emergency_phone' => $helm->emergency_phone ?? '',
            'pairing_status' => $helm->pairing_status,
        ];
        Log::info('Pairing berhasil', $response);
        return response()->json($response, 200);
    }
    
}

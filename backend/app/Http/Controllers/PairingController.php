<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HelmDevice;
use Illuminate\Support\Facades\Log;

class PairingController extends Controller
{
    /**
     * Mendapatkan nomor darurat berdasarkan serial_number helm.
     * Dipanggil oleh helm device saat pairing.
     */
    public function getEmergencyNumber($serial_number)
    {
        Log::info('=== Pairing Request Masuk ===', [
            'serial_number' => $serial_number,
            'ip' => request()->ip(),
            'user_agent' => request()->header('User-Agent'),
        ]);

        // Cari helm berdasarkan serial_number
        $helm = HelmDevice::where('serial_number', $serial_number)->first();

        if (!$helm) {
            Log::warning('Helm tidak ditemukan', ['serial_number' => $serial_number]);
            return response()->json([
                'error' => 'Helm not found'
            ], 404);
        }

        // Kembalikan data emergency contact
        $response = [
            'emergency_name'  => $helm->emergency_name ?? '',
            'emergency_phone' => $helm->emergency_phone ?? '',
            'pairing_status'  => $helm->pairing_status,
        ];

        Log::info('Berhasil kirim respons pairing', [
            'serial_number' => $serial_number,
            'response' => $response
        ]);

        return response()->json($response);
    }
}

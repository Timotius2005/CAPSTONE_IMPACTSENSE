<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UsersHelm;
use App\Models\HelmDevice;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UsersHelmController extends Controller
{
    /** REGISTER */
    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required|unique:users_helm,username',
            'password' => 'required|min:6',
        ]);

        $user = UsersHelm::create([
            'username' => $request->username,
            'password_hash' => Hash::make($request->password),
        ]);

        $token = $user->createToken('api_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user'    => $user,
            'token'   => $token,
        ], 201);
    }

    /** LOGIN */
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'password' => 'required',
        ]);

        $user = UsersHelm::where('username', $request->username)->first();
        if (!$user || !Hash::check($request->password, $user->password_hash)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user->tokens()->delete(); // Hapus token lama
        $token = $user->createToken('api_token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user'    => $user,
            'token'   => $token,
        ]);
    }

    /** LOGOUT */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function getUser(Request $request)
    {
        $user = $request->user()->load('helmDevices'); // eager load relasi helm
        return response()->json([
            'user' => $user
        ]);
    }

    public function updateEmergencyContact(Request $request)
    {
        $request->validate([
            'serial_number' => 'required|integer|exists:helm_devices,serial_number',
            'emergency_name' => 'nullable|string|max:100',
            'emergency_phone' => 'nullable|string|max:20',
        ]);

        $helm = HelmDevice::where('serial_number', $request->serial_number)
            ->where('user_id', $request->user()->user_id)
            ->first();

        if (!$helm) {
            return response()->json(['message' => 'Helm not found for this user'], 404);
        }

        $helm->update([
            'emergency_name' => $request->emergency_name,
            'emergency_phone' => $request->emergency_phone,
            'pairing_status' => 'Disconnected',
        ]);

        return response()->json([
            'message' => 'Emergency contact updated, pairing status set to Disconnected',
            'helm' => $helm
        ]);
    }

    public function addHelm(Request $request)
{
    $request->validate([
        'serial_number' => 'required|string|unique:helm_devices,serial_number',
        'helm_name' => 'nullable|string|max:100',
        'emergency_name' => 'nullable|string|max:100',
        'emergency_phone' => 'nullable|string|max:20',
    ]);

    $helm = HelmDevice::create([
        'user_id' => $request->user()->user_id,
        'serial_number' => $request->serial_number,
        'helm_name' => $request->helm_name ?? 'My Helmet',
        'emergency_name' => $request->emergency_name,
        'emergency_phone' => $request->emergency_phone,
        'pairing_status' => 'Disconnected',
    ]);

    return response()->json([
        'message' => 'Helm added successfully with emergency contact',
        'helm' => $helm
    ], 201);
    }
    public function index(Request $request)
    {
    $userId = $request->user()->user_id;

    $helmets = HelmDevice::where('user_id', $userId)->get();

    return response()->json([
        'message' => 'Helm list retrieved successfully',
        'data' => $helmets,
    ]);

    }
}
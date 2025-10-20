<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UsersHelm;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UsersHelmController extends Controller
{
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
        $user->tokens()->delete();
        $token = $user->createToken('api_token')->plainTextToken;
        return response()->json([
            'message' => 'Login successful',
            'user'    => $user,
            'token'   => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }


    public function getUser(Request $request)
    {
        return response()->json([
            'user' => $request->user()
        ]);
    }

  public function updateEmergencyContact(Request $request)
{
    $request->validate([
        'emergency_name' => 'nullable|string|max:100',
        'emergency_phone' => 'nullable|string|max:20',
        'id_helm' => 'nullable|integer',
    ]);

    $user = $request->user();

    $updateData = [];

    if ($request->has('emergency_name')) {
        $updateData['emergency_name'] = $request->emergency_name;
    }

    if ($request->has('emergency_phone')) {
        $updateData['emergency_phone'] = $request->emergency_phone;
    }

    if ($request->has('id_helm')) {
        $updateData['id_helm'] = $request->id_helm;
    }

    if (empty($updateData)) {
        return response()->json([
            'message' => 'No valid fields provided for update.'
        ], 400);
    }

    $user->update($updateData);

    return response()->json([
        'message' => 'User data updated successfully',
        'user' => $user
    ]);
}

}
<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
{
    DB::table('users_helm')->insert([
        'username' => 'testuser',
        'password_hash' => bcrypt('password123'),
        'nama_lengkap' => 'User Satu',
        'no_hp' => '08123456789',
        'id_helm' => 'HELM001',
        'emergency_name' => 'Kontak Darurat',
        'emergency_phone' => '08129876543',
        'created_at' => now(),
        'updated_at' => now(),
    ]);
}

}

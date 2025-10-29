<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Jalankan migrasi: membuat tabel users_helm.
     */
    public function up(): void
    {
        Schema::create('users_helm', function (Blueprint $table) {
            $table->id('user_id');
            $table->string('username')->unique();
            $table->string('password_hash');
            $table->timestamps();
        });
    }

    /**
     * Rollback migrasi: menghapus tabel users_helm.
     */
    public function down(): void
    {
        Schema::dropIfExists('users_helm');
    }
};

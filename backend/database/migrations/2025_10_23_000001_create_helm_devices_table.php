<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Jalankan migration.
     */
    public function up(): void
    {
        Schema::create('helm_devices', function (Blueprint $table) {
            $table->id('helm_id');
            $table->unsignedBigInteger('user_id'); // relasi ke users_helm
            $table->string('serial_number')->unique(); // nomor unik helm (misal id_helm STM)
            $table->string('helm_name')->nullable();   // nama helm, opsional
            $table->enum('pairing_status', ['connected', 'disconnected'])->default('disconnected');
            $table->string('emergency_name')->nullable();
            $table->string('emergency_phone')->nullable();
            $table->timestamp('last_paired_at')->nullable();
            $table->timestamps();

            // Foreign key ke users_helm
            $table->foreign('user_id')
                  ->references('user_id')
                  ->on('users_helm')
                  ->onDelete('cascade');
        });
    }

    /**
     * Rollback migration.
     */
    public function down(): void
    {
        Schema::dropIfExists('helm_devices');
    }
};

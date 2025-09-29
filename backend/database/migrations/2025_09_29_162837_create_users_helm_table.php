<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up(): void
{
    Schema::create('users_helm', function (Blueprint $table) {
        $table->id('user_id'); // auto increment primary key
        $table->string('username', 50)->unique();
        $table->string('password_hash', 255);
        $table->string('nama_lengkap', 100);
        $table->string('no_hp', 15);
        $table->string('id_helm', 50)->unique();
        $table->string('emergency_name', 100)->nullable();
        $table->string('emergency_phone', 15)->nullable();
        $table->timestamps(); 
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users_helm');
    }
};

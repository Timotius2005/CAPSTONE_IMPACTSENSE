<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class UsersHelm extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'users_helm';
    protected $primaryKey = 'user_id';
    public $timestamps = true;

    protected $fillable = [
        'username',
        'password_hash',
    ];

    protected $hidden = [
        'password_hash',
    ];

    /**
     * Override agar Auth tetap mengenali field password.
     */
    public function getAuthPassword()
    {
        return $this->password_hash;
    }

    /**
     * Relasi ke tabel helm_devices.
     * Satu user bisa memiliki banyak helm.
     */
    public function helmDevices()
    {
        return $this->hasMany(HelmDevice::class, 'user_id', 'user_id');
    }

    /**
     * Relasi opsional untuk helm yang sedang connected.
     */
    public function connectedHelms()
    {
        return $this->helmDevices()->where('pairing_status', 'connected');
    }
}

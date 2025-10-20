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
        'nama_lengkap',
        'no_hp',
        'id_helm',
        'emergency_name',
        'emergency_phone',
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
}

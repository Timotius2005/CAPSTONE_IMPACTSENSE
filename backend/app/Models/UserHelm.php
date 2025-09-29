<?php
namespace App\Models;
class UsersHelm extends Model
{
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
}

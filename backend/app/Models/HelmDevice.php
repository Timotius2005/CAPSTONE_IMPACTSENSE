<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HelmDevice extends Model
{
    use HasFactory;

    protected $table = 'helm_devices';
    protected $primaryKey = 'helm_id';
    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'serial_number',
        'helm_name',
        'pairing_status',
        'emergency_name',
        'emergency_phone',
        'last_paired_at',
    ];

    public function user()
    {
        return $this->belongsTo(UsersHelm::class, 'user_id', 'user_id');
    }
}

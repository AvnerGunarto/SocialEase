<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentInfo extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'card_number',
        'address',
        'cvv',
        'expiry_date',
    ];

    protected $hidden = [
        'card_number',
        'cvv',
        'expiry_date',

    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

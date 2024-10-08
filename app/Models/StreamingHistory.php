<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StreamingHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'streaming_id',
        'streaming_date',
        'streaming_duration',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

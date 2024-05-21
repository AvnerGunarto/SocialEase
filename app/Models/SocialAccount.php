<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'social_media_type',
        'social_media_name',
        'api_token',
        'api_token_secret'
    ];

    protected $hidden = [
        'api_token',
        'api_token_secret',
    ];

    protected $casts = [
        'api_token' => 'hashed',
        'api_token_secret' => 'hashed',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function postSchedule()
    {
        return $this->belongsToMany(PostSchedule::class);
    }
}

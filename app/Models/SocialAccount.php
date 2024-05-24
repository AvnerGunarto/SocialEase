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
        'api_token' => 'encrypted',
        'api_token_secret' => 'encrypted',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function postSchedule()
    {
        return $this->belongsToMany(PostSchedule::class, 'post_schedules_social_accounts');
    }
}

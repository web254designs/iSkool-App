<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UpcomingEvent extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

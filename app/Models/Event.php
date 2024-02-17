<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $casts = [
        'date' => 'datetime',
    ];

    protected $fillable = ['title', 'date', 'description'];

    public function users()
    {
        return $this->belongsToMany(User::class)
            ->withPivot('is_interested', 'is_attending')
            ->withTimestamps();
    }
}

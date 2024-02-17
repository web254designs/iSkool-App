<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Behavior extends Model
{
    // Other attributes and methods...

    /**
     * Get the students associated with the behavior.
     */
    public function students()
    {
        return $this->belongsToMany(Student::class)->withTimestamps();
    }
}

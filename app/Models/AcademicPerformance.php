<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AcademicPerformance extends Model
{
    /**
     * Get the student that owns the academic performance.
     */
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}

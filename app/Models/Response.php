<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Response extends Model
{
    protected $fillable = ['student_id', 'response'];

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $fillable = ['name', 'student_id', 'teacher_id'];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }

    // Define the relationship with Assignment
    public function assignments()
    {
        return $this->hasMany(Assignment::class);
    }
}

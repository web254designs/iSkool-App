<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Assignment extends Model
{
    use HasFactory;

    protected $table = 'assignments';

    protected $fillable = [
        'title',
        'status',
        'description',
        'deadline',
        'subject_id',
        'teacher_id',
        'student_id',
    ];

    // Define the relationship with Subject
    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function students(): BelongsToMany
    {
        return $this->belongsToMany(Student::class, 'assignment_student')
            ->withPivot('status')
            ->withTimestamps();
    }

    // Define the relationship with Teacher
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}

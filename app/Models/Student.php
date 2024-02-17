<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Student extends Model
{
    protected $table = 'students';

    protected $fillable = [
        'name',
        'grade',
        'birthdate',
        'gender',
        'parent_guardian_name',
        'parent_guardian_email',
        'parent_guardian_phone',
    ];

    public function guardians(): BelongsToMany
    {
        return $this->belongsToMany(Guardian::class, 'guardian_student', 'student_id', 'guardian_id');
    }

    public function attendance()
    {
        return $this->hasMany(Attendance::class);
    }

    /**
     * Get the academic performances for the student.
     */
    public function academicPerformances()
    {
        return $this->hasMany(AcademicPerformance::class);
    }

    public function responses()
    {
        return $this->hasMany(Response::class, 'student_id');
    }

    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }

    public function assignments(): BelongsToMany
    {
        return $this->belongsToMany(Assignment::class, 'assignment_student')
            ->withPivot('status')
            ->withTimestamps();
    }

    /**
     * Get the behaviors associated with the student.
     */
    public function behaviors()
    {
        return $this->belongsToMany(Behavior::class)->withTimestamps();
    }

}

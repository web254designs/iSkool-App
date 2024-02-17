<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'phone_number'];

    public function teacherCommunications()
    {
        return $this->hasMany(TeacherCommunication::class);
    }

    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }

    // Define the relationship with Assignment
    public function assignments()
    {
        return $this->hasMany(Assignment::class);
    }

}

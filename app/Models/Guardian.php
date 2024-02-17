<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Guardian extends Authenticatable
{
    use Notifiable;

    protected $table = 'guardians';

    protected $fillable = [
        'name',
        'email',
        'phone_number',
        'gender',
        'password',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function students(): BelongsToMany
    {
        return $this->belongsToMany(Student::class, 'guardian_student', 'guardian_id', 'student_id');
    }

    /**
     * Get the related userable model.
     */
    public function userable(): MorphOne
    {
        return $this->morphOne(User::class, 'userable');
    }

    /**
     * Get the user record associated with the guardian.
     */
    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

}

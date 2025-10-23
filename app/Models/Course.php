<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'title',
        'description',
        'instructor_id',
        'price',
        'category',
        'level',
        'thumbnail',
        'video_url',        // ← MAKE SURE THIS IS HERE
        'video_duration',   // ← AND THIS
        'status'
    ];

    protected $attributes = [
        'status' => 'draft'
    ];

    // ... rest of your model code remains the same
    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function isEnrolled($userId = null)
    {
        if (!$userId && auth()->check()) {
            $userId = auth()->id();
        }
        
        return $this->enrollments()->where('student_id', $userId)->exists();
    }

    public function students()
    {
        return $this->belongsToMany(User::class, 'enrollments', 'course_id', 'student_id')
                    ->withTimestamps();
    }

    public function getStudentsCountAttribute()
    {
        return $this->enrollments()->count();
    }
}
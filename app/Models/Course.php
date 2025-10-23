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
        'video_url',
        'video_duration',
        'status'
    ];

    protected $attributes = [
        'status' => 'draft'
    ];

    // Relationship with instructor
    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    // Relationship with enrollments
    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    // Helper method to check if a user is enrolled in this course
    public function isEnrolled($userId = null)
    {
        if (!$userId && auth()->check()) {
            $userId = auth()->id();
        }
        
        return $this->enrollments()->where('student_id', $userId)->exists();
    }

    // Relationship with students through enrollments
    public function students()
    {
        return $this->belongsToMany(User::class, 'enrollments', 'course_id', 'student_id')
                    ->withTimestamps();
    }

    // Count of students (convenience method)
    public function getStudentsCountAttribute()
    {
        return $this->enrollments()->count();
    }
}
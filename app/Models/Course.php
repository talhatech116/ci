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
}

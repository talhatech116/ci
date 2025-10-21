<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    // Fields that can be filled when creating enrollments
    protected $fillable = [
        'student_id', 
        'course_id', 
        'video_completed', 
        'video_progress'
    ];

    // Convert database types to PHP types
    protected $casts = [
        'enrolled_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    // Relationship: An enrollment belongs to a student
    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    // Relationship: An enrollment belongs to a course
    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
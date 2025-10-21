<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnrollmentController extends Controller
{
    // Handle student enrolling in a course
    public function enroll($courseId)
    {
        // Step 1: Find the course
        $course = Course::where('status', 'published')->find($courseId);
        
        if (!$course) {
            return response()->json([
                'message' => 'Course not found or not published'
            ], 404);
        }

        // Step 2: Check if already enrolled
        if ($course->isEnrolled(Auth::id())) {
            return response()->json([
                'message' => 'You are already enrolled in this course'
            ], 400);
        }

        // Step 3: Create enrollment record
        $enrollment = Enrollment::create([
            'student_id' => Auth::id(),
            'course_id' => $courseId,
            'enrolled_at' => now(),
        ]);

        // Step 4: Return success response
        return response()->json([
            'message' => 'Successfully enrolled in the course!',
            'enrollment' => $enrollment
        ], 201);
    }

    // Get all enrollments for current student
    public function myEnrollments()
    {
        $enrollments = Enrollment::with('course.instructor')
            ->where('student_id', Auth::id())
            ->get();

        return response()->json([
            'enrollments' => $enrollments
        ]);
    }
}
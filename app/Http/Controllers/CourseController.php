<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Support\Facades\Auth; // ← ADD THIS

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::where('status', 'published')->get();
        return response()->json(['courses' => $courses]);
    }

    public function getCourseVideo($courseId)
    {
        try {
            \Log::info("Fetching course video for course ID: {$courseId}, user ID: " . Auth::id());

            // Get the course with instructor info
            $course = Course::with('instructor')
                ->where('id', $courseId)
                ->first();

            if (!$course) {
                return response()->json([
                    'error' => 'Course not found'
                ], 404);
            }

            // Check if student is enrolled in this course
            $enrollment = Enrollment::where('student_id', Auth::id())
                ->where('course_id', $courseId)
                ->first();

            if (!$enrollment) {
                return response()->json([
                    'error' => 'You are not enrolled in this course'
                ], 403);
            }

            return response()->json([
                'course' => $course,
                'enrollment' => $enrollment
            ]);

        } catch (\Exception $e) {
            \Log::error('Error in getCourseVideo: ' . $e->getMessage());
            
            return response()->json([
                'error' => 'Server error: ' . $e->getMessage()
            ], 500);
        }
    }
}
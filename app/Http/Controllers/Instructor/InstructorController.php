<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class InstructorController extends Controller
{
    public function index()
    {
        // Get courses with student counts using withCount
        $courses = Course::withCount('enrollments as students_count')
            ->where('instructor_id', Auth::id())
            ->get();

        return response()->json([
            'courses' => $courses
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category' => 'required|string|max:255',
            'level' => 'required|in:beginner,intermediate,advanced',
            'video_url' => 'required|url',
            'video_duration' => 'required|string|max:255',
        ]);

        $course = Course::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'category' => $validated['category'],
            'level' => $validated['level'],
            'video_url' => $validated['video_url'],
            'video_duration' => $validated['video_duration'],
            'instructor_id' => Auth::id(),
            'status' => 'published'
        ]);

        return response()->json([
            'message' => 'Course created successfully',
            'course' => $course
        ], 201);
    }

    public function destroy($id)
    {
        $course = Course::where('instructor_id', Auth::id())->findOrFail($id);
        
        // Use database transaction to ensure data integrity
        DB::transaction(function () use ($course) {
            // First, delete all enrollments for this course
            Enrollment::where('course_id', $course->id)->delete();
            
            // Then delete the course
            $course->delete();
        });

        return response()->json([
            'message' => 'Course deleted successfully'
        ]);
    }

    // ADD THIS METHOD FOR DASHBOARD STATS
    public function getStats()
    {
        $instructorId = Auth::id();
        
        // Get instructor's courses with student counts
        $courses = Course::withCount('enrollments as students_count')
            ->where('instructor_id', $instructorId)
            ->get();

        // Count UNIQUE students across all courses (not total enrollments)
        $courseIds = $courses->pluck('id');
        $uniqueStudentsCount = Enrollment::whereIn('course_id', $courseIds)
            ->distinct('student_id')
            ->count('student_id');
        
        // Count published courses
        $publishedCourses = $courses->where('status', 'published')->count();
        
        // Calculate total earnings (sum of price * enrollments for each course)
        $totalEarnings = $courses->sum(function($course) {
            return $course->price * $course->students_count;
        });

        return response()->json([
            'publishedCourses' => $publishedCourses,
            'totalStudents' => $uniqueStudentsCount, // This counts unique students
            'averageRating' => 0, // You can implement ratings later
            'totalEarnings' => $totalEarnings
        ]);
    }
}
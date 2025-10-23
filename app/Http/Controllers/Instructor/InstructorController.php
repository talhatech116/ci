<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use Illuminate\Support\Facades\Auth;

class InstructorController extends Controller
{
    public function index()
    {
        // Get courses for the authenticated instructor
        $courses = Course::where('instructor_id', Auth::id())->get();

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
            'video_url' => 'required|url', // ← ADD THIS VALIDATION
            'video_duration' => 'required|string|max:255',// ← ADD THIS VALIDATION
        ]);

        $course = Course::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'category' => $validated['category'],
            'level' => $validated['level'],
            'video_url' => $validated['video_url'], // ← SAVE VIDEO URL
            'video_duration' => $validated['video_duration'], // ← SAVE VIDEO DURATION
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
        $course->delete();

        return response()->json([
            'message' => 'Course deleted successfully'
        ]);
    }

    public function getStats()
    {
        $instructorId = Auth::id();
        
        // Get instructor's courses
        $courses = Course::where('instructor_id', $instructorId)->get();
        
        // Calculate real stats
        $publishedCourses = $courses->where('status', 'published')->count();
        
        // Get all course IDs for this instructor
        $courseIds = $courses->pluck('id');
        
        // Count total students across all courses
        $totalStudents = Enrollment::whereIn('course_id', $courseIds)->count();
        
        // Calculate total earnings (price * number of enrollments for each course)
        $totalEarnings = 0;
        foreach ($courses as $course) {
            $enrollmentCount = Enrollment::where('course_id', $course->id)->count();
            $totalEarnings += $course->price * $enrollmentCount;
        }
        
        return response()->json([
            'publishedCourses' => $publishedCourses,
            'totalStudents' => $totalStudents,
            'averageRating' => 0, // You can implement ratings later
            'totalEarnings' => $totalEarnings
        ]);
    }
}
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
        ]);

        $course = Course::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'category' => $validated['category'],
            'level' => $validated['level'],
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
}
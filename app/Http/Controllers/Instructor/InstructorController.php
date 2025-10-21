<?php

namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;

class InstructorController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category' => 'required|string',
            'level' => 'required|in:beginner,intermediate,advanced',
        ]);

        $course = Course::create([
            ...$validated,
            'instructor_id' => auth()->id(),
            'status' => 'published'
        ]);

        return response()->json($course, 201);
    }
}

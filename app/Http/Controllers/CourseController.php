<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::where('status', 'published')->get();
        return response()->json(['courses' => $courses]);
    }
}

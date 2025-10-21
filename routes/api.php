<?php

// routes/api.php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Student\DashboardController as StudentDashboard;
use App\Http\Controllers\Instructor\DashboardController as InstructorDashboard;
use App\Http\Controllers\Admin\DashboardController as AdminDashboard;
use App\Http\Controllers\Instructor\InstructorController;
use App\Http\Controllers\CourseController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Student routes
    Route::prefix('student')->middleware('student')->group(function () {
        Route::get('/dashboard', [StudentDashboard::class, 'index']);
        Route::put('/profile', [StudentDashboard::class, 'updateProfile']);
    });

    // Instructor routes
    Route::prefix('instructor')->middleware('instructor')->group(function () {
        Route::get('/dashboard', [InstructorDashboard::class, 'index']);
        Route::put('/profile', [InstructorDashboard::class, 'updateProfile']);
        Route::get('/dashboard', [InstructorDashboard::class, 'index']);
        Route::post('/courses', [InstructorController::class, 'store']);
        Route::get('/courses', [InstructorController::class, 'index']);
        Route::delete('/courses/{course}', [InstructorController::class, 'destroy']);
    });

    // Admin routes
    Route::prefix('admin')->middleware('admin')->group(function () {
        Route::get('/dashboard', [AdminDashboard::class, 'index']);
        Route::get('/users', [AdminDashboard::class, 'manageUsers']);
        Route::put('/users/{user}/toggle-status', [AdminDashboard::class, 'toggleUserStatus']);
    });
});

Route::get('/courses', function () {
    $courses = \App\Models\Course::where('status', 'published')
        ->with('instructor')
        ->get();
    
    return response()->json(['courses' => $courses]);
});
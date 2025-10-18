<?php
// app/Http/Controllers/Student/DashboardController.php
namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $profile = $user->studentProfile;

        $dashboardData = [
            'user' => $user,
            'profile' => $profile,
            'stats' => [
                'enrolled_courses' => 12,
                'completed_courses' => 5,
                'current_learning_time' => '15h 30m',
                'achievements' => 8
            ],
            'recent_activity' => [
                [
                    'course' => 'Laravel Fundamentals',
                    'progress' => 75,
                    'last_accessed' => '2 hours ago'
                ],
                [
                    'course' => 'React Advanced Patterns',
                    'progress' => 45,
                    'last_accessed' => '1 day ago'
                ]
            ]
        ];

        return response()->json($dashboardData);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();
        $profile = $user->studentProfile;

        $validated = $request->validate([
            'phone' => 'nullable|string|max:20',
            'bio' => 'nullable|string|max:500',
            'education_level' => 'nullable|string|max:100',
            'date_of_birth' => 'nullable|date',
            'interests' => 'nullable|array'
        ]);

        $profile->update($validated);

        return response()->json([
            'message' => 'Profile updated successfully',
            'profile' => $profile
        ]);
    }
}
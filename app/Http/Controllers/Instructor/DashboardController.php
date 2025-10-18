<?php
// app/Http/Controllers/Instructor/DashboardController.php
namespace App\Http\Controllers\Instructor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $profile = $user->instructorProfile;

        $dashboardData = [
            'user' => $user,
            'profile' => $profile,
            'stats' => [
                'total_courses' => 8,
                'total_students' => 1245,
                'total_earnings' => 12500.00,
                'average_rating' => 4.8
            ],
            'recent_activities' => [
                [
                    'type' => 'new_enrollment',
                    'course' => 'Advanced Laravel',
                    'students' => 15,
                    'time' => '2 hours ago'
                ],
                [
                    'type' => 'course_completion',
                    'course' => 'React Basics',
                    'students' => 8,
                    'time' => '1 day ago'
                ]
            ]
        ];

        return response()->json($dashboardData);
    }

    public function updateProfile(Request $request)
    {
        $user = $request->user();
        $profile = $user->instructorProfile;

        $validated = $request->validate([
            'phone' => 'nullable|string|max:20',
            'bio' => 'nullable|string|max:1000',
            'specialization' => 'required|string|max:100',
            'experience_years' => 'required|integer|min:0',
            'website' => 'nullable|url',
            'linkedin' => 'nullable|url',
            'hourly_rate' => 'nullable|numeric|min:0'
        ]);

        $profile->update($validated);

        return response()->json([
            'message' => 'Profile updated successfully',
            'profile' => $profile
        ]);
    }
}
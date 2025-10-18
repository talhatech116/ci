<?php
// app/Http/Controllers/Admin/DashboardController.php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $stats = [
            'total_users' => User::count(),
            'total_students' => User::where('role', 'student')->count(),
            'total_instructors' => User::where('role', 'instructor')->count(),
            'new_users_this_month' => User::whereMonth('created_at', now()->month)->count()
        ];

        $recentUsers = User::with(['studentProfile', 'instructorProfile'])
            ->latest()
            ->take(10)
            ->get();

        return response()->json([
            'stats' => $stats,
            'recent_users' => $recentUsers
        ]);
    }

    public function manageUsers(Request $request)
    {
        $users = User::with(['studentProfile', 'instructorProfile'])
            ->filter($request->only(['search', 'role', 'status']))
            ->paginate(15);

        return response()->json($users);
    }

    public function toggleUserStatus(User $user)
    {
        $user->update([
            'is_active' => !$user->is_active
        ]);

        return response()->json([
            'message' => 'User status updated successfully',
            'user' => $user
        ]);
    }
}
<?php
// database/seeders/UserSeeder.php
namespace Database\Seeders;

use App\Models\User;
use App\Models\StudentProfile;
use App\Models\InstructorProfile;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Create admin
        $admin = User::create([
            'name' => 'System Admin',
            'email' => 'admin@learnpro.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Create sample instructor
        $instructor = User::create([
            'name' => 'John Instructor',
            'email' => 'instructor@learnpro.com',
            'password' => Hash::make('password'),
            'role' => 'instructor',
        ]);

        InstructorProfile::create([
            'user_id' => $instructor->id,
            'specialization' => 'Full Stack Development',
            'experience_years' => 5,
            'bio' => 'Experienced full-stack developer specializing in Laravel and React.',
            'hourly_rate' => 45.00,
            'is_verified' => true
        ]);

        // Create sample student
        $student = User::create([
            'name' => 'Sarah Student',
            'email' => 'student@learnpro.com',
            'password' => Hash::make('password'),
            'role' => 'student',
        ]);

        StudentProfile::create([
            'user_id' => $student->id,
            'education_level' => 'Bachelor\'s Degree',
            'interests' => ['web development', 'mobile apps', 'UI/UX design']
        ]);
    }
}
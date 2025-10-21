<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();
            
            // Which student is enrolled
            $table->foreignId('student_id')->constrained('users');
            
            // Which course they're enrolled in
            $table->foreignId('course_id')->constrained('courses');
            
            // Enrollment status
            $table->enum('status', ['active', 'completed', 'cancelled'])->default('active');
            
            // Video progress (since each course has one video)
            $table->boolean('video_completed')->default(false);
            $table->integer('video_progress')->default(0); // 0-100 percentage
            
            // Timestamps
            $table->timestamp('enrolled_at');
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
            
            // Prevent duplicate enrollments - a student can't enroll twice in same course
            $table->unique(['student_id', 'course_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('enrollments');
    }
};
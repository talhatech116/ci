<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            
            // Link to the student (user)
            $table->foreignId('student_id')->constrained('users');
            
            // Link to the course
            $table->foreignId('course_id')->constrained('courses');
            
            // Track progress
            $table->boolean('video_completed')->default(false);
            $table->integer('video_progress')->default(0); // 0-100%
            
            // Timestamps
            $table->timestamp('enrolled_at')->useCurrent();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps(); // created_at and updated_at
            
            // Prevent duplicate enrollments
            $table->unique(['student_id', 'course_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('enrollments');
    }
};
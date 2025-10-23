<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use App\Models\Course;

return new class extends Migration
{
    public function up()
    {
        // Get all courses with YouTube URLs
        $courses = Course::where('video_url', 'like', '%youtube%')->get();
        
        foreach ($courses as $course) {
            $newUrl = $this->convertToEmbedUrl($course->video_url);
            
            // Only update if the URL was changed
            if ($newUrl !== $course->video_url) {
                DB::table('courses')
                    ->where('id', $course->id)
                    ->update(['video_url' => $newUrl]);
                
                echo "Updated course {$course->id}: {$course->video_url} -> {$newUrl}\n";
            }
        }
    }

    /**
     * Convert YouTube URL to embed format
     */
    private function convertToEmbedUrl($url)
    {
        // Handle youtube.com/watch?v= format
        if (preg_match('/youtube\.com\/watch\?v=([^&]+)/', $url, $matches)) {
            return 'https://www.youtube.com/embed/' . $matches[1];
        }
        
        // Handle youtu.be/ format
        if (preg_match('/youtu\.be\/([^?]+)/', $url, $matches)) {
            return 'https://www.youtube.com/embed/' . $matches[1];
        }
        
        // If it's already an embed URL or other format, return as is
        return $url;
    }

    public function down()
    {
        // Cannot reverse this data transformation
    }
};
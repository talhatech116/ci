<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'title',
        'description',
        'instructor_id',
        'price',
        'category',
        'level',
        'thumbnail',
        'status'
    ];

    
    protected $attributes = [
        'status' => 'draft'
    ];

    // Relationship with instructor
    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }
}

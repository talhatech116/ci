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
}

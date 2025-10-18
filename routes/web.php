<?php
// routes/web.php
use Illuminate\Support\Facades\Route;

// Serve React app for all frontend routes
Route::get('/{any}', function () {
    return view('welcome'); // Make sure you have an app.blade.php
})->where('any', '.*');
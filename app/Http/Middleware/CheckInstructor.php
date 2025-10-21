<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckInstructor
{
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->check() && auth()->user()->role === 'instructor') {
            return $next($request);
        }

        return response()->json([
            'message' => 'Access denied. Instructor permissions required.'
        ], 403);
    }
}

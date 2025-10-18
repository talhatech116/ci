<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckInstructor
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user() || !$request->user()->isInstructor()) {
            return response()->json(['error' => 'Unauthorized. Instructor access required.'], 403);
        }

        return $next($request);
    }
}

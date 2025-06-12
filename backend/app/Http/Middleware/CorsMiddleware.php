<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // Define your allowed origins - MUST MATCH YOUR FLUTTER WEB APP'S EXACT ORIGIN
        $allowedOrigins = [
            'http://localhost:50506', // <--- Reconfirm this is your Flutter app's port!
            'http://127.0.0.1:50506', // <--- Add for robustness
            // Add any other origins your Flutter app might run from (e.g., if port changes)
            // 'http://localhost:5000',
            // 'http://127.0.0.1:5173', // Common for newer Flutter versions
        ];

        $origin = $request->headers->get('Origin');

        // Handle preflight OPTIONS requests first
        if ($request->isMethod('OPTIONS')) {
            // Ensure this is 204 No Content for preflight success
            $response = response()->make('', 204);
        } else {
            // For actual requests (GET, POST, etc.)
            $response = $next($request);
        }

        // Set Access-Control-Allow-Origin header
        if (in_array($origin, $allowedOrigins)) {
            $response->headers->set('Access-Control-Allow-Origin', $origin);
        } else {
            // As a last resort for dev, you can use '*' if specific origins fail.
            // However, try to get specific origins working first.
            // If it fails with specific origins, try this temporarily:
            // $response->headers->set('Access-Control-Allow-Origin', '*');
            // But typically, if `in_array` fails, it's because $origin doesn't match.
            // For direct browser access (no Origin header or 'null' origin for file://)
            if ($origin === null) {
                 $response->headers->set('Access-Control-Allow-Origin', '*'); // Allow direct browser access
            } else {
                 // If origin is not allowed, you might choose to specifically deny or log
                 // For debugging, it's safer to ensure it gets a response.
                 // A denied origin might still lead to 0 status.
            }
        }

        // Set other essential CORS headers
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With, Application');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');
        $response->headers->set('Access-Control-Max-Age', '0'); // Crucial for dev to prevent caching preflight responses

        return $response;
    }
}
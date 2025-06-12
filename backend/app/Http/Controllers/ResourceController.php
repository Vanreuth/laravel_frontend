<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ResourceController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function getProtectedResource(Request $request)
    {
        if (!$request->user()->hasRole('admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json(['data' => 'This is a protected admin resource']);
    }
}

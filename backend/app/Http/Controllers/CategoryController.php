<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return response()->json(Category::all(), 200);
    }

    // In your controller
public function store(Request $request)
{
    // ... validation (ensure it passes) ...

    $category = new Category();
    $category->name = $request->input('name');
    $category->slug = \Illuminate\Support\Str::slug($request->input('name')); // Example of slugging
    $category->description = $request->input('description');
    // ... assign other fields ...

    $category->save(); // This is crucial!

    return response()->json(['message' => 'Category added successfully'], 201);
}

    public function show($id)
    {
        $category = Category::findOrFail($id);
        return response()->json($category, 200);
    }

    public function update(Request $request, $id)
{
    $category = Category::findOrFail($id);

    $request->validate([
        'name' => 'sometimes|required|string|max:255',
        'description' => 'sometimes|required|string|max:255',
    ]);

    $category->update($request->only(['name', 'status']));

    return response()->json([
        'message' => 'Category updated successfully!',
        'category' => $category
    ], 200);
}


    public function destroy($id)
    {
        Category::destroy($id);
        return response()->json(['message' => 'Category deleted successfully'], 200);
    }
}


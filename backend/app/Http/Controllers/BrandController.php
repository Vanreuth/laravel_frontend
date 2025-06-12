<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index()
    {
        return response()->json(Brand::all(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:brands,name',
            'logo' => 'nullable|image|mimes:jpg,jpeg,png,gif',
            'status' => 'required|in:available,not-available'
        ]);

        $logoPath = $request->file('logo') ? $request->file('logo')->store('upload', 'public') : null;

        $brand = Brand::create([
            'name' => $request->name,
            'logo' => $logoPath,
            'status' => $request->status,
        ]);

        return response()->json([
            'message' => 'Brand created successfully!',
            'brand' => $brand
        ], 201);
    }


    public function show($id)
{
    {
        $brand = Brand::findOrFail($id);
        return response()->json($brand, 200);
    }
}

public function update(Request $request, Brand $brand)
{
    $request->validate([
        'name' => 'sometimes|required|string|max:255',
        'logo' => 'nullable|image|mimes:jpg,jpeg,png,gif',
        'status' => 'sometimes|required|in:available,not-available'
    ]);

    if ($request->hasFile('logo')) {
        $logoPath = $request->file('logo')->store('upload', 'public');
        $brand->logo = $logoPath;
    }

    if ($request->has('name')) $brand->name = $request->name;
    if ($request->has('status')) $brand->status = $request->status;

    $brand->save();

    return response()->json([
        'message' => 'Brand updated successfully!',
        'brand' => $brand
    ], 200);
}


    public function destroy($id)
{
    Brand::destroy($id);
    return response()->json(['message' => 'Brand deleted successfully'], 200);
}

}

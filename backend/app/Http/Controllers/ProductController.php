<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str; // <--- Import Str facade
use Illuminate\Validation\Rule; // <--- Import Rule for unique validation

class ProductController extends Controller
{
    public function index()
    {
        // No change needed here for slug display, as it's part of the model attributes
        return response()->json(Product::with(['category'])->get(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255|unique:products,name', // Name must be unique
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:1',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        // Handle image upload
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
        }

        // Generate the slug from the name
        $slug = Str::slug($request->name);
        
        // Ensure slug uniqueness (optional but good practice, as name uniqueness helps)
        // If your name is unique, the slug will likely be unique too.
        // If you allow duplicate names, you'd need more complex slug generation (e.g., adding a number).
        $originalSlug = $slug;
        $count = 1;
        while (Product::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count++;
        }

        $product = Product::create([
            'category_id' => $request->category_id,
            'name' => $request->name,
            'slug' => $slug, // <--- Store the generated slug
            'description' => $request->description,
            'price' => $request->price,
            'stock_quantity' => $request->stock_quantity,
            'image' => $imagePath,
        ]);

        // Load category for the response to ensure it's included
        $product->load('category');

        return response()->json([
            'message' => 'Product created successfully!',
            'product' => $product
        ], 201);
    }

    public function show($id)
    {
        // No change needed here as slug is part of the product model
        $product = Product::with(['category'])->findOrFail($id);
        return response()->json($product, 200);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
    
        $request->validate([
            'category_id' => 'exists:categories,id',
            'name' => [
                'string',
                'max:255',
                Rule::unique('products')->ignore($product->id), // Allow existing name for this product
            ],
            'description' => 'nullable|string',
            'price' => 'numeric|min:0',
            'stock_quantity' => 'integer|min:0',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);
    
        $data = $request->only([
            'category_id', 
            'name', 
            'description', 
            'price', 
            'stock_quantity'
        ]);

        // Only update slug if name is provided and different
        if ($request->has('name') && $request->name !== $product->name) {
            $slug = Str::slug($request->name);
            $originalSlug = $slug;
            $count = 1;
            // Ensure slug uniqueness, ignoring the current product's slug
            while (Product::where('slug', $slug)->where('id', '!=', $product->id)->exists()) {
                $slug = $originalSlug . '-' . $count++;
            }
            $data['slug'] = $slug;
        }
    
        // Handle image upload if present
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($product->image) {
                Storage::disk('public')->delete($product->image); // Use Storage::disk('public') for consistency
            }
            
            $path = $request->file('image')->store('products', 'public');
            $data['image'] = $path;
        } elseif ($request->input('remove_image', false)) { // Added 'remove_image' flag for explicit removal
            if ($product->image && Storage::disk('public')->exists($product->image)) {
                Storage::disk('public')->delete($product->image);
            }
            $data['image'] = null;
        } else {
            // If no new image and not explicitly removed, don't update the 'image' field
            unset($data['image']);
        }
    
        $product->update($data);
    
        return response()->json([
            'message' => 'Product updated successfully!',
            'product' => $product->fresh(['category']) // fresh() reloads the model from DB
        ], 200);
    }
    
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}
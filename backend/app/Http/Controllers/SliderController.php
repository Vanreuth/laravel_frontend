<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class SliderController extends Controller
{
    public function index()
    {
        return response()->json(Slider::where('is_active', true)->orderBy('order')->get(), 200);
    }

    public function show($id)
    {
        $slider = Slider::findOrFail($id);
        return response()->json($slider, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'nullable|string',
            'order' => 'required|integer|min:0',
            'is_active' => 'boolean'
        ]);

       
            $imagePath = $request->file('image')->store('sliders', 'public');

            $slider = Slider::create([
                'title' => $request->title,
                'image_url' => Storage::url($imagePath),
                'description' => $request->description,
                'order' => $request->order,
                'is_active' => $request->is_active ?? true,
            ]);

            return response()->json([
                'message' => 'Slider created successfully!',
                'slider' => $slider
            ], 201);
    }

    public function update(Request $request, Slider $slider)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'nullable|string',
            'order' => 'sometimes|integer|min:0',
            'is_active' => 'sometimes|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $data = $request->only(['title', 'description', 'order', 'is_active']);

            if ($request->hasFile('image')) {
                if ($slider->image_url) {
                    Storage::disk('public')->delete(str_replace(Storage::url(''), '', $slider->image_url));
                }
                $imagePath = $request->file('image')->store('sliders', 'public');
                $data['image_url'] = Storage::url($imagePath);
            }

            $slider->update($data);

            return response()->json([
                'message' => 'Slider updated successfully!',
                'slider' => $slider
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update slider: ' . $e->getMessage()], 500);
        }
    }

    public function destroy(Slider $slider)
    {
        try {
            if ($slider->image_url) {
                Storage::disk('public')->delete(str_replace(Storage::url(''), '', $slider->image_url));
            }
            $slider->delete();
            return response()->json(['message' => 'Slider deleted successfully!'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete slider: ' . $e->getMessage()], 500);
        }
    }
}
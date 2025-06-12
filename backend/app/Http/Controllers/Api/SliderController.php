<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SliderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sliders = Slider::where('is_active', true)
            ->orderBy('order')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $sliders
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'order' => 'required|integer|min:0',
            'is_active' => 'boolean',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '_' . $image->getClientOriginalName();
                $image->storeAs('public/sliders', $imageName);
                
                $slider = Slider::create([
                    'title' => $request->title,
                    'description' => $request->description,
                    'order' => $request->order,
                    'is_active' => $request->is_active ?? true,
                    'image_url' => '/storage/sliders/' . $imageName
                ]);

                return response()->json([
                    'status' => 'success',
                    'message' => 'Slider created successfully',
                    'data' => $slider
                ], 201);
            }

            return response()->json([
                'status' => 'error',
                'message' => 'No image file provided'
            ], 400);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create slider',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $slider = Slider::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'order' => 'sometimes|required|integer|min:0',
            'is_active' => 'boolean',
            'image' => 'sometimes|required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $data = $request->except('image');

            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($slider->image_url) {
                    $oldImagePath = str_replace('/storage/', 'public/', $slider->image_url);
                    Storage::delete($oldImagePath);
                }

                // Store new image
                $image = $request->file('image');
                $imageName = time() . '_' . $image->getClientOriginalName();
                $image->storeAs('public/sliders', $imageName);
                $data['image_url'] = '/storage/sliders/' . $imageName;
            }

            $slider->update($data);

            return response()->json([
                'status' => 'success',
                'message' => 'Slider updated successfully',
                'data' => $slider
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update slider',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $slider = Slider::findOrFail($id);

            // Delete image file if exists
            if ($slider->image_url) {
                $imagePath = str_replace('/storage/', 'public/', $slider->image_url);
                Storage::delete($imagePath);
            }

            $slider->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Slider deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete slider',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

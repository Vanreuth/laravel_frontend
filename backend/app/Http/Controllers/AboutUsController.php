<?php

namespace App\Http\Controllers;

use App\Models\AboutUs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class AboutUsController extends Controller
{
    public function index()
    {
        return response()->json(AboutUs::all(), 200);
    }

    public function show(AboutUs $aboutUs)
    {
        return response()->json($aboutUs, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'subtitle1' => 'nullable|string|max:255',
            'description1' => 'nullable|string',
            'subtitle2' => 'nullable|string|max:255',
            'description2' => 'nullable|string',
            'image1' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image2' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $data = $request->only([
                'title',
                'subtitle1',
                'description1',
                'subtitle2',
                'description2'
            ]);

            // Handle image uploads
            if ($request->hasFile('image1')) {
                $path = $request->file('image1')->store('about-us', 'public');
                $data['image1'] = Storage::url($path);
            }
            if ($request->hasFile('image2')) {
                $path = $request->file('image2')->store('about-us', 'public');
                $data['image2'] = Storage::url($path);
            }
            if ($request->hasFile('banner_image')) {
                $path = $request->file('banner_image')->store('about-us', 'public');
                $data['banner_image'] = Storage::url($path);
            }

            $aboutUs = AboutUs::create($data);

            return response()->json([
                'message' => 'AboutUs created successfully!',
                'aboutUs' => $aboutUs
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create AboutUs: ' . $e->getMessage()], 500);
        }
    }

    public function update(Request $request, AboutUs $aboutUs)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'subtitle1' => 'nullable|string|max:255',
            'description1' => 'nullable|string',
            'subtitle2' => 'nullable|string|max:255',
            'description2' => 'nullable|string',
            'image1' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image2' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $data = $request->only([
                'title',
                'subtitle1',
                'description1',
                'subtitle2',
                'description2'
            ]);

            // Handle image uploads and delete old images if replaced
            if ($request->hasFile('image1')) {
                if ($aboutUs->image1) {
                    Storage::disk('public')->delete(str_replace(Storage::url(''), '', $aboutUs->image1));
                }
                $path = $request->file('image1')->store('about-us', 'public');
                $data['image1'] = Storage::url($path);
            }
            if ($request->hasFile('image2')) {
                if ($aboutUs->image2) {
                    Storage::disk('public')->delete(str_replace(Storage::url(''), '', $aboutUs->image2));
                }
                $path = $request->file('image2')->store('about-us', 'public');
                $data['image2'] = Storage::url($path);
            }
            if ($request->hasFile('banner_image')) {
                if ($aboutUs->banner_image) {
                    Storage::disk('public')->delete(str_replace(Storage::url(''), '', $aboutUs->banner_image));
                }
                $path = $request->file('banner_image')->store('about-us', 'public');
                $data['banner_image'] = Storage::url($path);
            }

            $aboutUs->update($data);

            return response()->json([
                'message' => 'AboutUs updated successfully!',
                'aboutUs' => $aboutUs
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update AboutUs: ' . $e->getMessage()], 500);
        }
    }

    public function destroy(AboutUs $aboutUs)
    {
        try {
            // Delete associated images
            if ($aboutUs->image1) {
                Storage::disk('public')->delete(str_replace(Storage::url(''), '', $aboutUs->image1));
            }
            if ($aboutUs->image2) {
                Storage::disk('public')->delete(str_replace(Storage::url(''), '', $aboutUs->image2));
            }
            if ($aboutUs->banner_image) {
                Storage::disk('public')->delete(str_replace(Storage::url(''), '', $aboutUs->banner_image));
            }

            $aboutUs->delete();
            return response()->json(['message' => 'AboutUs deleted successfully!'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete AboutUs: ' . $e->getMessage()], 500);
        }
    }
}
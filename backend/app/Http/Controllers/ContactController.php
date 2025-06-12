<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'required|email',
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'message' => 'required|string',
            'status' => 'required|in:pending,resolved'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $data = $request->except(['image', 'banner_image']);
            
            // Handle main image upload
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '_' . $image->getClientOriginalName();
                $image->storeAs('public/contacts', $imageName);
                $data['image'] = '/storage/contacts/' . $imageName;
            }

            // Handle banner image upload
            if ($request->hasFile('banner_image')) {
                $bannerImage = $request->file('banner_image');
                $bannerImageName = time() . '_banner_' . $bannerImage->getClientOriginalName();
                $bannerImage->storeAs('public/contacts', $bannerImageName);
                $data['banner_image'] = '/storage/contacts/' . $bannerImageName;
            }

            $contact = Contact::create($data);

            return response()->json([
                'status' => 'success',
                'message' => 'Contact created successfully',
                'data' => $contact
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to create contact',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function index()
    {
        $contacts = Contact::orderBy('created_at', 'desc')->get();
        return response()->json($contacts);
    }

    public function update(Request $request, Contact $contact)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'email' => 'sometimes|required|email',
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'message' => 'sometimes|required|string',
            'status' => 'sometimes|required|in:pending,resolved'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        try {
            $data = $request->except(['image', 'banner_image']);

            // Handle main image upload
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($contact->image) {
                    $oldImagePath = str_replace('/storage/', 'public/', $contact->image);
                    Storage::delete($oldImagePath);
                }

                $image = $request->file('image');
                $imageName = time() . '_' . $image->getClientOriginalName();
                $image->storeAs('public/contacts', $imageName);
                $data['image'] = '/storage/contacts/' . $imageName;
            }

            // Handle banner image upload
            if ($request->hasFile('banner_image')) {
                // Delete old banner image if exists
                if ($contact->banner_image) {
                    $oldBannerPath = str_replace('/storage/', 'public/', $contact->banner_image);
                    Storage::delete($oldBannerPath);
                }

                $bannerImage = $request->file('banner_image');
                $bannerImageName = time() . '_banner_' . $bannerImage->getClientOriginalName();
                $bannerImage->storeAs('public/contacts', $bannerImageName);
                $data['banner_image'] = '/storage/contacts/' . $bannerImageName;
            }

            $contact->update($data);

            return response()->json([
                'status' => 'success',
                'message' => 'Contact updated successfully',
                'data' => $contact
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update contact',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Contact $contact)
    {
        try {
            // Delete images if they exist
            if ($contact->image) {
                $imagePath = str_replace('/storage/', 'public/', $contact->image);
                Storage::delete($imagePath);
            }
            if ($contact->banner_image) {
                $bannerPath = str_replace('/storage/', 'public/', $contact->banner_image);
                Storage::delete($bannerPath);
            }

            $contact->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Contact deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to delete contact',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
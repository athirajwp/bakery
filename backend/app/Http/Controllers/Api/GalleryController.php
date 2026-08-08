<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\Traits\UploadsImages;
use App\Http\Resources\GalleryResource;
use App\Models\GalleryImage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class GalleryController extends Controller
{
    use UploadsImages;

    public function index(): AnonymousResourceCollection
    {
        return GalleryResource::collection(GalleryImage::active()->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:40'],
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'sort_order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);
        $validated['image'] = $this->uploadImage($request->file('image'), 'gallery');

        $image = GalleryImage::create($validated);

        return response()->json(new GalleryResource($image), 201);
    }

    public function update(Request $request, GalleryImage $galleryImage): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:40'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'sort_order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);
        $validated['image'] = $this->uploadImage($request->file('image'), 'gallery', $galleryImage->image);

        $galleryImage->update($validated);

        return response()->json(new GalleryResource($galleryImage->fresh()));
    }

    public function destroy(GalleryImage $galleryImage): JsonResponse
    {
        $this->deleteImage($galleryImage->image);
        $galleryImage->delete();

        return response()->json(['message' => 'Image removed from gallery.']);
    }
}

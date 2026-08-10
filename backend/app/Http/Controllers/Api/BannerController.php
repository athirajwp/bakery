<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\Traits\UploadsImages;
use App\Http\Resources\BannerResource;
use App\Models\Banner;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class BannerController extends Controller
{
    use UploadsImages;

    public function index(): AnonymousResourceCollection
    {
        return BannerResource::collection(Banner::active()->get());
    }

    public function indexAll(): AnonymousResourceCollection
    {
        return BannerResource::collection(Banner::orderBy('sort_order')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'link' => ['nullable', 'url'],
            'sort_order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);
        $validated['image'] = $this->uploadImage($request->file('image'), 'banners');

        $banner = Banner::create($validated);

        return response()->json(new BannerResource($banner), 201);
    }

    public function update(Request $request, Banner $banner): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'link' => ['nullable', 'url'],
            'sort_order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);
        $validated['image'] = $this->uploadImage($request->file('image'), 'banners', $banner->image);

        $banner->update($validated);

        return response()->json(new BannerResource($banner->fresh()));
    }

    public function destroy(Banner $banner): JsonResponse
    {
        $this->deleteImage($banner->image);
        $banner->delete();

        return response()->json(['message' => 'Banner deleted.']);
    }
}

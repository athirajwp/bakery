<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\Traits\UploadsImages;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CategoryController extends Controller
{
    use UploadsImages;

    public function index(): AnonymousResourceCollection
    {
        return CategoryResource::collection(
            Category::withCount('products')->where('is_active', true)->get()
        );
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:categories,name'],
            'description' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'is_active' => ['nullable', 'boolean'],
        ]);
        $validated['image'] = $this->uploadImage($request->file('image'), 'categories');

        $category = Category::create($validated);

        return response()->json(new CategoryResource($category), 201);
    }

    public function update(Request $request, Category $category): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:categories,name,' . $category->id],
            'description' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'is_active' => ['nullable', 'boolean'],
        ]);
        $validated['image'] = $this->uploadImage($request->file('image'), 'categories', $category->image);

        $category->update($validated);

        return response()->json(new CategoryResource($category->fresh()));
    }

    public function destroy(Category $category): JsonResponse
    {
        $this->deleteImage($category->image);
        $category->delete();

        return response()->json(['message' => 'Category deleted.']);
    }
}

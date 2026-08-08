<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\Traits\UploadsImages;
use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProductController extends Controller
{
    use UploadsImages;

    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Product::with('category')
            ->active()
            ->when($request->filled('category'), fn ($q) => $q->whereHas('category', fn ($c) => $c->where('slug', $request->input('category'))))
            ->when($request->filled('q'), fn ($q) => $q->where('name', 'like', '%' . $request->input('q') . '%'))
            ->when($request->boolean('best_seller'), fn ($q) => $q->bestSellers());

        return ProductResource::collection(
            $query->orderBy($request->input('sort', 'id'), $request->input('dir', 'asc'))->paginate($request->integer('per_page', 12))
        );
    }

    public function show(Product $product): ProductResource
    {
        $product->load('category');

        return new ProductResource($product);
    }

    public function store(StoreProductRequest $request): ProductResource
    {
        $validated = $request->validated();
        $validated['image'] = $this->uploadImage($request->file('image'), 'products');

        $product = Product::create($validated);

        return new ProductResource($product->load('category'));
    }

    public function update(StoreProductRequest $request, Product $product): ProductResource
    {
        $validated = $request->validated();
        $validated['image'] = $this->uploadImage($request->file('image'), 'products', $product->image);

        $product->update($validated);

        return new ProductResource($product->fresh('category'));
    }

    public function destroy(Product $product): JsonResponse
    {
        $this->deleteImage($product->image);
        $product->delete();

        return response()->json(['message' => 'Product deleted.']);
    }
}

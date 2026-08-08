@extends('admin.layout')

@section('title', $product->exists ? 'Edit Product' : 'New Product')

@section('content')
    <div class="mb-6">
        <a href="{{ route('admin.products.index') }}" class="text-sm font-semibold text-primary hover:underline">← Back to Products</a>
        <h1 class="mt-2 font-heading text-3xl font-bold text-brown">{{ $product->exists ? 'Edit Product' : 'Add New Product' }}</h1>
    </div>

    <form method="POST" action="{{ $product->exists ? route('admin.products.update', $product) : route('admin.products.store') }}"
          enctype="multipart/form-data" class="max-w-2xl rounded-2xl bg-white p-6 shadow-sm">
        @csrf

        <div class="grid gap-4 sm:grid-cols-2">
            <label class="block sm:col-span-2">
                <span class="text-xs font-semibold uppercase tracking-wider text-brown">Product Name *</span>
                <input name="name" value="{{ old('name', $product->name) }}" required
                       class="mt-1.5 w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
            </label>

            <label class="block">
                <span class="text-xs font-semibold uppercase tracking-wider text-brown">Category *</span>
                <select name="category_id" required class="mt-1.5 w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
                    @foreach ($categories as $category)
                        <option value="{{ $category->id }}" {{ old('category_id', $product->category_id) == $category->id ? 'selected' : '' }}>
                            {{ $category->name }}
                        </option>
                    @endforeach
                </select>
            </label>

            <label class="block">
                <span class="text-xs font-semibold uppercase tracking-wider text-brown">Weight</span>
                <input name="weight" value="{{ old('weight', $product->weight) }}" placeholder="e.g. 500 g"
                       class="mt-1.5 w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
            </label>

            <label class="block">
                <span class="text-xs font-semibold uppercase tracking-wider text-brown">Price (₹) *</span>
                <input type="number" step="0.01" min="0" name="price" value="{{ old('price', $product->price) }}" required
                       class="mt-1.5 w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
            </label>

            <label class="block">
                <span class="text-xs font-semibold uppercase tracking-wider text-brown">Old Price (₹)</span>
                <input type="number" step="0.01" min="0" name="old_price" value="{{ old('old_price', $product->old_price) }}"
                       class="mt-1.5 w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
            </label>

            <label class="block">
                <span class="text-xs font-semibold uppercase tracking-wider text-brown">Rating</span>
                <input type="number" step="0.1" min="0" max="5" name="rating" value="{{ old('rating', $product->rating ?? 4.5) }}"
                       class="mt-1.5 w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
            </label>

            <label class="block">
                <span class="text-xs font-semibold uppercase tracking-wider text-brown">Reviews Count</span>
                <input type="number" min="0" name="reviews_count" value="{{ old('reviews_count', $product->reviews_count ?? 0) }}"
                       class="mt-1.5 w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
            </label>

            <label class="block sm:col-span-2">
                <span class="text-xs font-semibold uppercase tracking-wider text-brown">Description</span>
                <textarea name="description" rows="3" class="mt-1.5 w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">{{ old('description', $product->description) }}</textarea>
            </label>

            <label class="block sm:col-span-2">
                <span class="text-xs font-semibold uppercase tracking-wider text-brown">Tags (comma separated)</span>
                <input name="tags" value="{{ old('tags', is_array($product->tags) ? implode(', ', $product->tags) : '') }}" placeholder="Bestseller, Traditional"
                       class="mt-1.5 w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
            </label>

            <label class="block sm:col-span-2">
                <span class="text-xs font-semibold uppercase tracking-wider text-brown">Product Image</span>
                <input type="file" name="image" accept="image/*" class="mt-1.5 block w-full text-sm text-brown">
                @if ($product->image)
                    <img src="{{ asset('storage/' . $product->image) }}" alt="" class="mt-3 h-24 w-24 rounded-xl object-cover">
                @endif
            </label>

            <label class="flex items-center gap-2 text-sm font-medium text-brown">
                <input type="checkbox" name="is_best_seller" value="1" {{ old('is_best_seller', $product->is_best_seller) ? 'checked' : '' }} class="rounded border-primary/30 text-primary">
                Best Seller
            </label>

            <label class="flex items-center gap-2 text-sm font-medium text-brown">
                <input type="checkbox" name="is_active" value="1" {{ old('is_active', $product->is_active ?? true) ? 'checked' : '' }} class="rounded border-primary/30 text-primary">
                Active (visible on website)
            </label>
        </div>

        <button type="submit" class="mt-6 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-gold transition hover:bg-primary-dark">
            {{ $product->exists ? 'Save Changes' : 'Create Product' }}
        </button>
    </form>
@endsection

@extends('admin.layout')

@section('title', 'Categories')

@section('content')
    <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
            <h1 class="font-heading text-3xl font-bold text-brown">Categories</h1>
            <p class="mt-1 text-sm text-brown">Manage your product categories.</p>
        </div>
    </div>

    <div class="mt-6 grid gap-6 lg:grid-cols-2">
        <div class="rounded-2xl bg-white p-6 shadow-sm">
            <h2 class="font-heading text-lg font-bold text-brown">Add New Category</h2>
            <form method="POST" action="{{ route('admin.categories.store') }}" enctype="multipart/form-data" class="mt-4 space-y-4">
                @csrf
                <input name="name" required placeholder="Category name" class="w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
                <input name="description" placeholder="Short description" class="w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
                <input type="file" name="image" accept="image/*" class="block w-full text-sm text-brown">
                <label class="flex items-center gap-2 text-sm font-medium text-brown">
                    <input type="checkbox" name="is_active" value="1" checked class="rounded border-primary/30 text-primary"> Active
                </label>
                <button class="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-gold hover:bg-primary-dark">Add Category</button>
            </form>
        </div>

        <div class="space-y-3">
            @forelse ($categories as $category)
                <form method="POST" action="{{ route('admin.categories.update', $category) }}" enctype="multipart/form-data"
                      class="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                    @csrf
                    <input name="name" value="{{ $category->name }}" required class="min-w-[180px] flex-1 rounded-xl border border-primary/15 bg-white px-4 py-2 text-sm outline-none focus:border-primary">
                    <span class="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-brown">{{ $category->products_count }} products</span>
                    <input type="file" name="image" accept="image/*" class="text-xs text-brown">
                    <label class="flex items-center gap-1.5 text-xs font-medium text-brown">
                        <input type="checkbox" name="is_active" value="1" {{ $category->is_active ? 'checked' : '' }} class="rounded border-primary/30 text-primary"> Active
                    </label>
                    <button class="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100">Save</button>
                    <button formaction="{{ route('admin.categories.destroy', $category) }}" data-confirm="Delete category {{ $category->name }}?" class="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100">Delete</button>
                </form>
            @empty
                <p class="rounded-2xl bg-white p-6 text-sm text-brown">No categories yet.</p>
            @endforelse
        </div>
    </div>
@endsection

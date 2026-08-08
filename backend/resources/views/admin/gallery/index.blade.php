@extends('admin.layout')

@section('title', 'Gallery')

@section('content')
    <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
            <h1 class="font-heading text-3xl font-bold text-brown">Gallery</h1>
            <p class="mt-1 text-sm text-brown">Photos shown on the website gallery.</p>
        </div>
    </div>

    <div class="mt-6 grid gap-6 lg:grid-cols-3">
        <div class="rounded-2xl bg-white p-6 shadow-sm h-fit">
            <h2 class="font-heading text-lg font-bold text-brown">Upload Image</h2>
            <form method="POST" action="{{ route('admin.gallery.store') }}" enctype="multipart/form-data" class="mt-4 space-y-4">
                @csrf
                <input name="title" required placeholder="Title" class="w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
                <select name="category" class="w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
                    @foreach (['Cakes', 'Sweets', 'Bakery', 'Interior', 'Kitchen'] as $cat)
                        <option value="{{ $cat }}">{{ $cat }}</option>
                    @endforeach
                </select>
                <input type="number" name="sort_order" placeholder="Sort order" class="w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
                <input type="file" name="image" accept="image/*" required class="block w-full text-sm text-brown">
                <label class="flex items-center gap-2 text-sm font-medium text-brown">
                    <input type="checkbox" name="is_active" value="1" checked class="rounded border-primary/30 text-primary"> Active
                </label>
                <button class="w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-gold hover:bg-primary-dark">Add to Gallery</button>
            </form>
        </div>

        <div class="lg:col-span-2">
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
                @forelse ($images as $image)
                    <div class="rounded-2xl overflow-hidden bg-white shadow-sm">
                        @if ($image->image)
                            <img src="{{ asset('storage/' . $image->image) }}" alt="" class="aspect-square w-full object-cover">
                        @else
                            <div class="grid aspect-square w-full place-items-center bg-cream text-4xl">🍰</div>
                        @endif
                        <div class="p-3">
                            <p class="text-sm font-semibold text-brown">{{ $image->title }}</p>
                            <p class="text-xs text-brown">{{ $image->category }}</p>
                            <form method="POST" action="{{ route('admin.gallery.destroy', $image) }}" data-confirm="Remove this image?">
                                @csrf
                                <button class="mt-2 rounded-lg bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100">Remove</button>
                            </form>
                        </div>
                    </div>
                @empty
                    <p class="col-span-full rounded-2xl bg-white p-6 text-sm text-brown">No images yet.</p>
                @endforelse
            </div>
        </div>
    </div>
@endsection

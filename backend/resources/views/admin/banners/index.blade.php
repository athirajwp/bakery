@extends('admin.layout')

@section('title', 'Banners')

@section('content')
    <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
            <h1 class="font-heading text-3xl font-bold text-brown">Banners</h1>
            <p class="mt-1 text-sm text-brown">Promotional banners shown on the website.</p>
        </div>
    </div>

    <div class="mt-6 grid gap-6 lg:grid-cols-2">
        <div class="rounded-2xl bg-white p-6 shadow-sm h-fit">
            <h2 class="font-heading text-lg font-bold text-brown">Add Banner</h2>
            <form method="POST" action="{{ route('admin.banners.store') }}" enctype="multipart/form-data" class="mt-4 space-y-4">
                @csrf
                <input name="title" required placeholder="Title" class="w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
                <input name="subtitle" placeholder="Subtitle" class="w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
                <input name="link" placeholder="Link (optional)" class="w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
                <input type="file" name="image" accept="image/*" class="block w-full text-sm text-brown">
                <div class="flex items-center gap-4">
                    <label class="flex items-center gap-2 text-sm font-medium text-brown">
                        <input type="checkbox" name="is_active" value="1" checked class="rounded border-primary/30 text-primary"> Active
                    </label>
                    <input type="number" name="sort_order" placeholder="Sort" class="w-24 rounded-xl border border-primary/15 bg-white px-3 py-2 text-sm outline-none focus:border-primary">
                </div>
                <button class="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-gold hover:bg-primary-dark">Add Banner</button>
            </form>
        </div>

        <div class="space-y-3">
            @forelse ($banners as $banner)
                <div class="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
                    @if ($banner->image)
                        <img src="{{ asset('storage/' . $banner->image) }}" alt="" class="h-16 w-24 rounded-xl object-cover">
                    @else
                        <span class="grid h-16 w-24 place-items-center rounded-xl bg-cream text-2xl">🖼️</span>
                    @endif
                    <div class="flex-1">
                        <p class="text-sm font-semibold text-brown">{{ $banner->title }}</p>
                        <p class="text-xs text-brown">{{ $banner->subtitle }} · {{ $banner->is_active ? 'Active' : 'Hidden' }}</p>
                    </div>
                    <form method="POST" action="{{ route('admin.banners.destroy', $banner) }}" data-confirm="Delete this banner?">
                        @csrf
                        <button class="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100">Delete</button>
                    </form>
                </div>
            @empty
                <p class="rounded-2xl bg-white p-6 text-sm text-brown">No banners yet.</p>
            @endforelse
        </div>
    </div>
@endsection

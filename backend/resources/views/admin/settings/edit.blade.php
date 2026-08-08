@extends('admin.layout')

@section('title', 'Settings & SEO')

@section('content')
    <div>
        <h1 class="font-heading text-3xl font-bold text-brown">Website Settings &amp; SEO</h1>
        <p class="mt-1 text-sm text-brown">Business details, contact info and SEO metadata used across the website.</p>
    </div>

    <form method="POST" action="{{ route('admin.settings.update') }}" class="mt-6 grid gap-6 lg:grid-cols-2">
        @csrf

        <div class="rounded-2xl bg-white p-6 shadow-sm">
            <h2 class="font-heading text-lg font-bold text-brown">General / Contact</h2>
            <div class="mt-4 grid gap-4">
                @foreach (['site_name', 'site_tamil_name', 'tagline', 'phone', 'whatsapp', 'email', 'address', 'working_hours', 'rating', 'review_count', 'map_embed', 'social_instagram', 'social_facebook'] as $key)
                    <label class="block">
                        <span class="text-xs font-semibold uppercase tracking-wider text-brown">{{ ucwords(str_replace('_', ' ', $key)) }}</span>
                        <input name="general[{{ $key }}]" value="{{ $general[$key] ?? '' }}"
                               {{ in_array($key, ['address', 'working_hours', 'map_embed'], true) ? '' : '' }}
                               class="mt-1.5 w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
                    </label>
                @endforeach
            </div>
        </div>

        <div class="space-y-6">
            <div class="rounded-2xl bg-white p-6 shadow-sm">
                <h2 class="font-heading text-lg font-bold text-brown">SEO</h2>
                <div class="mt-4 grid gap-4">
                    <label class="block">
                        <span class="text-xs font-semibold uppercase tracking-wider text-brown">Meta Title</span>
                        <input name="seo[meta_title]" value="{{ $seo['meta_title'] ?? '' }}" class="mt-1.5 w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
                    </label>
                    <label class="block">
                        <span class="text-xs font-semibold uppercase tracking-wider text-brown">Meta Description</span>
                        <textarea name="seo[meta_description]" rows="3" class="mt-1.5 w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">{{ $seo['meta_description'] ?? '' }}</textarea>
                    </label>
                    <label class="block">
                        <span class="text-xs font-semibold uppercase tracking-wider text-brown">Meta Keywords</span>
                        <input name="seo[meta_keywords]" value="{{ $seo['meta_keywords'] ?? '' }}" class="mt-1.5 w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
                    </label>
                    <label class="block">
                        <span class="text-xs font-semibold uppercase tracking-wider text-brown">OG Image URL</span>
                        <input name="seo[og_image]" value="{{ $seo['og_image'] ?? '' }}" placeholder="https://…" class="mt-1.5 w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
                    </label>
                </div>
            </div>

            <button class="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-gold transition hover:bg-primary-dark">Save All Settings</button>
        </div>
    </form>
@endsection

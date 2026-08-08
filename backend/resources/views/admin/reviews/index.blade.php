@extends('admin.layout')

@section('title', 'Reviews')

@section('content')
    <div>
        <h1 class="font-heading text-3xl font-bold text-brown">Customer Reviews</h1>
        <p class="mt-1 text-sm text-brown">Approve or remove reviews before they appear on the website.</p>
    </div>

    <div class="mt-6 space-y-3">
        @forelse ($reviews as $review)
            <div class="rounded-2xl bg-white p-5 shadow-sm">
                <div class="flex flex-wrap items-center justify-between gap-3">
                    <div class="flex items-center gap-3">
                        <span class="grid h-10 w-10 place-items-center rounded-full bg-primary/10 font-heading text-lg font-bold text-primary">{{ $review->customer_name[0] }}</span>
                        <div>
                            <p class="text-sm font-bold text-brown">{{ $review->customer_name }} <span class="font-normal text-brown">· {{ $review->place }}</span></p>
                            <p class="text-xs text-brown">⭐ {{ $review->rating }} / 5 · {{ $review->created_at->format('d M Y') }}</p>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <form method="POST" action="{{ route('admin.reviews.toggle', $review) }}">
                            @csrf
                            <button class="rounded-lg px-3 py-1.5 text-xs font-semibold {{ $review->is_approved ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' : 'bg-green-50 text-green-700 hover:bg-green-100' }}">
                                {{ $review->is_approved ? 'Unapprove' : 'Approve' }}
                            </button>
                        </form>
                        <form method="POST" action="{{ route('admin.reviews.destroy', $review) }}" data-confirm="Delete this review?">
                            @csrf
                            <button class="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100">Delete</button>
                        </form>
                    </div>
                </div>
                <p class="mt-3 text-sm leading-relaxed text-brown">“{{ $review->comment }}”</p>
            </div>
        @empty
            <p class="rounded-2xl bg-white p-6 text-sm text-brown">No reviews yet.</p>
        @endforelse
    </div>

    <div class="mt-6">{{ $reviews->links() }}</div>
@endsection

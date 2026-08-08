@extends('admin.layout')

@section('title', 'Enquiries')

@section('content')
    <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
            <h1 class="font-heading text-3xl font-bold text-brown">Customer Enquiries</h1>
            <p class="mt-1 text-sm text-brown">{{ $enquiries->total() }} enquiry(s)</p>
        </div>
        <form method="GET" class="flex">
            <select name="status" onchange="this.form.submit()" class="rounded-full border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
                <option value="">All statuses</option>
                @foreach ($statuses as $status)
                    <option value="{{ $status }}" {{ request('status') === $status ? 'selected' : '' }}>{{ ucfirst($status) }}</option>
                @endforeach
            </select>
        </form>
    </div>

    <div class="mt-6 space-y-3">
        @forelse ($enquiries as $enquiry)
            <div class="rounded-2xl bg-white p-5 shadow-sm">
                <div class="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p class="text-sm font-bold text-brown">{{ $enquiry->name }}
                            <span class="font-normal text-brown">· {{ $enquiry->phone }}</span>
                            @if ($enquiry->email)<span class="font-normal text-brown">· {{ $enquiry->email }}</span>@endif
                        </p>
                        <p class="mt-0.5 text-xs text-brown">{{ $enquiry->created_at->format('d M Y, h:i A') }}</p>
                    </div>
                    <div class="flex gap-2">
                        <form method="POST" action="{{ route('admin.enquiries.status', $enquiry) }}" class="flex gap-1">
                            @csrf
                            <select name="status" onchange="this.form.submit()" class="rounded-full border border-primary/15 bg-white px-3 py-1.5 text-xs outline-none focus:border-primary">
                                @foreach ($statuses as $status)
                                    <option value="{{ $status }}" {{ $enquiry->status === $status ? 'selected' : '' }}>{{ ucfirst($status) }}</option>
                                @endforeach
                            </select>
                        </form>
                        <a href="https://wa.me/{{ preg_replace('/\D/', '', $enquiry->phone) }}" target="_blank" class="rounded-lg bg-[#25D366]/10 px-3 py-1.5 text-xs font-semibold text-[#128C7E] hover:bg-[#25D366]/20">WhatsApp</a>
                        <form method="POST" action="{{ route('admin.enquiries.destroy', $enquiry) }}" data-confirm="Delete this enquiry?">
                            @csrf
                            <button class="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100">Delete</button>
                        </form>
                    </div>
                </div>
                <p class="mt-3 rounded-xl bg-cream p-4 text-sm leading-relaxed text-brown">{{ $enquiry->message }}</p>
            </div>
        @empty
            <p class="rounded-2xl bg-white p-6 text-sm text-brown">No enquiries yet.</p>
        @endforelse
    </div>

    <div class="mt-6">{{ $enquiries->links() }}</div>
@endsection

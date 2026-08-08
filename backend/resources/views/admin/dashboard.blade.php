@extends('admin.layout')

@section('title', 'Dashboard')

@section('content')
    <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
            <h1 class="font-heading text-3xl font-bold text-brown">Dashboard</h1>
            <p class="mt-1 text-sm text-brown">Welcome back! Here is what's happening today.</p>
        </div>
        <a href="{{ route('admin.orders.index') }}" class="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-gold transition hover:bg-primary-dark">
            View Orders
        </a>
    </div>

    <div class="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
        @php
            $cards = [
                ['label' => 'Total Products', 'value' => $stats['products'], 'icon' => 'M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z', 'color' => 'bg-primary'],
                ['label' => 'Total Orders', 'value' => $stats['orders'], 'icon' => 'M6 2l3 6h6l3-6h1a2 2 0 012 2v16H4V4a2 2 0 012-2z', 'color' => 'bg-[#b8860b]'],
                ['label' => 'Pending Orders', 'value' => $stats['pending_orders'], 'icon' => 'M12 6v6l4 2', 'color' => 'bg-[#c0392b]'],
                ['label' => 'Revenue (₹)', 'value' => '₹' . number_format($stats['revenue'], 0), 'icon' => 'M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6', 'color' => 'bg-[#15803d]'],
                ['label' => 'Total Reviews', 'value' => $stats['reviews'], 'icon' => 'M12 2l3 6h6l-5 4 2 6-6-4-6 4 2-6-5-4h6l3-6z', 'color' => 'bg-[#7c3aed]'],
                ['label' => 'New Enquiries', 'value' => $stats['new_enquiries'], 'icon' => 'M4 4h16a2 2 0 012 2v10a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2z', 'color' => 'bg-[#0e7490]'],
            ];
        @endphp
        @foreach ($cards as $card)
            <div class="rounded-2xl bg-white p-5 shadow-sm">
                <div class="flex items-center gap-3">
                    <span class="grid h-11 w-11 place-items-center rounded-xl text-gold {{ $card['color'] }}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="{{ $card['icon'] }}"/></svg>
                    </span>
                    <div>
                        <p class="text-xs font-medium uppercase tracking-wider text-brown">{{ $card['label'] }}</p>
                        <p class="font-heading text-2xl font-bold text-brown">{{ $card['value'] }}</p>
                    </div>
                </div>
            </div>
        @endforeach
    </div>

    <div class="mt-6 grid gap-6 lg:grid-cols-2">
        <div class="rounded-2xl bg-white p-6 shadow-sm">
            <h2 class="font-heading text-lg font-bold text-brown">Recent Orders</h2>
            @forelse ($recentOrders as $order)
                <div class="flex items-center justify-between gap-3 border-b border-primary/5 py-3 last:border-0">
                    <div>
                        <p class="text-sm font-semibold text-brown">{{ $order->order_number }}</p>
                        <p class="text-xs text-brown">{{ $order->customer_name }} · {{ $order->items_count }} item(s) · ₹{{ number_format($order->total, 0) }}</p>
                    </div>
                    <span class="rounded-full px-3 py-1 text-xs font-semibold
                        {{ $order->status === 'pending' ? 'bg-amber-100 text-amber-700' : ($order->status === 'cancelled' ? 'bg-red-100 text-red-700' : ($order->status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700')) }}">
                        {{ ucfirst($order->status) }}
                    </span>
                </div>
            @empty
                <p class="py-6 text-sm text-brown">No orders yet.</p>
            @endforelse
        </div>

        <div class="rounded-2xl bg-white p-6 shadow-sm">
            <h2 class="font-heading text-lg font-bold text-brown">Latest Enquiries</h2>
            @forelse ($recentEnquiries as $enquiry)
                <div class="flex items-center justify-between gap-3 border-b border-primary/5 py-3 last:border-0">
                    <div>
                        <p class="text-sm font-semibold text-brown">{{ $enquiry->name }}</p>
                        <p class="text-xs text-brown">{{ $enquiry->phone }} · {{ \Illuminate\Support\Str::limit($enquiry->message, 48) }}</p>
                    </div>
                    <span class="rounded-full px-3 py-1 text-xs font-semibold
                        {{ $enquiry->status === 'new' ? 'bg-amber-100 text-amber-700' : ($enquiry->status === 'replied' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700') }}">
                        {{ ucfirst($enquiry->status) }}
                    </span>
                </div>
            @empty
                <p class="py-6 text-sm text-brown">No enquiries yet.</p>
            @endforelse
        </div>
    </div>
@endsection

@extends('admin.layout')

@section('title', 'Orders')

@section('content')
    <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
            <h1 class="font-heading text-3xl font-bold text-brown">Orders</h1>
            <p class="mt-1 text-sm text-brown">{{ $orders->total() }} order(s)</p>
        </div>
        <div class="flex flex-wrap gap-3">
            <form method="GET" class="flex">
                <input type="search" name="q" value="{{ request('q') }}" placeholder="Order # / name / phone…"
                       class="rounded-l-full border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
                <button class="rounded-r-full bg-primary px-4 text-sm font-semibold text-gold">Go</button>
            </form>
            <form method="GET" class="flex">
                <select name="status" onchange="this.form.submit()" class="rounded-full border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
                    <option value="">All statuses</option>
                    @foreach ($statuses as $status)
                        <option value="{{ $status }}" {{ request('status') === $status ? 'selected' : '' }}>{{ ucfirst($status) }}</option>
                    @endforeach
                </select>
            </form>
        </div>
    </div>

    <div class="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table class="w-full min-w-[720px] text-left text-sm">
            <thead class="border-b border-primary/10 bg-cream text-xs uppercase tracking-wider text-brown">
                <tr>
                    <th class="px-5 py-3">Order #</th>
                    <th class="px-5 py-3">Customer</th>
                    <th class="px-5 py-3">Phone</th>
                    <th class="px-5 py-3">Total</th>
                    <th class="px-5 py-3">Status</th>
                    <th class="px-5 py-3">Date</th>
                    <th class="px-5 py-3 text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-primary/5">
                @forelse ($orders as $order)
                    <tr class="hover:bg-cream/50">
                        <td class="px-5 py-3 font-semibold text-brown">{{ $order->order_number }}</td>
                        <td class="px-5 py-3">{{ $order->customer_name }}</td>
                        <td class="px-5 py-3">{{ $order->phone }}</td>
                        <td class="px-5 py-3 font-semibold">₹{{ number_format($order->total, 2) }}</td>
                        <td class="px-5 py-3">
                            <span class="rounded-full px-2.5 py-1 text-xs font-semibold
                                {{ $order->status === 'pending' ? 'bg-amber-100 text-amber-700' : ($order->status === 'cancelled' ? 'bg-red-100 text-red-700' : ($order->status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700')) }}">
                                {{ ucfirst($order->status) }}
                            </span>
                        </td>
                        <td class="px-5 py-3">{{ $order->created_at->format('d M Y, h:i A') }}</td>
                        <td class="px-5 py-3">
                            <div class="flex justify-end">
                                <a href="{{ route('admin.orders.show', $order) }}" class="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100">View</a>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="7" class="px-5 py-10 text-center text-brown">No orders found.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="mt-6">{{ $orders->links() }}</div>
@endsection

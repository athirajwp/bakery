@extends('admin.layout')

@section('title', 'Order ' . $order->order_number)

@section('content')
    <div class="mb-6">
        <a href="{{ route('admin.orders.index') }}" class="text-sm font-semibold text-primary hover:underline">← Back to Orders</a>
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
        <div class="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 class="font-heading text-2xl font-bold text-brown">{{ $order->order_number }}</h1>
                    <p class="mt-1 text-sm text-brown">Placed on {{ $order->created_at->format('d M Y, h:i A') }}</p>
                </div>
                <span class="rounded-full px-4 py-1.5 text-sm font-semibold
                    {{ $order->status === 'pending' ? 'bg-amber-100 text-amber-700' : ($order->status === 'cancelled' ? 'bg-red-100 text-red-700' : ($order->status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700')) }}">
                    {{ ucfirst($order->status) }}
                </span>
            </div>

            <table class="mt-6 w-full text-left text-sm">
                <thead class="border-b border-primary/10 text-xs uppercase tracking-wider text-brown">
                    <tr><th class="py-2">Item</th><th class="py-2">Qty</th><th class="py-2">Price</th><th class="py-2 text-right">Total</th></tr>
                </thead>
                <tbody class="divide-y divide-primary/5">
                    @foreach ($order->items as $item)
                        <tr>
                            <td class="py-3 font-semibold text-brown">{{ $item->product_name }}</td>
                            <td class="py-3">{{ $item->quantity }}</td>
                            <td class="py-3">₹{{ number_format($item->price, 2) }}</td>
                            <td class="py-3 text-right">₹{{ number_format($item->total, 2) }}</td>
                        </tr>
                    @endforeach
                </tbody>
                <tfoot class="border-t border-primary/10 text-sm font-semibold text-brown">
                    <tr><td colspan="3" class="py-2">Items Total</td><td class="py-2 text-right">₹{{ number_format($order->items_total, 2) }}</td></tr>
                    <tr><td colspan="3" class="py-2">Delivery</td><td class="py-2 text-right">₹{{ number_format($order->delivery_charge, 2) }}</td></tr>
                    <tr class="text-base"><td colspan="3" class="py-2 font-heading">Grand Total</td><td class="py-2 text-right font-heading text-primary">₹{{ number_format($order->total, 2) }}</td></tr>
                </tfoot>
            </table>

            <div class="mt-6 rounded-xl bg-cream p-5">
                <h2 class="font-heading text-base font-bold text-brown">Customer Details</h2>
                <dl class="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                    <div><dt class="text-xs uppercase tracking-wider text-brown">Name</dt><dd class="font-semibold text-brown">{{ $order->customer_name }}</dd></div>
                    <div><dt class="text-xs uppercase tracking-wider text-brown">Phone</dt><dd class="font-semibold text-brown">{{ $order->phone }}</dd></div>
                    <div><dt class="text-xs uppercase tracking-wider text-brown">Email</dt><dd class="text-brown">{{ $order->email ?? '—' }}</dd></div>
                    <div><dt class="text-xs uppercase tracking-wider text-brown">Payment</dt><dd class="text-brown">{{ ucfirst($order->payment_method) }}</dd></div>
                    @if ($order->address)
                        <div class="sm:col-span-2"><dt class="text-xs uppercase tracking-wider text-brown">Address</dt><dd class="text-brown">{{ $order->address }}{{ $order->city ? ', ' . $order->city : '' }}</dd></div>
                    @endif
                    @if ($order->notes)
                        <div class="sm:col-span-2"><dt class="text-xs uppercase tracking-wider text-brown">Notes</dt><dd class="text-brown">{{ $order->notes }}</dd></div>
                    @endif
                </dl>
            </div>
        </div>

        <div class="rounded-2xl bg-white p-6 shadow-sm h-fit">
            <h2 class="font-heading text-lg font-bold text-brown">Update Status</h2>
            <form method="POST" action="{{ route('admin.orders.status', $order) }}" class="mt-4 space-y-3">
                @csrf
                <select name="status" class="w-full rounded-xl border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
                    @foreach ($statuses as $status)
                        <option value="{{ $status }}" {{ $order->status === $status ? 'selected' : '' }}>{{ ucfirst($status) }}</option>
                    @endforeach
                </select>
                <button class="w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-gold hover:bg-primary-dark">Update Status</button>
            </form>

            <div class="mt-6 space-y-2">
                <a href="https://wa.me/{{ preg_replace('/\D/', '', $order->phone) }}?text=Hi {{ urlencode($order->customer_name) }}, this is Kavitha Sweets regarding your order {{ $order->order_number }}." target="_blank" class="block rounded-full bg-[#25D366] py-2.5 text-center text-sm font-semibold text-white">WhatsApp Customer</a>
                <a href="tel:{{ $order->phone }}" class="block rounded-full bg-primary/10 py-2.5 text-center text-sm font-semibold text-primary hover:bg-primary/20">Call Customer</a>
            </div>
        </div>
    </div>
@endsection

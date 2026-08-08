@extends('admin.layout')

@section('title', 'Products')

@section('content')
    <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
            <h1 class="font-heading text-3xl font-bold text-brown">Products</h1>
            <p class="mt-1 text-sm text-brown">{{ $products->total() }} product(s)</p>
        </div>
        <div class="flex gap-3">
            <form method="GET" class="flex">
                <input type="search" name="q" value="{{ request('q') }}" placeholder="Search products…"
                       class="rounded-l-full border border-primary/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary">
                <button class="rounded-r-full bg-primary px-4 text-sm font-semibold text-gold">Go</button>
            </form>
            <a href="{{ route('admin.products.create') }}" class="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-gold transition hover:bg-primary-dark">+ Add Product</a>
        </div>
    </div>

    <div class="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table class="w-full min-w-[760px] text-left text-sm">
            <thead class="border-b border-primary/10 bg-cream text-xs uppercase tracking-wider text-brown">
                <tr>
                    <th class="px-5 py-3">Image</th>
                    <th class="px-5 py-3">Name</th>
                    <th class="px-5 py-3">Category</th>
                    <th class="px-5 py-3">Price</th>
                    <th class="px-5 py-3">Rating</th>
                    <th class="px-5 py-3">Status</th>
                    <th class="px-5 py-3 text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-primary/5">
                @forelse ($products as $product)
                    <tr class="hover:bg-cream/50">
                        <td class="px-5 py-3">
                            @if ($product->image)
                                <img src="{{ asset('storage/' . $product->image) }}" alt="" class="h-12 w-12 rounded-lg object-cover">
                            @else
                                <span class="grid h-12 w-12 place-items-center rounded-lg bg-cream text-primary">🍰</span>
                            @endif
                        </td>
                        <td class="px-5 py-3 font-semibold text-brown">{{ $product->name }}</td>
                        <td class="px-5 py-3">{{ $product->category?->name }}</td>
                        <td class="px-5 py-3">₹{{ number_format($product->price, 2) }}</td>
                        <td class="px-5 py-3">{{ $product->rating }} ⭐</td>
                        <td class="px-5 py-3">
                            <span class="rounded-full px-2.5 py-1 text-xs font-semibold {{ $product->is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700' }}">
                                {{ $product->is_active ? 'Active' : 'Hidden' }}
                            </span>
                        </td>
                        <td class="px-5 py-3">
                            <div class="flex justify-end gap-2">
                                <a href="{{ route('admin.products.edit', $product) }}" class="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100">Edit</a>
                                <form method="POST" action="{{ route('admin.products.destroy', $product) }}" data-confirm="Delete {{ $product->name }}?">
                                    @csrf
                                    <button class="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr><td colspan="7" class="px-5 py-10 text-center text-brown">No products found.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>

    <div class="mt-6">{{ $products->links() }}</div>
@endsection

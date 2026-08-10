<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class OrderController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        return OrderResource::collection(
            Order::withCount('items')
                ->when($request->filled('status'), fn ($q) => $q->where('status', $request->input('status')))
                ->when($request->filled('q'), fn ($q) => $q->where(fn ($qq) => $qq
                    ->where('order_number', 'like', '%' . $request->input('q') . '%')
                    ->orWhere('customer_name', 'like', '%' . $request->input('q') . '%')
                    ->orWhere('phone', 'like', '%' . $request->input('q') . '%')))
                ->orderByDesc('id')
                ->paginate($request->integer('per_page', 15))
        );
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'customer_name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'email' => ['nullable', 'email'],
            'address' => ['nullable', 'string'],
            'city' => ['nullable', 'string', 'max:255'],
            'delivery_charge' => ['nullable', 'numeric', 'min:0'],
            'payment_method' => ['nullable', 'string', 'max:30'],
            'notes' => ['nullable', 'string'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['nullable', 'exists:products,id'],
            'items.*.name' => ['required', 'string', 'max:255'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'items.*.price' => ['required', 'numeric', 'min:0'],
        ]);

        $itemsTotal = collect($validated['items'])->sum(fn ($i) => $i['price'] * $i['quantity']);
        $deliveryCharge = (float) ($validated['delivery_charge'] ?? 0);

        $order = Order::create([
            'user_id' => $request->user()?->id,
            'order_number' => 'KS-' . strtoupper(uniqid()),
            'customer_name' => $validated['customer_name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'] ?? null,
            'address' => $validated['address'] ?? null,
            'city' => $validated['city'] ?? null,
            'items_total' => $itemsTotal,
            'delivery_charge' => $deliveryCharge,
            'total' => $itemsTotal + $deliveryCharge,
            'status' => 'pending',
            'payment_method' => $validated['payment_method'] ?? 'cod',
            'notes' => $validated['notes'] ?? null,
        ]);

        foreach ($validated['items'] as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'] ?? null,
                'product_name' => $item['name'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
                'total' => $item['price'] * $item['quantity'],
            ]);
        }

        return response()->json([
            'message' => 'Order placed successfully.',
            'order' => new OrderResource($order->load('items')),
        ], 201);
    }

    public function myOrders(Request $request): AnonymousResourceCollection
    {
        return OrderResource::collection(
            Order::with('items')->where('user_id', $request->user()->id)->orderByDesc('id')->paginate(10)
        );
    }

    public function show(Order $order): OrderResource
    {
        return new OrderResource($order->load('items'));
    }

    public function updateStatus(Request $request, Order $order): JsonResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:' . implode(',', Order::STATUSES)],
        ]);

        $order->update(['status' => $validated['status']]);

        return response()->json(new OrderResource($order->fresh('items')));
    }
}

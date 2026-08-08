<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use App\Models\Order;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'stats' => [
                'products' => Product::count(),
                'active_products' => Product::where('is_active', true)->count(),
                'orders' => Order::count(),
                'pending_orders' => Order::where('status', 'pending')->count(),
                'revenue' => (float) Order::whereIn('status', ['delivered', 'ready', 'preparing', 'confirmed', 'pending'])->sum('total'),
                'reviews' => Review::count(),
                'approved_reviews' => Review::where('is_approved', true)->count(),
                'new_enquiries' => Enquiry::where('status', 'new')->count(),
            ],
            'recent_orders' => Order::with('items')->latest()->limit(5)->get(),
            'recent_enquiries' => Enquiry::latest()->limit(5)->get(),
        ]);
    }
}

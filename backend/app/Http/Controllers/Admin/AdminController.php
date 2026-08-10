<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\Category;
use App\Models\Enquiry;
use App\Models\GalleryImage;
use App\Models\Order;
use App\Models\Product;
use App\Models\Review;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    /* ------------------------------------------------------------------ */
    /* Auth                                                               */
    /* ------------------------------------------------------------------ */

    public function showLogin()
    {
        return view('admin.login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required'],
            'password' => ['required'],
        ]);

        $loginField = filter_var($request->input('email'), FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        $credentials = [
            $loginField => $request->input('email'),
            'password' => $request->input('password'),
        ];

        if (!Auth::attempt($credentials, $request->boolean('remember'))) {
            return back()->withErrors(['email' => 'Invalid credentials.'])->onlyInput('email');
        }

        if (!Auth::user()->isAdmin()) {
            Auth::logout();

            return back()->withErrors(['email' => 'This account does not have admin access.']);
        }

        return redirect()->route('admin.dashboard');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }

    /* ------------------------------------------------------------------ */
    /* Dashboard                                                          */
    /* ------------------------------------------------------------------ */

    public function dashboard()
    {
        return view('admin.dashboard', [
            'stats' => [
                'products' => Product::count(),
                'orders' => Order::count(),
                'pending_orders' => Order::where('status', 'pending')->count(),
                'revenue' => Order::whereNot('status', 'cancelled')->sum('total'),
                'reviews' => Review::count(),
                'new_enquiries' => Enquiry::where('status', 'new')->count(),
            ],
            'recentOrders' => Order::withCount('items')->latest()->limit(6)->get(),
            'recentEnquiries' => Enquiry::latest()->limit(6)->get(),
        ]);
    }

    /* ------------------------------------------------------------------ */
    /* Products                                                           */
    /* ------------------------------------------------------------------ */

    public function products(Request $request)
    {
        return view('admin.products.index', [
            'products' => Product::with('category')
                ->when($request->filled('q'), fn ($q) => $q->where('name', 'like', '%' . $request->input('q') . '%'))
                ->latest()
                ->paginate(15),
        ]);
    }

    public function productCreate()
    {
        return view('admin.products.form', [
            'product' => new Product,
            'categories' => Category::all(),
        ]);
    }

    public function productStore(Request $request)
    {
        $validated = $this->validateProduct($request);
        $validated['image'] = $this->storeImage($request, 'products');

        Product::create($validated);

        return redirect()->route('admin.products.index')->with('success', 'Product created.');
    }

    public function productEdit(Product $product)
    {
        return view('admin.products.form', [
            'product' => $product,
            'categories' => Category::all(),
        ]);
    }

    public function productUpdate(Request $request, Product $product)
    {
        $validated = $this->validateProduct($request);
        $validated['image'] = $this->storeImage($request, 'products', $product->image);

        $product->update($validated);

        return redirect()->route('admin.products.index')->with('success', 'Product updated.');
    }

    public function productDestroy(Product $product)
    {
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }
        $product->delete();

        return back()->with('success', 'Product deleted.');
    }

    /* ------------------------------------------------------------------ */
    /* Categories                                                         */
    /* ------------------------------------------------------------------ */

    public function categories()
    {
        return view('admin.categories.index', [
            'categories' => Category::withCount('products')->get(),
        ]);
    }

    public function categoryStore(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'is_active' => ['nullable', 'boolean'],
        ]);
        $validated['image'] = $this->storeImage($request, 'categories');
        $validated['is_active'] = $request->boolean('is_active');

        Category::create($validated);

        return back()->with('success', 'Category created.');
    }

    public function categoryUpdate(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'is_active' => ['nullable', 'boolean'],
        ]);
        $validated['image'] = $this->storeImage($request, 'categories', $category->image);
        $validated['is_active'] = $request->boolean('is_active');

        $category->update($validated);

        return back()->with('success', 'Category updated.');
    }

    public function categoryDestroy(Category $category)
    {
        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }
        $category->delete();

        return back()->with('success', 'Category deleted.');
    }

    /* ------------------------------------------------------------------ */
    /* Orders                                                             */
    /* ------------------------------------------------------------------ */

    public function orders(Request $request)
    {
        return view('admin.orders.index', [
            'orders' => Order::withCount('items')
                ->when($request->filled('status'), fn ($q) => $q->where('status', $request->input('status')))
                ->when($request->filled('q'), fn ($q) => $q->where(fn ($qq) => $qq
                    ->where('order_number', 'like', '%' . $request->input('q') . '%')
                    ->orWhere('customer_name', 'like', '%' . $request->input('q') . '%')
                    ->orWhere('phone', 'like', '%' . $request->input('q') . '%')))
                ->latest()
                ->paginate(15),
            'statuses' => Order::STATUSES,
        ]);
    }

    public function orderShow(Order $order)
    {
        return view('admin.orders.show', [
            'order' => $order->load('items'),
            'statuses' => Order::STATUSES,
        ]);
    }

    public function orderUpdateStatus(Request $request, Order $order)
    {
        $request->validate(['status' => ['required', 'in:' . implode(',', Order::STATUSES)]]);

        $order->update(['status' => $request->input('status')]);

        return back()->with('success', 'Order status updated.');
    }

    /* ------------------------------------------------------------------ */
    /* Gallery                                                            */
    /* ------------------------------------------------------------------ */

    public function gallery()
    {
        return view('admin.gallery.index', [
            'images' => GalleryImage::orderBy('sort_order')->get(),
        ]);
    }

    public function galleryStore(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:40'],
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'sort_order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);
        $validated['image'] = $this->storeImage($request, 'gallery');
        $validated['is_active'] = $request->boolean('is_active');
        $validated['sort_order'] = $request->integer('sort_order', 0);

        GalleryImage::create($validated);

        return back()->with('success', 'Image added to gallery.');
    }

    public function galleryDestroy(GalleryImage $galleryImage)
    {
        if ($galleryImage->image) {
            Storage::disk('public')->delete($galleryImage->image);
        }
        $galleryImage->delete();

        return back()->with('success', 'Image removed.');
    }

    /* ------------------------------------------------------------------ */
    /* Reviews                                                            */
    /* ------------------------------------------------------------------ */

    public function reviews()
    {
        return view('admin.reviews.index', [
            'reviews' => Review::latest()->paginate(15),
        ]);
    }

    public function reviewToggle(Review $review)
    {
        $review->update(['is_approved' => !$review->is_approved]);

        return back()->with('success', 'Review updated.');
    }

    public function reviewDestroy(Review $review)
    {
        $review->delete();

        return back()->with('success', 'Review deleted.');
    }

    /* ------------------------------------------------------------------ */
    /* Banners                                                            */
    /* ------------------------------------------------------------------ */

    public function banners()
    {
        return view('admin.banners.index', [
            'banners' => Banner::orderBy('sort_order')->get(),
        ]);
    }

    public function bannerStore(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'link' => ['nullable', 'url'],
            'sort_order' => ['nullable', 'integer'],
            'is_active' => ['nullable', 'boolean'],
        ]);
        $validated['image'] = $this->storeImage($request, 'banners');
        $validated['is_active'] = $request->boolean('is_active');
        $validated['sort_order'] = $request->integer('sort_order', 0);

        Banner::create($validated);

        return back()->with('success', 'Banner created.');
    }

    public function bannerDestroy(Banner $banner)
    {
        if ($banner->image) {
            Storage::disk('public')->delete($banner->image);
        }
        $banner->delete();

        return back()->with('success', 'Banner deleted.');
    }

    /* ------------------------------------------------------------------ */
    /* Enquiries                                                          */
    /* ------------------------------------------------------------------ */

    public function enquiries(Request $request)
    {
        return view('admin.enquiries.index', [
            'enquiries' => Enquiry::when($request->filled('status'), fn ($q) => $q->where('status', $request->input('status')))
                ->latest()
                ->paginate(15),
            'statuses' => Enquiry::STATUSES,
        ]);
    }

    public function enquiryUpdate(Request $request, Enquiry $enquiry)
    {
        $request->validate(['status' => ['required', 'in:' . implode(',', Enquiry::STATUSES)]]);

        $enquiry->update(['status' => $request->input('status')]);

        return back()->with('success', 'Enquiry updated.');
    }

    public function enquiryDestroy(Enquiry $enquiry)
    {
        $enquiry->delete();

        return back()->with('success', 'Enquiry deleted.');
    }

    /* ------------------------------------------------------------------ */
    /* Settings & SEO                                                     */
    /* ------------------------------------------------------------------ */

    public function settings()
    {
        return view('admin.settings.edit', [
            'general' => Setting::where('group', 'general')->pluck('value', 'key'),
            'seo' => Setting::where('group', 'seo')->pluck('value', 'key'),
        ]);
    }

    public function settingsUpdate(Request $request)
    {
        $request->validate([
            'general' => ['array'],
            'seo' => ['array'],
        ]);

        foreach (['general', 'seo'] as $group) {
            foreach ($request->input($group, []) as $key => $value) {
                Setting::set($key, $value ?? '', $group);
            }
        }

        return back()->with('success', 'Settings saved.');
    }

    /* ------------------------------------------------------------------ */
    /* Helpers                                                            */
    /* ------------------------------------------------------------------ */

    protected function validateProduct(Request $request): array
    {
        return $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'old_price' => ['nullable', 'numeric', 'min:0'],
            'weight' => ['nullable', 'string', 'max:50'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
            'rating' => ['nullable', 'numeric', 'between:0,5'],
            'reviews_count' => ['nullable', 'integer', 'min:0'],
            'tags' => ['nullable', 'array'],
            'is_best_seller' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
        ]);
    }

    protected function storeImage(Request $request, string $dir, ?string $old = null): ?string
    {
        if (!$request->hasFile('image')) {
            return $old;
        }

        if ($old) {
            Storage::disk('public')->delete($old);
        }

        return $request->file('image')->storeAs($dir, Str::uuid() . '.' . $request->file('image')->getClientOriginalExtension(), 'public');
    }
}

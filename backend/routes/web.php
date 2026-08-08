<?php

use App\Http\Controllers\Admin\AdminController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => redirect('/admin'));

Route::middleware('guest')->group(function () {
    Route::get('/admin/login', [AdminController::class, 'showLogin'])->name('admin.login');
    Route::post('/admin/login', [AdminController::class, 'login']);
});

Route::post('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout')->middleware('auth');

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'dashboard'])->name('dashboard');

    Route::get('/products', [AdminController::class, 'products'])->name('products.index');
    Route::get('/products/create', [AdminController::class, 'productCreate'])->name('products.create');
    Route::post('/products', [AdminController::class, 'productStore'])->name('products.store');
    Route::get('/products/{product}/edit', [AdminController::class, 'productEdit'])->name('products.edit');
    Route::post('/products/{product}', [AdminController::class, 'productUpdate'])->name('products.update');
    Route::post('/products/{product}/delete', [AdminController::class, 'productDestroy'])->name('products.destroy');

    Route::get('/categories', [AdminController::class, 'categories'])->name('categories.index');
    Route::post('/categories', [AdminController::class, 'categoryStore'])->name('categories.store');
    Route::post('/categories/{category}', [AdminController::class, 'categoryUpdate'])->name('categories.update');
    Route::post('/categories/{category}/delete', [AdminController::class, 'categoryDestroy'])->name('categories.destroy');

    Route::get('/orders', [AdminController::class, 'orders'])->name('orders.index');
    Route::get('/orders/{order}', [AdminController::class, 'orderShow'])->name('orders.show');
    Route::post('/orders/{order}/status', [AdminController::class, 'orderUpdateStatus'])->name('orders.status');

    Route::get('/gallery', [AdminController::class, 'gallery'])->name('gallery.index');
    Route::post('/gallery', [AdminController::class, 'galleryStore'])->name('gallery.store');
    Route::post('/gallery/{galleryImage}/delete', [AdminController::class, 'galleryDestroy'])->name('gallery.destroy');

    Route::get('/reviews', [AdminController::class, 'reviews'])->name('reviews.index');
    Route::post('/reviews/{review}/toggle', [AdminController::class, 'reviewToggle'])->name('reviews.toggle');
    Route::post('/reviews/{review}/delete', [AdminController::class, 'reviewDestroy'])->name('reviews.destroy');

    Route::get('/banners', [AdminController::class, 'banners'])->name('banners.index');
    Route::post('/banners', [AdminController::class, 'bannerStore'])->name('banners.store');
    Route::post('/banners/{banner}/delete', [AdminController::class, 'bannerDestroy'])->name('banners.destroy');

    Route::get('/enquiries', [AdminController::class, 'enquiries'])->name('enquiries.index');
    Route::post('/enquiries/{enquiry}/status', [AdminController::class, 'enquiryUpdate'])->name('enquiries.status');
    Route::post('/enquiries/{enquiry}/delete', [AdminController::class, 'enquiryDestroy'])->name('enquiries.destroy');

    Route::get('/settings', [AdminController::class, 'settings'])->name('settings.edit');
    Route::post('/settings', [AdminController::class, 'settingsUpdate'])->name('settings.update');
});

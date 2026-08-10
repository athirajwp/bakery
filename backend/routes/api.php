<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\EnquiryController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\SettingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public endpoints (used by the React frontend)
|--------------------------------------------------------------------------
*/

Route::get('settings', [SettingController::class, 'public']);
Route::get('categories', [CategoryController::class, 'index']);
Route::get('products', [ProductController::class, 'index']);
Route::get('products/{product}', [ProductController::class, 'show']);
Route::get('gallery', [GalleryController::class, 'index']);
Route::get('banners', [BannerController::class, 'index']);
Route::get('reviews', [ReviewController::class, 'index']);
Route::post('reviews', [ReviewController::class, 'store']);
Route::post('enquiries', [EnquiryController::class, 'store']);

/*
|--------------------------------------------------------------------------
| Customer auth
|--------------------------------------------------------------------------
*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Authenticated customer endpoints
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('me', [AuthController::class, 'me']);
    Route::get('my-orders', [OrderController::class, 'myOrders']);
    Route::post('orders', [OrderController::class, 'store']);
});

/*
|--------------------------------------------------------------------------
| Admin endpoints (auth:sanctum + admin role)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('dashboard', DashboardController::class);

    Route::get('products', [ProductController::class, 'indexAll']);
    Route::post('products', [ProductController::class, 'store']);
    Route::post('products/{product}', [ProductController::class, 'update']);
    Route::delete('products/{product}', [ProductController::class, 'destroy']);

    Route::get('categories', [CategoryController::class, 'indexAll']);
    Route::post('categories', [CategoryController::class, 'store']);
    Route::post('categories/{category}', [CategoryController::class, 'update']);
    Route::delete('categories/{category}', [CategoryController::class, 'destroy']);

    Route::get('orders', [OrderController::class, 'index']);
    Route::get('orders/{order}', [OrderController::class, 'show']);
    Route::patch('orders/{order}/status', [OrderController::class, 'updateStatus']);

    Route::get('gallery', [GalleryController::class, 'indexAll']);
    Route::post('gallery', [GalleryController::class, 'store']);
    Route::post('gallery/{galleryImage}', [GalleryController::class, 'update']);
    Route::delete('gallery/{galleryImage}', [GalleryController::class, 'destroy']);

    Route::get('reviews', [ReviewController::class, 'indexAll']);
    Route::patch('reviews/{review}', [ReviewController::class, 'update']);
    Route::delete('reviews/{review}', [ReviewController::class, 'destroy']);

    Route::get('banners', [BannerController::class, 'indexAll']);
    Route::post('banners', [BannerController::class, 'store']);
    Route::post('banners/{banner}', [BannerController::class, 'update']);
    Route::delete('banners/{banner}', [BannerController::class, 'destroy']);

    Route::get('enquiries', [EnquiryController::class, 'index']);
    Route::patch('enquiries/{enquiry}', [EnquiryController::class, 'updateStatus']);
    Route::delete('enquiries/{enquiry}', [EnquiryController::class, 'destroy']);

    Route::get('settings', [SettingController::class, 'all']);
    Route::post('settings', [SettingController::class, 'update']);
});

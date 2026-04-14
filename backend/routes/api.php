<?php

use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\ShopController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/blogs', [BlogController::class, 'index']);
Route::get('/blogs/categories', [BlogController::class, 'categories']);
Route::get('/blogs/{slug}', [BlogController::class, 'show']);

// Shop API
Route::get('/shop/products', [ShopController::class, 'products']);
Route::get('/shop/products/{slug}', [ShopController::class, 'product']);
Route::get('/shop/categories', [ShopController::class, 'categories']);
Route::post('/shop/checkout', [ShopController::class, 'checkout']);

// Gallery API
Route::get('/gallery', [GalleryController::class, 'index']);
Route::get('/gallery/home', [GalleryController::class, 'home']);
Route::get('/gallery/categories', [GalleryController::class, 'categories']);

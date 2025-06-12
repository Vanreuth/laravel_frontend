<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\AboutUsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/sliders', [SliderController::class, 'index']);
Route::get('/sliders/{slider}', [SliderController::class, 'show']);
Route::get('/contact', [ContactController::class, 'index']);
Route::get('/about-us', [AboutUsController::class, 'index']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/users', [UserController::class ,'store']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
    Route::get('/categories/{id}', [CategoryController::class, 'show']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/sliders', [SliderController::class, 'store']);
    Route::put('/sliders/{slider}', [SliderController::class, 'update']);
    Route::delete('/sliders/{slider}', [SliderController::class, 'destroy']);
    Route::post('/contact', [ContactController::class, 'store']);
    Route::post('/contact', [ContactController::class, 'update']);
    Route::get('/about-us/{aboutUs}', [AboutUsController::class, 'show']);
    Route::post('/about-us', [AboutUsController::class, 'store']);
    Route::put('/about-us/{aboutUs}', [AboutUsController::class, 'update']);
    Route::delete('/about-us/{aboutUs}', [AboutUsController::class, 'destroy']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/users', [UserController::class, 'index']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
});
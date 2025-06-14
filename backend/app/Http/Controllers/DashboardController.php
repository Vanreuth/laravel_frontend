<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function getStats()
    {
        try {
            // Get total counts
            $totalProducts = Product::count();
            $totalOrders = Order::count();
            $totalUsers = User::count();
            $totalRevenue = Order::where('status', 'paid')->sum('total_amount');

            // Get recent orders with user information
            $recentOrders = Order::with('user')
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get()
                ->map(function ($order) {
                    return [
                        'id' => $order->id,
                        'customer_name' => $order->user->name,
                        'status' => $order->payment_status,
                        'total' => $order->total_price,
                        'created_at' => $order->created_at
                    ];
                });

            // Get top products based on stock quantity
            $topProducts = Product::orderBy('stock_quantity', 'desc')
                ->take(5)
                ->get()
                ->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'price' => $product->price,
                        'image' => $product->image,
                        'stock' => $product->quantity
                    ];
                });

            return response()->json([
                'totalProducts' => $totalProducts,
                'totalOrders' => $totalOrders,
                'totalUsers' => $totalUsers,
                'totalRevenue' => $totalRevenue,
                'recentOrders' => $recentOrders,
                'topProducts' => $topProducts
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch dashboard statistics: ' . $e->getMessage()
            ], 500);
        }
    }
} 
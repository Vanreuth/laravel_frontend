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
            $totalRevenue = Order::where('status', 'completed')->sum('total_amount');

            // Get recent orders with user information
            $recentOrders = Order::with('user')
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get()
                ->map(function ($order) {
                    return [
                        'id' => $order->id,
                        'customer_name' => $order->user->name,
                        'status' => $order->status,
                        'total' => $order->total_amount,
                        'created_at' => $order->created_at
                    ];
                });

            // Get top products
            $topProducts = Product::withCount(['orderItems as total_sold' => function ($query) {
                    $query->select(DB::raw('SUM(quantity)'));
                }])
                ->orderBy('total_sold', 'desc')
                ->take(5)
                ->get()
                ->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->name,
                        'price' => $product->price,
                        'image' => $product->image,
                        'stock' => $product->stock
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
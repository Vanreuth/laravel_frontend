<?php
// app/Http/Controllers/OrderController.php
namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        try {
            // Fetch all orders with related user and order items (including products)
            $orders = Order::with(['user', 'orderItems.product'])->get();

            // Return the orders as a JSON response
            return response()->json($orders, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch orders: ' . $e->getMessage()], 500);
        }
    }
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        try {
            DB::beginTransaction();

            $totalPrice = 0;
            $items = $request->items;

            // Calculate total price and validate stock
            foreach ($items as $item) {
                $product = Product::findOrFail($item['product_id']);
                if ($product->quantity < $item['quantity']) {
                    return response()->json(['error' => "Insufficient stock for product: {$product->name}"], 400);
                }
                $totalPrice += $product->price * $item['quantity'];
            }

            // Create order
            $order = Order::create([
                'user_id' => $request->user_id,
                'total_price' => $totalPrice,
                'payment_status' => 'pending',
            ]);

            // Create order items and update product stock
            foreach ($items as $item) {
                $product = Product::findOrFail($item['product_id']);
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                ]);
                $product->decrement('quantity', $item['quantity']);
            }

            DB::commit();

            return response()->json(['message' => 'Order created successfully', 'order' => $order], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to create order: ' . $e->getMessage()], 500);
        }
    }
    public function show($id)
    {
        // Find the order by ID and load related data (user and order items)
        $order = Order::with(['user', 'orderItems.product'])->findOrFail($id);

        // Return the order details as a JSON response
        return response()->json($order, 200);
    }
}

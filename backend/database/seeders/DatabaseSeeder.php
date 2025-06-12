<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Create User
        $user = User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        // Create Category
        $running = Category::create(['name' => 'Running Shoes', 'status' => 'available']);

        // Create Brand
        $nike = Brand::create(['name' => 'Nike', 'logo' => 'logos/nike.png', 'status' => 'available']);

        // Create Product
        $product = Product::create([
            'category_id' => $running->id,
            'brand_id' => $nike->id,
            'name' => 'Nike Air Maxs',
            'description' => 'High-quality running shoes',
            'price' => 125.00,
            'quantity' => 10,
            'image' => 'upload/3ArgLToVoOjyqnbkQLb1JeGNTkpW47byv5X3kNLj.png',
        ]);

        // Create Order
        $order = Order::create([
            'user_id' => $user->id,
            'total_price' => 250.00,
            'payment_status' => 'pending',
        ]);

        // Create Order Item
        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $product->id,
            'quantity' => 2,
            'price' => 125.00,
        ]);
    }
}
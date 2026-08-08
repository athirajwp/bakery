<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $cat = fn (string $name) => Category::where('name', $name)->first()?->id;

        $products = [
            ['Chocolate Cakes', 'Chocolate Cake', 450, '500 g', 4.8, 156, true, 'Bestseller', 'Rich Belgian-style chocolate sponge layered with silky ganache.'],
            ['Red Velvet Cakes', 'Red Velvet Cake', 550, '500 g', 4.7, 121, true, 'Trending', 'Soft red velvet layers with classic cream cheese frosting.'],
            ['Chocolate Cakes', 'Black Forest Cake', 480, '500 g', 4.6, 98, false, null, 'Chocolate sponge, fresh cream and cherries – a timeless classic.'],
            ['Traditional Sweets', 'Milk Sweet', 320, '1 kg', 4.7, 87, false, 'Traditional', 'Creamy, slow-cooked milk sweet made the traditional way.'],
            ['Traditional Sweets', 'Mysore Pak', 360, '1 kg', 4.8, 134, true, 'Bestseller', 'Melt-in-mouth ghee mysore pak, golden and perfectly grainy.'],
            ['Traditional Sweets', 'Laddu', 280, '1 kg', 4.9, 172, true, 'Festive', 'Soft, aromatic boondi laddu made fresh every morning.'],
            ['Traditional Sweets', 'Jangiri', 300, '1 kg', 4.6, 79, false, null, 'Crisp on the outside, juicy inside – pure urad jangiri.'],
            ['Bakery Snacks', 'Mixture', 240, '500 g', 4.5, 63, false, null, 'Crunchy, spicy snack mix perfect for tea time.'],
            ['Bakery Snacks', 'Murukku', 220, '500 g', 4.5, 58, false, null, 'Hand-pressed, crispy rice & urad murukku.'],
            ['Cookies', 'Butter Cookies', 260, '500 g', 4.7, 92, true, 'Bestseller', 'Melting butter cookies baked to golden perfection.'],
            ['Traditional Sweets', 'Badam Halwa', 480, '500 g', 4.8, 74, false, null, 'Rich almond halwa slow-cooked in pure ghee.'],
            ['Birthday Cakes', 'Fruit Cake', 420, '500 g', 4.6, 66, false, null, 'Light sponge loaded with candied fruits and nuts.'],
        ];

        foreach ($products as $p) {
            [$category, $name, $price, $weight, $rating, $reviews, $bestSeller, $tag, $desc] = $p;

            Product::updateOrCreate(
                ['name' => $name],
                [
                    'category_id' => $cat($category),
                    'description' => $desc,
                    'price' => $price,
                    'old_price' => null,
                    'weight' => $weight,
                    'rating' => $rating,
                    'reviews_count' => $reviews,
                    'tags' => $tag ? [$tag] : null,
                    'is_best_seller' => $bestSeller,
                    'is_active' => true,
                ]
            );
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Birthday Cakes', 'description' => 'Theme & photo cakes for every age'],
            ['name' => 'Wedding Cakes', 'description' => 'Elegant multi-tier creations'],
            ['name' => 'Chocolate Cakes', 'description' => 'Rich, moist & indulgent'],
            ['name' => 'Red Velvet Cakes', 'description' => 'Velvety soft with cream cheese'],
            ['name' => 'Traditional Sweets', 'description' => 'Mysore pak, laddu, jangiri & more'],
            ['name' => 'Bakery Snacks', 'description' => 'Fresh bread, buns & savouries'],
            ['name' => 'Cookies', 'description' => 'Butter, choco-chip & more'],
            ['name' => 'Gift Boxes', 'description' => 'Sweet hampers for every occasion'],
        ];

        foreach ($categories as $c) {
            Category::updateOrCreate(['name' => $c['name']], $c);
        }
    }
}

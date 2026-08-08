<?php

namespace Database\Seeders;

use App\Models\GalleryImage;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    public function run(): void
    {
        $images = [
            ['Birthday Theme Cake', 'Cakes'],
            ['Chocolate Fudge Cake', 'Cakes'],
            ['Traditional Sweets Platter', 'Sweets'],
            ['Fresh Cupcakes', 'Bakery'],
            ['Artisan Bread', 'Bakery'],
            ['Mysore Pak Jar', 'Sweets'],
            ['Our Bakery Counter', 'Interior'],
            ['Baking in Progress', 'Kitchen'],
            ['Red Velvet Slice', 'Cakes'],
            ['Gift Hamper Boxes', 'Sweets'],
            ['Inside the Kitchen', 'Kitchen'],
            ['Our Sweet Counter', 'Interior'],
        ];

        foreach ($images as $i => $item) {
            GalleryImage::updateOrCreate(
                ['title' => $item[0]],
                [
                    'category' => $item[1],
                    'image' => '',
                    'sort_order' => $i,
                    'is_active' => true,
                ]
            );
        }
    }
}

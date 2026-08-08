<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            'general' => [
                'site_name' => 'Kavitha Sweets & Bakery',
                'site_tamil_name' => 'கவிதா இனிப்புகள் மற்றும் அடுமனை',
                'tagline' => 'Serving Happiness Since Years',
                'phone' => '+91 99651 55006',
                'whatsapp' => '919965155006',
                'email' => 'kavithasweetsbakery@gmail.com',
                'address' => '45, 46 Hospital Road, Lakshmangudi, Koothanallur, Tamil Nadu – 614102',
                'working_hours' => 'Monday – Sunday · 9:00 AM – 10:00 PM',
                'rating' => '4.1',
                'review_count' => '394',
                'map_embed' => '',
                'social_instagram' => 'https://www.instagram.com',
                'social_facebook' => 'https://www.facebook.com',
            ],
            'seo' => [
                'meta_title' => 'Kavitha Sweets & Bakery | Fresh Cakes & Traditional Sweets in Lakshmangudi',
                'meta_description' => 'Fresh cakes, birthday cakes, wedding cakes and traditional Tamil sweets in Lakshmangudi, Koothanallur. Order on WhatsApp +91 99651 55006.',
                'meta_keywords' => 'bakery, cake shop, traditional sweets, mysore pak, laddu, birthday cake, Lakshmangudi',
                'og_image' => '',
            ],
        ];

        foreach ($settings as $group => $items) {
            foreach ($items as $key => $value) {
                Setting::set($key, $value, $group);
            }
        }
    }
}

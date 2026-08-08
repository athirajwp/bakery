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
                'phone' => '+91 89037 49300',
                'whatsapp' => '918903749300',
                'email' => 'kavithasweetsbakery@gmail.com',
                'address' => '9 Park Road, Kuthalam, Mayiladuthurai, Tamil Nadu',
                'working_hours' => 'Monday – Sunday · 9:00 AM – 10:00 PM',
                'rating' => '4.1',
                'review_count' => '394',
                'map_embed' => '',
                'social_instagram' => 'https://www.instagram.com',
                'social_facebook' => 'https://www.facebook.com',
            ],
            'seo' => [
                'meta_title' => 'Kavitha Sweets & Bakery | Fresh Cakes & Traditional Sweets in Kuthalam',
                'meta_description' => 'Fresh cakes, birthday cakes, wedding cakes and traditional Tamil sweets in Kuthalam, Mayiladuthurai. Order on WhatsApp +91 89037 49300.',
                'meta_keywords' => 'bakery, cake shop, traditional sweets, mysore pak, laddu, birthday cake, Kuthalam',
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

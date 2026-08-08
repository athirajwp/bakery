<?php

namespace Database\Seeders;

use App\Models\Review;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $reviews = [
            ['Priya Ramesh', 'Kuthalam', 5, 'Ordered a chocolate cake for my son’s birthday. It was so fresh and the chocolate was rich. Everyone at the party loved it!'],
            ['Karthik Subramanian', 'Mayiladuthurai', 5, 'Their Mysore pak is the best in town — melts in your mouth. We now order from Kavitha Sweets for every festival.'],
            ['Sundari Devi', 'Mayiladuthurai', 4, 'Beautiful wedding cake and delivered on time. The design was exactly what we asked for. Very happy with the service.'],
            ['Arun Prakash', 'Kuthalam', 5, 'Fresh murukku and mixture, perfect crunch. Great taste and very hygienic. Reasonable prices too.'],
            ['Meena Lakshmi', 'Mayiladuthurai', 4, 'Ordered laddu for Deepavali. Soft, fresh and perfectly sweet. Delivery to our door was quick and safe.'],
            ['Raghavan V.', 'Needamangalam', 5, 'Custom photo cake for my daughter’s birthday turned out amazing. The team is very cooperative and friendly.'],
            ['Latha Mani', 'Mayiladuthurai', 5, 'Butter cookies and fruit cake are simply delicious. My whole family orders from here regularly.'],
            ['Suresh Kumar', 'Kuthalam', 4, 'Good quality sweets and snacks. Janjira is fresh and juicy. Ordering on WhatsApp is very convenient.'],
        ];

        foreach ($reviews as $r) {
            Review::create([
                'customer_name' => $r[0],
                'place' => $r[1],
                'rating' => $r[2],
                'comment' => $r[3],
                'is_approved' => true,
            ]);
        }
    }
}

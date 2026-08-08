<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@kavithasweets.in'],
            [
                'name' => 'Kavitha Sweets Admin',
                'phone' => '918903749300',
                'password' => Hash::make('kavitha@2024'),
                'role' => 'admin',
                'is_active' => true,
            ]
        );

        User::updateOrCreate(
            ['email' => 'customer@example.com'],
            [
                'name' => 'Demo Customer',
                'phone' => '9876543210',
                'password' => Hash::make('password'),
                'role' => 'customer',
                'is_active' => true,
            ]
        );
    }
}

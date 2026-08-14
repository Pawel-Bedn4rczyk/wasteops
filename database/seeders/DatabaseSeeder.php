<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'admin@wasteops.test'],
            ['name' => 'Admin', 'password' => 'password'],
        );

        User::query()->updateOrCreate(
            ['email' => 'technik@wasteops.test'],
            ['name' => 'Technik', 'password' => 'password'],
        );

        User::query()->updateOrCreate(
            ['email' => 'operator@wasteops.test'],
            ['name' => 'Operator', 'password' => 'password'],
        );
    }
}

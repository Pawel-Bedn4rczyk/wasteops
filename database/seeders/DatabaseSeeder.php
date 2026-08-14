<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(RolesAndPermissionsSeeder::class);

        $admin = User::query()->updateOrCreate(
            ['email' => 'admin@wasteops.test'],
            ['name' => 'Admin', 'password' => 'password'],
        );
        $admin->syncRoles(['admin']);

        $technician = User::query()->updateOrCreate(
            ['email' => 'technik@wasteops.test'],
            ['name' => 'Technik', 'password' => 'password'],
        );
        $technician->syncRoles(['technician']);

        $operator = User::query()->updateOrCreate(
            ['email' => 'operator@wasteops.test'],
            ['name' => 'Operator', 'password' => 'password'],
        );
        $operator->syncRoles(['operator']);
    }
}

<?php

namespace Database\Seeders;

use App\Models\Equipment;
use App\Models\Incident;
use Illuminate\Database\Seeder;

class IncidentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $equipment = Equipment::query()->get();
        if ($equipment->isEmpty()) {
            $equipment = Equipment::factory()->count(5)->create();
        }
        Incident::factory()
            ->count(12)
            ->recycle($equipment)
            ->create();
    }
}

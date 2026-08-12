<?php

use App\Models\Equipment;
use App\Models\Incident;
use Inertia\Testing\AssertableInertia as Assert;

test('dashboard shows summary stats', function () {
    $equipment = Equipment::factory()->count(3)->create();

    Incident::factory()->create([
        'equipment_id' => $equipment[0]->id,
        'status' => 'open',
    ]);

    Incident::factory()->create([
        'equipment_id' => $equipment[1]->id,
        'status' => 'in_progress',
    ]);

    Incident::factory()->create([
        'equipment_id' => $equipment[1]->id,
        'status' => 'in_progress',
    ]);

    Incident::factory()->count(2)->create([
        'equipment_id' => $equipment[2]->id,
        'status' => 'resolved',
    ]);

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->where('stats.equipment_total', 3)
            ->where('stats.equipment_in_repair', 1)
            ->where('stats.incidents_open', 1)
            ->where('stats.incidents_resolved', 2)
        );
});

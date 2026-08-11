<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class EquipmentController extends Controller
{
    public function index(): InertiaResponse
    {
        $equipment = Equipment::query()->get();

        return Inertia::render('equipment/index', [
            'equipment' => $equipment,
        ]);
    }
}

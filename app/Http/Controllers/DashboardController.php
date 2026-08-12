<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Incident;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class DashboardController extends Controller
{
    public function index(): InertiaResponse
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'equipment_total' => Equipment::query()->count(),
                'equipment_in_repair' => Incident::query()
                    ->where('status', 'in_progress')
                    ->distinct()
                    ->count('equipment_id'),
                'incidents_open' => Incident::query()->where('status', 'open')->count(),
                'incidents_resolved' => Incident::query()->where('status', 'resolved')->count(),
            ],
        ]);
    }
}

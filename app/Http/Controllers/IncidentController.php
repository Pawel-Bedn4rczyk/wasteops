<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class IncidentController extends Controller
{
    public function index(): InertiaResponse{

        $incidents = Incident::query()
            ->with('equipment')
            ->latest()
            ->get();

        return Inertia::render('incidents/index', [
            'incidents' => $incidents,
            'statuses' => Incident::STATUSES
        ]);
    }
}

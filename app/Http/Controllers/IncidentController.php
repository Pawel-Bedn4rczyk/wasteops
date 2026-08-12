<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use App\Http\Requests\StoreIncidentRequest;
use App\Models\Equipment;
use App\Http\Requests\UpdateIncidentRequest;

class IncidentController extends Controller
{
    public function index(): InertiaResponse
    {

        $incidents = Incident::query()
            ->with('equipment')
            ->orderBy('status')
            ->get();

        return Inertia::render('incidents/index', [
            'incidents' => $incidents,
            'statuses' => Incident::STATUSES
        ]);
    }

    public function create(): InertiaResponse
    {
        return Inertia::render('incidents/create', [
            'equipment' => Equipment::query()
                ->orderBy('name')
                ->get(['id', 'name', 'serial_number', 'type']),
        ]);
    }

    public function store(StoreIncidentRequest $request): RedirectResponse
    {
        Incident::create([...$request->validated(), 'status' => 'open']);

        return redirect()->route('incidents.index');
    }

    public function update(UpdateIncidentRequest $request, Incident $incident): RedirectResponse
    {
        $incident->update($request->validated());

        return redirect()->route('incidents.index');
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipmentRequest;
use App\Models\Equipment;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use App\Http\Requests\UpdateEquipmentRequest;
use App\Models\Incident;

class EquipmentController extends Controller
{
    public function index(): InertiaResponse
    {
        $this->authorize('viewAny', Equipment::class);

        $equipment = Equipment::query()->get();

        return Inertia::render('equipment/index', [
            'equipment' => $equipment,
        ]);
    }

    public function create(): InertiaResponse
    {
        $this->authorize('create', Equipment::class);

        return Inertia::render('equipment/create', [
            'types' => Equipment::TYPES,
        ]);
    }

    public function store(StoreEquipmentRequest $request): RedirectResponse
    {
        Equipment::create($request->validated());

        return redirect()->route('equipment.index');
    }

    public function show(Equipment $equipment): InertiaResponse
    {
        $this->authorize('view', $equipment);
        $openIncidents = $equipment->incidents()
            ->whereIn('status', ['open', 'in_progress'])
            ->orderBy('status', 'desc')
            ->get(['id', 'title', 'status', 'created_at']);
        $resolvedIncidents = $equipment->incidents()
            ->where('status', 'resolved')
            ->latest()
            ->get(['id', 'title', 'status', 'created_at']);
        return Inertia::render('equipment/show', [
            'equipment' => $equipment,
            'openIncidents' => $openIncidents,
            'resolvedIncidents' => $resolvedIncidents,
            'statuses' => Incident::STATUSES,
        ]);
    }

    public function edit(Equipment $equipment): InertiaResponse
    {
        $this->authorize('update', $equipment);
        return Inertia::render('equipment/edit', [
            'equipment' => $equipment,
            'types' => Equipment::TYPES,
            'incidentsCount' => $equipment->incidents()->count(),
        ]);
    }

    public function update(UpdateEquipmentRequest $request, Equipment $equipment): RedirectResponse
    {
        $equipment->update($request->validated());
        return redirect()->route('equipment.show', $equipment);
    }

    public function destroy(Equipment $equipment): RedirectResponse
    {
        $this->authorize('delete', $equipment);
        $equipment->delete();
        return redirect()->route('equipment.index');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use App\Http\Requests\StoreIncidentRequest;
use App\Models\Equipment;
use App\Http\Requests\UpdateIncidentRequest;
use App\Models\IncidentActivity;
use App\Http\Requests\UpdateIncidentDetailsRequest;

class IncidentController extends Controller
{
    public function index(): InertiaResponse
    {

        $this->authorize('viewAny', Incident::class);

        $incidents = Incident::query()
            ->with('equipment')
            ->orderBy('status')
            ->get();

        return Inertia::render('incidents/index', [
            'incidents' => $incidents,
            'statuses' => Incident::STATUSES
        ]);
    }

    public function show(Incident $incident): InertiaResponse
    {
        $this->authorize('view', $incident);

        $incident->load([
            'equipment',
            'comments' => fn($query) => $query->latest(),
            'activities' => fn($query) => $query->latest(),
        ]);

        return Inertia::render('incidents/show', [
            'incident' => $incident,
            'statuses' => Incident::STATUSES
        ]);
    }

    public function create(): InertiaResponse
    {
        $this->authorize('create', Incident::class);
        return Inertia::render('incidents/create', [
            'equipment' => Equipment::query()
                ->orderBy('name')
                ->get(['id', 'name', 'serial_number', 'type']),
        ]);
    }

    public function store(StoreIncidentRequest $request): RedirectResponse
    {
        $incident = Incident::create([...$request->validated(), 'status' => 'open']);

        $incident->activities()->create([
            'type' => 'created',
            'title' => IncidentActivity::TYPES['created'],
            'status_label' => Incident::STATUSES[$incident->status] ?? $incident->status,
        ]);

        return redirect()->route('incidents.index');
    }

    public function update(UpdateIncidentRequest $request, Incident $incident): RedirectResponse
    {
        $oldStatus = $incident->status;
        $incident->update($request->validated());

        if ($oldStatus !== $incident->status) {
            $oldLabel = Incident::STATUSES[$oldStatus] ?? $oldStatus;
            $newLabel = Incident::STATUSES[$incident->status] ?? $incident->status;
            $incident->activities()->create([
                'type' => 'status_changed',
                'title' => IncidentActivity::TYPES['status_changed'],
                'subtitle' => "{$oldLabel} → {$newLabel}",
                'status_label' => $newLabel,
            ]);
        }

        return redirect()->route('incidents.show', $incident);
    }

    public function edit(Incident $incident): InertiaResponse
    {
        $this->authorize('update', $incident);

        return Inertia::render('incidents/edit', [
            'incident' => $incident->load('equipment'),
            'equipment' => Equipment::query()
                ->orderBy('name')
                ->get(['id', 'name', 'serial_number', 'type']),
        ]);
    }

    public function updateDetails(UpdateIncidentDetailsRequest $request, Incident $incident): RedirectResponse
    {
        $incident->update($request->validated());

        return redirect()->route('incidents.show', $incident);
    }

    public function destroy(Incident $incident): RedirectResponse
    {
        $this->authorize('delete', $incident);

        $incident->delete();

        return redirect()->route('incidents.index');
    }
}

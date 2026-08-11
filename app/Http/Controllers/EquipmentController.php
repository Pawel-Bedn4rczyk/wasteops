<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEquipmentRequest;
use App\Models\Equipment;
use Illuminate\Http\RedirectResponse;
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

    public function create(): InertiaResponse
    {
        return Inertia::render('equipment/create', [
            'types' => Equipment::TYPES,
        ]);
    }

    public function store(StoreEquipmentRequest $request): RedirectResponse
    {
        Equipment::create($request->validated());

        return redirect()->route('equipment.index');
    }
}

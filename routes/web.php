<?php

use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\IncidentController;
use Illuminate\Support\Facades\Route;

//  Equipment routes
Route::redirect('/', '/equipment')->name('home');

Route::get('/equipment', [EquipmentController::class, 'index'])
    ->name('equipment.index');

Route::get('/equipment/create', [EquipmentController::class, 'create'])
    ->name('equipment.create');

Route::post('/equipment', [EquipmentController::class, 'store'])
    ->name('equipment.store');

//  Incident routes
Route::get('/incidents', [IncidentController::class, 'index'])
    ->name('incidents.index');

Route::get('/incidents/create', [IncidentController::class, 'create'])
    ->name('incidents.create');

Route::post('/incidents', [IncidentController::class, 'store'])
    ->name('incidents.store');

Route::patch('/incidents/{incident}', [IncidentController::class, 'update'])
    ->name('incidents.update');

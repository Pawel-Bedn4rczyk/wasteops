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



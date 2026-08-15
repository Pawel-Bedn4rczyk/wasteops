<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\IncidentController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('home');

    // Equipment
    Route::get('/equipment', [EquipmentController::class, 'index'])
        ->name('equipment.index');

    Route::get('/equipment/create', [EquipmentController::class, 'create'])
        ->name('equipment.create');

    Route::post('/equipment', [EquipmentController::class, 'store'])
        ->name('equipment.store');

    Route::get('/equipment/{equipment}', [EquipmentController::class, 'show'])
        ->name('equipment.show');

    Route::get('/equipment/{equipment}/edit', [EquipmentController::class, 'edit'])
        ->name('equipment.edit');

    Route::patch('/equipment/{equipment}', [EquipmentController::class, 'update'])
        ->name('equipment.update');

    Route::delete('/equipment/{equipment}', [EquipmentController::class, 'destroy'])
        ->name('equipment.destroy');

    // Incidents
    Route::get('/incidents', [IncidentController::class, 'index'])
        ->name('incidents.index');

    Route::get('/incidents/create', [IncidentController::class, 'create'])
        ->name('incidents.create');

    Route::post('/incidents', [IncidentController::class, 'store'])
        ->name('incidents.store');

    Route::get('/incidents/{incident}', [IncidentController::class, 'show'])
        ->name('incidents.show');

    Route::patch('/incidents/{incident}', [IncidentController::class, 'update'])
        ->name('incidents.update');

    Route::post('/incidents/{incident}/comments', [CommentController::class, 'store'])
        ->name('incidents.comments.store');

    Route::get('/incidents/{incident}/edit', [IncidentController::class, 'edit'])
        ->name('incidents.edit');

    Route::put('/incidents/{incident}', [IncidentController::class, 'updateDetails'])
        ->name('incidents.update-details');

    Route::delete('/incidents/{incident}', [IncidentController::class, 'destroy'])
        ->name('incidents.destroy');
});

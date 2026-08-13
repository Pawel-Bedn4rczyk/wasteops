<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\IncidentController;
use App\Http\Controllers\CommentController;
use Illuminate\Support\Facades\Route;

Route::get('/', [DashboardController::class, 'index'])->name('home');

//  Equipment routes
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

Route::get('/incidents/{incident}', [IncidentController::class, 'show'])
    ->name('incidents.show');

Route::patch('/incidents/{incident}', [IncidentController::class, 'update'])
    ->name('incidents.update');

Route::post('/incidents/{incident}/comments', [CommentController::class, 'store'])
    ->name('incidents.comments.store');

<?php

use App\Http\Controllers\EquipmentController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/equipment')->name('home');

Route::get('/equipment', [EquipmentController::class, 'index'])
    ->name('equipment.index');

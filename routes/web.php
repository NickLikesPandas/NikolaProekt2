<?php

use App\Http\Controllers\ImageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/imageadd', function () {
        return Inertia::render('ImageAddPage');
    })->name('imageadd');

    //пътища за контролера
    Route::post('/api/images', [ImageController::class, 'store'])->name('images.store');
    Route::get('/api/images', [ImageController::class, 'index'])->name('images.index');
    Route::delete('/api/images/{id}', [ImageController::class, 'destroy']);
    Route::post('/api/images/{id}', [ImageController::class, 'update']);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
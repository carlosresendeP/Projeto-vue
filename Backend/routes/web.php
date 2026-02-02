<?php

use Illuminate\Support\Facades\Route;

// Rota web básica (opcional)
Route::get('/', function () {
    return ['Laravel' => app()->version()];
});
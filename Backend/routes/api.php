<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\DemandController;

Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'service' => 'backend-api',
        'timestamp' => now(),
    ]);
});

//rotas de clientes
Route::apiResource('clients', ClientController::class);
//rotas de demandas
Route::apiResource('demands', DemandController::class);

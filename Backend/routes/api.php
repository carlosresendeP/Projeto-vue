<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\DemandController;
use App\Http\Controllers\Api\ReportController;

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
// Rota específica para mudar status (usada pelo Kanban)
Route::patch('demands/{demand}/status', [DemandController::class, 'updateStatus']);

Route::get('reports/clients/{client}', [ReportController::class, 'clientMonthly']);
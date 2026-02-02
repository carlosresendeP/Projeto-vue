<?php

namespace App\Http\Controllers\Api;

use Illuminate\Routing\Controller;
use App\Models\Client;
use App\Models\Demand;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function clientMonthly(Request $request, $clientId)
    {
        $month = $request->query('month'); // formato: YYYY-MM
        
        if (!$month) {
            return response()->json(['error' => 'Month parameter is required'], 400);
        }
        
        // Buscar cliente
        $client = Client::findOrFail($clientId);
        
        // Buscar demandas do mês
        $demands = Demand::where('client_id', $clientId)
            ->whereYear('data_cadastro', substr($month, 0, 4))
            ->whereMonth('data_cadastro', substr($month, 5, 2))
            ->get();
        
        return response()->json([
            'client' => $client,
            'month' => $month,
            'total_demands' => $demands->count(),
            'demands' => $demands,
            'tempo_total_estimado' => $demands->sum('tempo_estimado'),
            'tempo_total_gasto' => $demands->sum('tempo_gasto')
        ]);
    }
}
<?php

namespace App\Http\Controllers\Api;


use App\Http\Requests\StoreDemandRequest;
use App\Http\Requests\UpdateDemandRequest;
use App\Models\Demand;
use Illuminate\Routing\Controller;

class DemandController extends Controller
{
    //listar todas as demandas
    public function index()
    {
        return Demand::with('client')
            ->orderByDesc('data_cadastro')
            ->get();
    }

    //criar uma demanda
    public function store(StoreDemandRequest $request)
    {
        $demand = Demand::create($request->validated());

        return response()->json($demand, 201);
    }

    //mostrar uma demanda
    public function show(Demand $demand)
    {
        return $demand->load('client');
    }

    //atualizar uma demanda
    public function update(UpdateDemandRequest $request, Demand $demand)
    {
        $demand->update($request->validated());

        return $demand->load('client');
    }

    //deletar uma demanda
    public function destroy(Demand $demand)
    {
        $demand->delete();

        return response()->noContent();
    }
}

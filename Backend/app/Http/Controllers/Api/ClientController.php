<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\Client;
use Illuminate\Routing\Controller;

class ClientController extends Controller
{
    //listar todos os clientes
    public function index()
    {
        return Client::orderBy('nome')->get();
    }

    //criar um cliente
    public function store(StoreClientRequest $request)
    {
        $client = Client::create($request->validated());

        return response()->json($client, 201);
    }

    //mostrar um cliente
    public function show(Client $client)
    {
        return $client;
    }

    //atualizar um cliente
    public function update(UpdateClientRequest $request, Client $client)
    {
        $client->update($request->validated());

        return $client;
    }

    //deletar um cliente
    public function destroy(Client $client)
    {
        $client->delete();

        return response()->noContent();
    }
}

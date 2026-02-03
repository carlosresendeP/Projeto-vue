<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demand extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'titulo',
        'prioridade',
        'setor',
        'responsavel',
        'quem_deve_testar',
        'descricao_detalhada',
        'anexos_midias',
        'cobrada_do_cliente',
        'tempo_estimado',
        'tempo_gasto',
        'status',
        'flag_retornou',
        'feedback',
    ];

    protected $casts = [
        'cobrada_do_cliente' => 'boolean',
        'flag_retornou' => 'boolean',
        'data_cadastro' => 'datetime',
    ];

    // Relacionamento
    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDemandRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'client_id' => 'sometimes|exists:clients,id',

            'titulo' => 'sometimes|required|string|max:255',

            'prioridade' => 'sometimes|required|string|max:50',
            'setor' => 'sometimes|required|string|max:100',

            'responsavel' => 'sometimes|required|string|max:255',
            'quem_deve_testar' => 'sometimes|required|string|max:255',

            'descricao_detalhada' => 'sometimes|required|string',

            'anexos_midias' => 'nullable|string',

            'cobrada_do_cliente' => 'sometimes|boolean',

            'tempo_estimado' => 'sometimes|nullable|integer|min:0',
            'tempo_gasto' => 'sometimes|nullable|integer|min:0',

            'status' => [
                'sometimes',
                Rule::in([
                    'backlog',
                    'autorizacao',
                    'fila',
                    'em_desenvolvimento',
                    'teste',
                    'deploy',
                    'concluido',
                ]),
            ],

            'flag_retornou' => 'sometimes|boolean',

            'feedback' => 'sometimes|nullable|string',
        ];
    }
}

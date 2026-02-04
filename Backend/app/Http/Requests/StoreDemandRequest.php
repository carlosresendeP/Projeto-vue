<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreDemandRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
             'client_id' => 'required|exists:clients,id',

            'titulo' => 'required|string|max:255',

            'prioridade' => 'required|string|max:50',
            'setor' => 'required|string|max:100',

            'responsavel' => 'required|string|max:255',
            'quem_deve_testar' => 'required|string|max:255',

            'descricao_detalhada' => 'required|string',

            'anexos_midias' => 'nullable|string',

            'cobrada_do_cliente' => 'boolean',

            'tempo_estimado' => 'sometimes|nullable|integer|min:0',
            'tempo_gasto' => 'sometimes|nullable|integer|min:0',

            'status' => [
                'required',
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

            'flag_retornou' => 'boolean',

            'feedback' => 'nullable|string',
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClientRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nome' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'avisar_por_email' => 'boolean',
            'whatsapp' => 'nullable|string|max:20',
            'avisar_por_whatsapp' => 'boolean',
            'observacao' => 'nullable|string',
        ];
    }
}

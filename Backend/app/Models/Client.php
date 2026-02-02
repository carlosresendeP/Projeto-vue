<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'email',
        'avisar_por_email',
        'whatsapp',
        'avisar_por_whatsapp',
        'observacao',
    ];

    protected $casts = [
        'avisar_por_email' => 'boolean',
        'avisar_por_whatsapp' => 'boolean',
    ];

    // Relacionamento
    public function demands()
    {
        return $this->hasMany(Demand::class);
    }
}

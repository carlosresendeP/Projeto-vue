<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('demands', function (Blueprint $table) {
            $table->id();

            // data_cadastro automática
            $table->timestamp('data_cadastro')->useCurrent();

            // relacionamento com cliente/
            $table->foreignId('client_id') //id do cliente
                ->constrained('clients') //tabela de clientes
                ->cascadeOnDelete(); //se o cliente for deletado, a demanda será deletada

            $table->string('titulo');

            $table->string('prioridade');
            $table->string('setor');

            $table->string('responsavel');
            $table->string('quem_deve_testar');

            $table->text('descricao_detalhada');

            // links de anexos (MVP não faz upload real)
            $table->text('anexos_midias')->nullable();

            $table->boolean('cobrada_do_cliente')->default(false);

            // tempos (defina depois se é horas ou minutos)
            $table->integer('tempo_estimado')->nullable();
            $table->integer('tempo_gasto')->nullable();

            // status do Kanban (string controlada)
            $table->string('status');

            $table->boolean('flag_retornou')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('demands');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePedidosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cliente_id');
            $table->foreign('cliente_id')->references('id')->on('clientes')->onDelete('cascade');
            $table->unsignedBigInteger('entregador_id');
            $table->foreign('entregador_id')->references('id')->on('entregadores')->onDelete('cascade')->nullable();
            $table->unsignedBigInteger('endereco_id');
            $table->foreign('endereco_id')->references('id')->on('enderecos')->onDelete('cascade')->nullable();
            $table->datetime('date_hour');
            $table->decimal('total', $precision = 8, $scale = 2);
            //$table->decimal('pay', $precision = 8, $scale = 2);
            $table->string('payment_method');
            $table->string('status')->default('À caminho');
            $table->string('platform_payment');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pedidos');
    }
}

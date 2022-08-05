<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ItensPedido;

class ItensPedidoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ItensPedido::create([
            "pedido_id" => 1,
            "produto_id" => 2,
            "weight_product" => "5kg",
            "value" => 129.99,
            "qtde" => 1
        ]);

        ItensPedido::create([
            "pedido_id" => 2,
            "produto_id" => 3,
            "weight_product" => "5kg",
            "value" => 129.99,
            "qtde" => 1
        ]);

        ItensPedido::create([
            "pedido_id" => 3,
            "produto_id" => 2,
            "weight_product" => "13kg",
            "value" => 129.99,
            "qtde" => 1
        ]);

        ItensPedido::create([
            "pedido_id" => 4,
            "produto_id" => 2,
            "weight_product" => "13kg",
            "value" => 129.99,
            "qtde" => 1
        ]);

        ItensPedido::create([
            "pedido_id" => 5,
            "produto_id" => 2,
            "weight_product" => "13kg",
            "value" => 129.99,
            "qtde" => 1
        ]);
    }
}

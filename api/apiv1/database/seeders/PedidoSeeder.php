<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pedido;

class PedidoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Pedido::create([
            "cliente_id" => 6,
            "entregador_id"  => 3,
            "endereco_id"  => 5,
            "date_hour" => "2021-12-26 14:00:00",
            "total" => 129.99,
            "payment_method" => "débito",
            "platform_payment" => "entrega",
            "status" => "Entregue"
        ]);

        Pedido::create([
            "cliente_id" => 8,
            "entregador_id"  => 5,
            "endereco_id"  => 7,
            "date_hour" => "2021-12-26 13:00:00",
            "total" => 129.99,
            "payment_method" => "débito",
            "platform_payment" => "app",
            "status" => "Entregue"
        ]);

        Pedido::create([
            "cliente_id" => 4,
            "entregador_id"  => 5,
            "endereco_id"  => 3,
            "date_hour" => "2021-12-26 12:00:00",
            "total" => 129.99,
            "payment_method" => "débito",
            "platform_payment" => "app",
            "status" => "Entregue"
        ]);

        Pedido::create([
            "cliente_id" => 7,
            "entregador_id"  => 4,
            "endereco_id"  => 6,
            "date_hour" => "2021-12-24 14:00:00",
            "total" => 129.99,
            "payment_method" => "débito",
            "platform_payment" => "app",
            "status" => "Entregue"
        ]);

        Pedido::create([
            "cliente_id" => 7,
            "entregador_id"  => 4,
            "endereco_id"  => 6,
            "date_hour" => "2021-12-26 15:00:00",
            "total" => 129.99,
            "payment_method" => "débito",
            "platform_payment" => "app",
            "status" => "Entregue"
        ]);
    }
}

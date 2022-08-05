<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([

            //Endereço
            // EnderecoSeeder::class,
            // CidadeSeeder::class,d
            // EnderecoCidadeSeeder::class,

            //Pedidos
            // ProdutoSeeder::class,
            // PesoProdutoSeeder::class,
            // ProdutoCidadeSeeder::class,
            // PedidoSeeder::class,
            // ItensPedidoSeeder::class,
            // FeedbackPedidoSeeder::class,
           

            //Usuários
            //EntregadorSeeder::class,
            //ClienteSeeder::class,
        ]);
    }
}

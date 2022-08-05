<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FeedbackPedido;

class FeedbackPedidoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        FeedbackPedido::create([
            "pedido_id" => 1,
            'entregador_id' => 1,
            'stars' => 5,
            'obs' => 'Rápido, entregador atencioso e educado. '
        ]);

        FeedbackPedido::create([
            "pedido_id" => 2,
            'entregador_id' => 1,
            'stars' => 4,
        ]);

        FeedbackPedido::create([
            "pedido_id" => 3,
            'entregador_id' => 1,
            'stars' => 5,
            'obs' => 'Rápido, entregador atencioso e educado.'
        ]);

        FeedbackPedido::create([
            "pedido_id" => 4,
            'entregador_id' => 3,
            'stars' => 4,
            'obs' => 'Demorou um pouco, mas o entregador foi super educado. '
        ]);

        FeedbackPedido::create([
            "pedido_id" => 5,
            'entregador_id' => 5,
            'stars' => 5,
        ]);
        
    }
}

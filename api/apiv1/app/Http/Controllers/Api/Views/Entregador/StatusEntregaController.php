<?php

namespace App\Http\Controllers\Api\Views\Entregador;

use App\Http\Controllers\Controller;
use App\Models\Entregador;
use App\Models\Pedido;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;
use Carbon\Carbon;

class StatusEntregaController extends Controller
{
    use ApiResponser;

    public function alterarStatus(Request $request, $id) {
        $pedido = Pedido::findOrFail($id);

        if($request->status === 'Entregue'){
            $now = Carbon::now();
            $date = $now->toDateTimeString();

            $pedido->update([
                'status' => $request->status,
                'date_hour_entrega' => $date
            ]);

        } else {
            $pedido->update([
                'status' => $request->status
            ]);
        }

        $status = strtolower($pedido->status);

        return $this->success($pedido, "Status do pedido alterado para ${status} com sucesso!");
    }

    public function adicionarEntregador(Request $request, $id) {
        $pedido = Pedido::findOrFail($id);

        $pedido->update([
            'entregador_id' => $request->entregador_id
        ]);

        return $this->success($pedido, "Entregador adicionado ao pedido com sucesso!");
    }
}

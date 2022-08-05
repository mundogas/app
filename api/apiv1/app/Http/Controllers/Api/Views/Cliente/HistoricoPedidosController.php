<?php

namespace App\Http\Controllers\Api\Views\Cliente;

use App\Http\Controllers\Controller;
use App\Models\Pedido;
use App\Models\Cliente;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;

class HistoricoPedidosController extends Controller
{
    use ApiResponser;

    public function meusPedidos($id) {
        $user = auth('web')->user();

        if($user === null){
            $user = Cliente::where('id', $id)->first();
            
            if(!$user){
                return $this->error('Erro. Por favor, deslogue do sistema e tente novamente.', 401);
            }  
        }

        //Busca os endereços de acordo com o usuário
        //Limitar em 10 pedidos
        $pedidos = Pedido::orderby('date_hour', 'desc')->where('cliente_id', $id)->with('entregador')->with('itens')->with('feedback')->get();

        return response()->json($pedidos);
    }

}
<?php

namespace App\Http\Controllers\Api\Views\Entregador;

use App\Http\Controllers\Controller;
use App\Models\Entregador;
use App\Models\Pedido;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;

class PedidosEntregadorController extends Controller
{
    use ApiResponser;

    public function pedidosEntregar($id){
        $user = auth('entregador')->user();

        if($user === null){
            $user = Entregador::where('id', $id)->first();
            
            if(!$user){
                return $this->error('Erro. Por favor, deslogue do sistema e tente novamente.', 401);
            }  
        }

        $pedidos = Pedido::orderby('date_hour', 'desc')->where('entregador_id', $id)->where('status', '!=', 'Entregue')->with('cliente')->with('endereco')->with('itens')->get();

        return response()->json($pedidos);
    }

    public function pedidosEntregues($id){ 
        $user = auth('entregador')->user();

        if($user === null){
            $user = Entregador::where('id', $id)->first();
            
            if(!$user){
                return $this->error('Erro. Por favor, deslogue do sistema e tente novamente.', 401);
            }  
        }

        $pedidos = Pedido::orderby('date_hour', 'desc')->where('entregador_id', $id)->where('status', 'Entregue')->with('cliente')->with('endereco')->with('itens')->get();

        return response()->json($pedidos);
    }
}
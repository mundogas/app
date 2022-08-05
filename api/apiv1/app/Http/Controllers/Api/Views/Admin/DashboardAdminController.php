<?php

namespace App\Http\Controllers\Api\Views\Admin;

use App\Http\Controllers\Controller;
use App\Models\Produto;
use App\Models\Cliente;
use App\Models\Pedido;
use App\Models\FeedbackPedido;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;

class DashboardAdminController extends Controller
{
    use ApiResponser;

    public function dashboard() {
        $produtos = count(Produto::all());
        $clientes = count(Cliente::all());
        $pedidos = count(Pedido::all());

        $ultimos_pedidos = Pedido::orderby('date_hour', 'desc')->take(3)->with('entregador')->with('cliente')->with('endereco')->get();
        $feedbacks = FeedbackPedido::orderby('updated_at', 'desc')->take(3)->with('entregador')->get();

        $dash = [
            'produtos' => $produtos,
            'clientes' => $clientes,
            'pedidos' => $pedidos,
            'ultimos_pedidos' => $ultimos_pedidos,
            'feedbacks' => $feedbacks
        ];

        return response()->json($dash);
    }

}
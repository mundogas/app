<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pedido;
use App\Models\ItensPedido;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;
use App\Http\Requests\Api\Pedido\PedidoRequest;

class PedidoController extends Controller
{
    use ApiResponser;
    
    public function index()
    {
        $all = Pedido::orderby('updated_at', 'desc')->with('entregador')->with('cliente')->get();

        return response()->json($all);
    }

    public function store(PedidoRequest $request)
    {
        $payload = $request->all();
       
        $create = Pedido::create($payload);

        $add = [
            "pedido_id" => $create->id,
            "produto_id" => $request->itens[0]['produto_id'],
            "weight_product" => $request->itens[0]['weight_product'],
            "qtde" => $request->itens[0]['qtde'],
            "value" => $request->itens[0]['value'],
        ];

        $itens = ItensPedido::create($add);

        return $this->success($create, 'Cadastro criado com sucesso.');
    }

    public function show($id)
    {
        $show = Pedido::where('id', $id)->with('itens')->with('entregador')->with('cliente')->with('endereco')->first();

        if($show === null){
            return $this->error('Nenhum pedido encontrado', 401);
        }

        return response()->json($show);
    }

    public function update(PedidoRequest $request, $id)
    {
        $update = Pedido::where('id', $id)->first();

        if($update === null){
            return $this->error('Nenhum pedido encontrado', 401);
        }

        $payload = $request->all();

        $update->update($payload);

        return $this->success($update, 'Cadastro editado com sucesso.');
    }

    public function destroy($id)
    {
        $delete = Pedido::where('id', $id)->first();

        if($delete === null){
            return $this->error('Nenhum pedido encontrado', 401);
        }

        $itens = ItensPedido::where('pedido_id', $id)->get();

        $itens->delete();
        $delete->delete($id);

        return $this->success($delete, 'Cadastro deletado com sucesso.');
    }
}

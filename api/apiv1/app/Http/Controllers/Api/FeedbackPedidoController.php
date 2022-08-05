<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FeedbackPedido;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;
use App\Http\Requests\Api\FeedbackPedido\FeedbackPedidoRequest;

class FeedbackPedidoController extends Controller
{
    use ApiResponser;
    
    public function index()
    {
        $all = FeedbackPedido::orderby('updated_at', 'desc')->with('entregador')->with('cliente')->get();

        return response()->json($all);
    }

    public function store(FeedbackPedidoRequest $request)
    {
        $payload = $request->all();

        $create = FeedbackPedido::create($payload);

        return $this->success($create, 'Feedback enviado com sucesso.');
    }

    //ID do Pedido
    public function show($id)
    {
        $show = FeedbackPedido::where('pedido_id', $id)->first();

        if($show === null){
            return $this->error('Nenhum feedback encontrado', 401);
        }

        for($i = 1; $i <= $show->stars; $i++) {
            $array[] = $i;
        }

        $show['stars_array'] = $array;

        return response()->json($show);
    }

    public function update(FeedbackPedidoRequest $request, $id)
    {
        $update = FeedbackPedido::where('id', $id)->first();

        if($update === null){
            return $this->error('Nenhum feedback encontrado', 401);
        }

        $payload = $request->all();

        $update->update($payload);

        return $this->success($update, 'Feedback editado com sucesso.');
    }

    public function destroy($id)
    {
        $delete = FeedbackPedido::where('id', $id)->first();

        if($delete === null){
            return $this->error('Nenhum feedback encontrado', 401);
        }

        $delete->delete($id);

        return $this->success($delete, 'Feedback deletado com sucesso.');
    }
}

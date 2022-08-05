<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProdutoCidade;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;
use App\Http\Requests\Api\ProdutoCidade\ProdutoCidadeRequest;

class ProdutoCidadeController extends Controller
{
    use ApiResponser;

    public function store(ProdutoCidadeRequest $request)
    {
        $payload = $request->all();

        $create = ProdutoCidade::create($payload);

        return $this->success($create, 'Produto criado com sucesso.');
    }

    public function show($id)
    {
        $show = ProdutoCidade::where('id', $id)->with('cidade')->first();

        if($show === null){
            return $this->error('Nenhum produto na cidade encontrado', 401);
        }

        return response()->json($show);
    }

    public function update(ProdutoCidadeRequest $request, $id)
    {
        $update = ProdutoCidade::where('id', $id)->first();

        if($update === null){
            return $this->error('Nenhum produto na cidade encontrado', 401);
        }

        $payload = $request->all();

        $update->update($payload);

        return $this->success($update, 'Cadastro editado com sucesso.');
    }

    public function destroy($id)
    {
        $delete = ProdutoCidade::where('id', $id)->first();

        if($delete === null){
            return $this->error('Nenhum produto encontrado', 401);
        }

        $delete->delete($id);

        return $this->success($delete, 'Produto deletado com sucesso.');
    }
}

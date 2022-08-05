<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PesoProduto;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;
use App\Http\Requests\Api\PesoProduto\PesoProdutoRequest;

class PesoProdutoController extends Controller
{
    use ApiResponser;
    
    public function index()
    {
        
    }

    public function store(ProdutoRequest $request)
    {
        $payload = $request->all();

        $create = PesoProduto::create($payload);

        return $this->success($create, 'Cadastro criado com sucesso.');
    }

    public function show($id)
    {
        $show = PesoProduto::where('id', $id)->first();

        if($show === null){
            return $this->error('Nenhum valor encontrado', 401);
        }

        return response()->json($show);
    }

    public function update(PesoProdutoRequest $request, $id)
    {
        $update = PesoProduto::where('id', $id)->first();

        if($update === null){
            return $this->error('Nenhum valor encontrado', 401);
        }

        $payload = $request->all();

        $update->update($payload);

        return $this->success($update, 'Cadastro editado com sucesso.');
    }

    public function destroy($id)
    {
        $delete = PesoProduto::where('id', $id)->first();

        if($delete === null){
            return $this->error('Nenhum produto encontrado', 401);
        }

        $delete->delete($id);

        return $this->success($delete, 'Cadastro deletado com sucesso.');
    }
}

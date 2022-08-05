<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cidade;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;
use App\Http\Requests\Api\Cidade\CidadeRequest;

class CidadeController extends Controller
{
    use ApiResponser;
    
    public function index()
    {
        $all = Cidade::orderby('updated_at', 'desc')->get();

        return response()->json($all);
    }

    public function cidadesAtivas(){
        $all = Cidade::where('ativo', '!=', 0)->orderby('updated_at', 'desc')->get();
        
        return response()->json($all);
    }

    public function store(CidadeRequest $request)
    {
        $payload = $request->all();

        $create = Cidade::create($payload);

        return $this->success($create, 'Cadastro criado com sucesso.');
    }

    public function show($id)
    {
        $show = Cidade::where('id', $id)->first();

        if($show === null){
            return $this->error('Nenhuma cidade encontrada', 401);
        }

        return response()->json($show);
    }

    public function update(CidadeRequest $request, $id)
    {
        $update = Cidade::where('id', $id)->first();

        if($update === null){
            return $this->error('Nenhuma cidade encontrada', 401);
        }

        $payload = $request->all();

        $update->update($payload);

        return $this->success($update, 'Cadastro editado com sucesso.');
    }

    public function destroy($id)
    {
        $delete = Cidade::where('id', $id)->first();

        if($delete === null){
            return $this->error('Nenhuma cidade encontrada', 401);
        }

        $delete->delete($id);

        return $this->success($delete, 'Cadastro deletado com sucesso.');
    }
}

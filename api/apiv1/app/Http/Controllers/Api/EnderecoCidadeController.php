<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EnderecoCidade;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;
use App\Http\Requests\Api\EnderecoCidade\EnderecoCidadeRequest;

class EnderecoCidadeController extends Controller
{

    use ApiResponser;

    public function index()
    {
        //
    }

    public function store(EnderecoCidadeRequest $request)
    {
        $payload = $request->all();

        $create = EnderecoCidade::create($payload);

        return $this->success($create, 'Cadastro criado com sucesso.');
    }

    public function show($id)
    {
        $show = EnderecoCidade::where('id', $id)->first();

        if($show === null){
            return $this->error('Nenhuma dado encontrado', 401);
        }

        return response()->json($show);
    }

    public function update(EnderecoCidadeRequest $request, $id)
    {
        $update = EnderecoCidade::where('id', $id)->first();

        if($update === null){
            return $this->error('Nenhuma dado encontrado', 401);
        }

        $payload = $request->all();

        $update->update($payload);

        return $this->success($update, 'Cadastro editado com sucesso.');
    }

    public function destroy($id)
    {
        $delete = EnderecoCidade::where('id', $id)->first();

        if($delete === null){
            return $this->error('Nenhuma dado encontrado', 401);
        }

        $delete->delete($id);

        return $this->success($delete, 'Cadastro deletado com sucesso.');
    }
}

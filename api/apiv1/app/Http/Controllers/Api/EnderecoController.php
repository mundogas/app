<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Endereco;
use App\Models\EnderecoCidade;
use Illuminate\Http\Request;
use App\Http\Requests\Api\Endereco\EnderecoRequest;
use App\Traits\ApiResponser;

class EnderecoController extends Controller
{
    use ApiResponser;

    public function index()
    {
        $all = Endereco::orderby('updated_at', 'desc')->get();

        return response()->json($all);
    }

    public function store(EnderecoRequest $request)
    {
        $payload = $request->all();
       
        $create = Endereco::create($payload);

        $add = [
            "cidade_id" => $request->cidade['cidade_id'],
            "endereco_id" => $create->id,
            "cliente_id" => $create->cliente_id
        ];

        $cidade = EnderecoCidade::create($add);

        return $this->success($create, 'Cadastro criado com sucesso.');
    }

    public function show($id)
    {
        $show = Endereco::where('id', $id)->first();

        if($show === null){
            return $this->error('Nenhum endereço encontrado', 401);
        }

        return response()->json($show);
    }

    public function update(EnderecoRequest $request, $id)
    {
        $update = Endereco::where('id', $id)->first();

        if($update === null){
            return $this->error('Nenhum endereço encontrado', 401);
        }

        $payload = $request->all();

        $update->update($payload);

        return $this->success($update, 'Cadastro editado com sucesso.');
    }

    public function destroy($id)
    {
        $delete = Endereco::where('id', $id)->first();

        if($delete === null){
            return $this->error('Nenhum endereço encontrado', 401);
        }

        $endereco = EnderecoCidade::where('endereco_id', $id)->first();

        $endereco->delete();
        $delete->delete($id);

        return $this->success($delete, 'Cadastro deletado com sucesso.');
    }
}

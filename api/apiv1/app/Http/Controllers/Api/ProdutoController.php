<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Produto;
use App\Models\ProdutoCidade;
use App\Models\Cidade;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;
use App\Http\Requests\Api\Produto\ProdutoRequest;
use Illuminate\Support\Facades\Auth;

class ProdutoController extends Controller
{
    use ApiResponser;

    public function index()
    {
        $produtos = Produto::orderby('updated_at', 'desc')->with('cidades')->get();

        return response()->json($produtos);
    }

    public function produtosAtivos($id){
        //ID CIDADE

        $all = Produto::where('ativo', '!=', 0)->orderby('updated_at', 'desc')->with('peso')->get();

        foreach($all as $a) {
            //Preços
            $precos = ProdutoCidade::where('cidade_id', $id)->where('produto_id', $a->id)->first();
            $a['preco'] = $precos;

            //Nome da Cidade
            $cidade_name = Cidade::where('id', $a['preco']->cidade_id)->first();
            $a['preco']->cidade_name = $cidade_name->name;
        }

        return response()->json($all);
    }

    public function store(ProdutoRequest $request)
    {
        $payload = [
            'name'  => $request->name,
            'ativo' => $request->ativo,
        ];

        $create = Produto::create($payload);

        //Cadastra o produto na cidade
        $cidades = $request->cidades;
        foreach($cidades as $cidade){
            $produtoCidade = [
                'produto_id' => $create['id'],
                'cidade_id'  => $cidade['cidade_id'],
                'sale_price' => $cidade['sale_price'],
                'discount_price'  => $cidade['discount_price'],
                'promotion'  => $cidade['promotion'],
            ];
            $createPD = ProdutoCidade::create($produtoCidade);
        }

        return $this->success($create, 'Cadastro criado com sucesso.');
    }

    public function show($id)
    {
        $show = Produto::where('id', $id)->with('cidades')->first();

        if($show === null){
            return $this->error('Nenhum produto encontrado', 401);
        }

        return response()->json($show);
    }

    public function update(ProdutoRequest $request, $id)
    {
        $update = Produto::where('id', $id)->first();

        if($update === null){
            return $this->error('Nenhum produto encontrado', 401);
        }

        $payload = $request->all();

        $update->update($payload);

        return $this->success($update, 'Produto editado com sucesso.');
    }

    public function destroy($id)
    {
        $delete = Produto::where('id', $id)->first();

        if($delete === null){
            return $this->error('Nenhum produto encontrado', 401);
        }

        $deletePD = ProdutoCidade::where('produto_id', $id)->delete();
        $delete->delete($id);

        return $this->success($delete, 'Produto deletado com sucesso.');
    }
}

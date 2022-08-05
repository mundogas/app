<?php

namespace App\Http\Controllers\Api\Views\Cliente;

use App\Http\Controllers\Controller;
use App\Models\Endereco;
use App\Models\Cliente;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;

class EnderecosClienteController extends Controller
{
    use ApiResponser;

    public function meusEnderecos($id) {
        $user = auth('web')->user();

        if($user === null){
            $user = Cliente::where('id', $id)->first();
            
            if(!$user){
                return $this->error('Erro. Por favor, deslogue do sistema e tente novamente.', 401);
            }  
        }

        //Busca os endereços de acordo com o usuário
        $enderecos = Endereco::where('cliente_id', $id)->with('cidade')->get();

        return response()->json($enderecos);
    }

}
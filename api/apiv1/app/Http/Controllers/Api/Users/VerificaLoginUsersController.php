<?php

namespace App\Http\Controllers\Api\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cliente;
use App\Models\Admin;
use App\Models\Entregador;
use App\Traits\ApiResponser;
use App\Http\Requests\Api\Auth\Admin\AdminLoginRequest;

class VerificaLoginUsersController extends Controller
{
    use ApiResponser;

    public function verificaUsers(AdminLoginRequest $request) {
        $admin = Admin::where('email', $request->email)->first();
        $entregador = Entregador::where('email', $request->email)->first();
        $cliente = Cliente::where('email', $request->email)->first();
        
        //Verifica se não existe o usuário em nenhuma tabela
        if($admin === null && $entregador === null && $cliente === null) {
            return $this->error('Nenhum usuário encontrado.', 404);
        }
        
        //Verifica qual o nível do usuário
        if($admin != null){
            return response()->json(['user' => 'admin']);
        }

        if($entregador != null){
            return response()->json(['user' => 'entregador']);
        }

        if($cliente != null){
            return response()->json(['user' => 'user']);
        }

    }

    public function verificaUsersForgotPassword($id) {
        $admin = Admin::where('email', $id)->first();
        $entregador = Entregador::where('email', $id)->first();
        $cliente = Cliente::where('email', $id)->first();
        
        //Verifica se não existe o usuário em nenhuma tabela
        if($admin === null && $entregador === null && $cliente === null) {
            return $this->error('Nenhum usuário encontrado.', 404);
        }
        
        //Verifica qual o nível do usuário
        if($admin != null){
            return response()->json(['user' => 'admin']);
        }

        if($entregador != null){
            return response()->json(['user' => 'entregador']);
        }

        if($cliente != null){
            return response()->json(['user' => 'user']);
        }

    }
}

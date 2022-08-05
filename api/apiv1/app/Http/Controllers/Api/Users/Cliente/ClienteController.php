<?php

namespace App\Http\Controllers\Api\Users\Cliente;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cliente;
use App\Traits\ApiResponser;
use App\Http\Requests\Api\Auth\Cliente\ClienteUpdateRequest;
use App\Http\Requests\Api\Auth\Cliente\ClienteRegisterRequest;
use Illuminate\Support\Facades\Hash;

class ClienteController extends Controller
{
    use ApiResponser;

    public function index(){
        $users = Cliente::orderby('updated_at', 'desc')->get();
        
        foreach($users as $user){
            if($user->image != null){
                $path = $user->image;

                $img = base64_decode($path);
                $dados = utf8_decode($img);

                $user->image = $dados;
            }

            $string = trim(preg_replace('/\s\s+/', ' ', $user->name));
            $name = explode(' ', $string);

            $user->name_array = $name;
        }

        return response()->json($users);
    }

    public function store(ClienteRegisterRequest $request){
        
        $payload = $request->all();
        $payload['password'] = Hash::make($payload['password']);
        
        $user = Cliente::create($payload);
        $user['nivel'] = 'user';

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('New User')->plainTextToken
        ], 'Cadastro criado com sucesso.');
    }

    public function show($id){
        $user = Cliente::findOrFail($id);

        if($user->image != null){
            $path = $user->image;

            $img = base64_decode($path);
            $dados = utf8_decode($img);

            $user->image = $dados;
        }
        
        $string = trim(preg_replace('/\s\s+/', ' ', $user->name));
        $name = explode(' ', $string);

        $user->name_array = $name;

        return response()->json($user);
    }

    // public function update(UserUpdateRequest $request, $id)
    // {
    //     $user = User::findOrFail($id);

    //     $payload = $request->all();

    //     $user->update($payload);

    //     return $this->success($user, 'Cadastro editado com sucesso.');
    // }
    
    public function destroy($id)
    {
        $user = Cliente::findOrFail($id);

        //Deleta os tokens
        $user->tokens()->delete();

        $user->delete($id);

        return $this->success([], 'Cadastro deletado com sucesso!');
    }
}

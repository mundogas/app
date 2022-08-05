<?php

namespace App\Http\Controllers\Api\Users\Entregador;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;
use App\Models\Entregador;
use App\Http\Requests\Api\Auth\Entregador\EntregadorRegisterRequest;
use App\Http\Requests\Api\Auth\Entregador\EntregadorLoginRequest;
use App\Http\Requests\Api\Auth\Entregador\EntregadorPasswordRequest;
use App\Traits\ApiResponser;


class EntregadorAuthController extends Controller
{
    use ApiResponser;

    public function register(EntregadorRegisterRequest $request)
    {
        $payload = $request->all();
        $payload['password'] = Hash::make($payload['password']);
        $payload['approve'] = 'Aguardando aprovação';
        
        $user = Entregador::create($payload);
        
        return $this->success([
            'user' => $user,
            'token' => $user->createToken('New Entregador')->plainTextToken
        ], 'Cadastro criado com sucesso.');
    }

    public function login(EntregadorLoginRequest $request)
    {
        $payload = $request->all();

        if (!Auth::guard('entregador')->attempt($payload)) {
            return $this->error('As credenciais estão incorretas.', 401);
        }

        $user = auth('entregador')->user();

        if($user->image){
            $path = $user->image;

            $img = base64_decode($path);
            $dados = utf8_decode($img);

            $user->image = $dados;
        }

        $string = trim(preg_replace('/\s\s+/', ' ', $user->name));
        $name = explode(' ', $string);

        $user->name_array = $name;

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API Token', ['entregador'])->plainTextToken,
        ]);
    }

    public function me(Request $request, $id){
        $user =  auth('entregador')->user();
        
        if($user === null){
            $user = Entregador::where('id', $id)->first();
            
            if(!$user){
                return $this->error('Erro. Por favor, deslogue do sistema e tente novamente.', 401);
            }  
        }

        $string = trim(preg_replace('/\s\s+/', ' ', $user->name));
        $name = explode(' ', $string);

        $user->name_array = $name;
        
        return $user;
    }

    public function alterarSenha(EntregadorPasswordRequest $request, $id){

        $user = auth('entregador')->user();

        if($user === null){
            $user = Entregador::where('id', $id)->first();
            
            if(!$user){
                return $this->error('Erro. Por favor, deslogue do sistema e tente novamente.', 401);
            }  
        }

        $usuario = Entregador::findOrFail($user->id);

        //Verifica se a senha atual é igual a cadastrada no banco
        if(!Hash::check($request->current_password, $usuario->password)){
            return $this->error('A senha atual não confere com a cadastrada na base de dados.', 401);
        }

        $payload = $request->all();

        $payload['password'] = Hash::make($payload['password']);

        $usuario->update($payload);

        //Apaga os tokens
        //$user->tokens()->delete();

        return $this->success([], 'Senha alterada com sucesso.');
    }

    public function editarPerfil(Request $request, $id)
    {
        
        $entregador = auth('entregador')->user();

        if($entregador === null){
            $entregador = Entregador::where('id', $id)->first();
            
            if(!$entregador){
                return $this->error('Erro. Por favor, deslogue do sistema e tente novamente.', 401);
            }  
        }

        //Caso o email seja do próprio usuário, então alterar só o nome
        if($entregador->email === $request->email){
            $messages = [
                'name.required' => 'O campo nome é obrigatório',
                'name.max' => 'O campo nome permite no máximo 255 caracteres',
            ];

            $request->validate([
                'name' => 'required|string|max:255',
            ], $messages);


            $entregador->update([
                'name' => $request->name,
            ]);

            //Devolve a imagem
            if($entregador->image){
                $path = $entregador->image;

                $img = base64_decode($path);
                $dados = utf8_decode($img);

                $entregador->image = $dados;
            }

            $string = trim(preg_replace('/\s\s+/', ' ', $request->name));
            $name = explode(' ', $string);

            $entregador->name_array = $name;

            return $this->success($entregador, 'Cadastro editado com sucesso.');
        }

        //Caso tenha alteração no email, alterar tudo
        $messages = [
            'name.required' => 'O campo nome é obrigatório',
            'name.max' => 'O campo nome permite no máximo 255 caracteres',

            'email.required' => 'O campo email é obrigatório.',
            'email.email' => 'O campo precisa ser um e-mail válido.',
            'email.unique' => 'O e-mail já está cadastrado em nossa base de dados. Tente outro e-mail.',
        ];

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:entregadores,email',
        ], $messages);

        $entregador->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        //Devolve a imagem
        if($entregador->image){
            $path = $entregador->image;

            $img = base64_decode($path);
            $dados = utf8_decode($img);

            $entregador->image = $dados;
        }

        return $this->success($entregador, 'Cadastro editado com sucesso.');
    }

    public function logout(Request $request, $id)
    {
        $user = auth('entregador')->user();

        if($user === null){
            $user = Entregador::where('id', $id)->first();
            
            if(!$user){
                return $this->error('Erro. Por favor, deslogue do sistema e tente novamente.', 401);
            }  
        }

        $requestToken = $request->header('authorization');
        $personalAccessToken = new PersonalAccessToken();
        $token = $personalAccessToken->findToken(str_replace('Bearer ', '', $requestToken));

        //Deleta o token, mesmo que não encontre o user
        $token->delete();
        $user->tokens()->delete();

        return $this->success([], 'Sessão encerrada com sucesso.');
    }
}

<?php

namespace App\Http\Controllers\Api\Users\Cliente;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;
use App\Models\Cliente;
use App\Models\Endereco;
use App\Models\EnderecoCidade;
use App\Http\Requests\Api\Auth\Cliente\ClienteRegisterRequest;
use App\Http\Requests\Api\Auth\Cliente\ClienteLoginRequest;
use App\Http\Requests\Api\Auth\Cliente\ClientePasswordRequest;
use App\Traits\ApiResponser;

class ClienteAuthController extends Controller
{
    use ApiResponser;

    public function register(ClienteRegisterRequest $request)
    {
        $payload = $request->all();

        $payload['password'] = Hash::make($payload['password']);

        $user = Cliente::create($payload);

        $addEndereco = [
            'name' => $request->address['name'],
            'type' => $request->address['type'],
            'address' => $request->address['address'],
            'number' => $request->address['number'],
            'district' => $request->address['district'],
            'zipcode' => $request->address['zipcode'],
            'complement' => $request->address['complement'],
            'cliente_id' => $user->id,
        ];

        $endereco = Endereco::create($addEndereco);

        $addCidade = [
            "cidade_id" => $request->address['cidade_id'],
            "endereco_id" => $endereco->id,
            "cliente_id" => $user->id
        ];

        $cidade = EnderecoCidade::create($addCidade);

        return $this->success([
            'user' => $user,
            'nivel' => 'cliente', 
            'token' => $user->createToken('New User')->plainTextToken
        ], 'Cadastro criado com sucesso.');
    }

    public function login(ClienteLoginRequest $request)
    {
        $payload = $request->all();

        if (!Auth::guard('web')->attempt($payload)) {
            return $this->error('As credenciais estão incorretas.', 401);
        }

        $user = auth('web')->user();
        $user['nivel'] = 'cliente';

        $string = trim(preg_replace('/\s\s+/', ' ', $user->name));
        $name = explode(' ', $string);

        $user->name_array = $name;

        if($user->image){
            $path = $user->image;

            $img = base64_decode($path);
            $dados = utf8_decode($img);

            $user->image = $dados;
        }
       
        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API Token', ['cliente'])->plainTextToken,
        ]);
    }

    public function me(Request $request, $id){
        $user =  auth('web')->user();
        
        if($user === null){
            $user = Cliente::where('id', $id)->first();
            
            if(!$user){
                return $this->error('Erro. Por favor, deslogue do sistema e tente novamente.', 401);
            }  
        }

        $string = trim(preg_replace('/\s\s+/', ' ', $user->name));
        $name = explode(' ', $string);

        $user->name_array = $name;
        
        return $user;
    }

    public function editarPerfil(Request $request, $id)
    {

        $user = Cliente::where('id', $id)->first();
        
        if(!$user){
            return $this->error('Erro. Por favor, deslogue do sistema e tente novamente.', 401);
        }  

        //Caso o email seja do próprio usuário, então alterar só o nome
        if($user->email === $request->email){
            
            $messages = [
                'name.required' => 'O campo nome é obrigatório',
                'name.max' => 'O campo nome permite no máximo 255 caracteres',
                'phone.required' => 'O campo celular é obrigatório',
            ];

            $request->validate([
                'name' => 'required|string|max:255',
                'phone' => 'required|string|max:255',
            ], $messages);

            $user->update([
                'name' => $request->name,
                'phone' => $request->phone,
            ]);
            
            $string = trim(preg_replace('/\s\s+/', ' ', $user->name));
            $name = explode(' ', $string);

            $user->name_array = $name;

            return $this->success($user, 'Cadastro editado com sucesso.');
        }
       
        //Caso tenha alteração no email, alterar tudo
        $messages = [
            'name.required' => 'O campo nome é obrigatório',
            'name.max' => 'O campo nome permite no máximo 255 caracteres',

            'phone.required' => 'O campo celular é obrigatório',

            'email.required' => 'O campo email é obrigatório.',
            'email.email' => 'O campo precisa ser um e-mail válido.',
            'email.unique' => 'O e-mail já está cadastrado em nossa base de dados. Tente outro e-mail.'
        ];
    
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|string|email|unique:clientes,email',
        ], $messages);

        $user->update([
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
        ]);

        $string = trim(preg_replace('/\s\s+/', ' ', $user->name));
        $name = explode(' ', $string);

        $user->name_array = $name;
      
        return $this->success($user, 'Cadastro editado com sucesso.');
    }

    public function alterarSenha(ClientePasswordRequest $request, $id){

        $user = auth('web')->user();

        if($user === null){
            $user = Cliente::where('id', $id)->first();
            
            if(!$user){
                return $this->error('Erro. Por favor, deslogue do sistema e tente novamente.', 401);
            }  
        }

        $usuario = Cliente::findOrFail($user->id);

        //Verifica se a senha atual é igual a cadastrada no banco
        if(!Hash::check($request->current_password, $usuario->password)){
            return $this->error('A senha atual não confere com a cadastrada na base de dados.', 401);
        }

        $payload = $request->all();

        $payload['password'] = Hash::make($payload['password']);

        $usuario->update($payload);

        //Apaga os tokens
        //s$user->tokens()->delete();

        return $this->success([], 'Senha alterada com sucesso.');
    }

    public function logout(Request $request, $id)
    {
        $user = auth('web')->user();

        if($user === null){
            $user = Cliente::where('id', $id)->first();
            
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

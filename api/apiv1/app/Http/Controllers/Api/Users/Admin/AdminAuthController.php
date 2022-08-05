<?php

namespace App\Http\Controllers\Api\Users\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;
use App\Http\Requests\Api\Auth\Admin\AdminLoginRequest;
use App\Http\Requests\Api\Auth\Admin\AdminPasswordRequest;
use App\Traits\ApiResponser;

class AdminAuthController extends Controller
{
    use ApiResponser;

    public function login(AdminLoginRequest $request)
    {
        $payload = $request->all();

        if (!Auth::guard('admin')->attempt($payload)) {
            return $this->error('As credenciais estão incorretas.', 401);
        }

        $admin = auth('admin')->user();
        $admin['nivel'] = 'admin';

        $string = trim(preg_replace('/\s\s+/', ' ', $admin->name));
        $name = explode(' ', $string);

        $admin->name_array = $name;

        if($admin->image){
            $path = $admin->image;

            $img = base64_decode($path);
            $dados = utf8_decode($img);

            $admin->image = $dados;
        }

        return $this->success([
            'user' => $admin,
            'token' => $admin->createToken('API Token', ['admin'])->plainTextToken,
        ]);
    }

    public function me(Request $request, $id){
        $admin = auth('admin')->user();

        if($admin === null){
            $admin = Admin::where('id', $id)->first();
            
            if(!$admin){
                return $this->error('Erro. Por favor, deslogue do sistema e tente novamente.', 401);
            }  
        }

        $string = trim(preg_replace('/\s\s+/', ' ', $admin->name));
        $name = explode(' ', $string);

        $admin->name_array = $name;
        
        return $admin;
    }

    public function alterarSenha(AdminPasswordRequest $request, $id){

        $admin = auth('admin')->user();

        if($admin === null){
            $admin = Admin::where('id', $id)->first();
            
            if(!$admin){
                return $this->error('Erro. Por favor, deslogue do sistema e tente novamente.', 401);
            }  
        }

        $usuario = Admin::findOrFail($admin->id);

        //Verifica se a senha atual é igual a cadastrada no banco
        if(!Hash::check($request->current_password, $usuario->password)){
            return $this->error('A senha atual não confere com a cadastrada na base de dados.', 401);
        }

        $payload = $request->all();

        $payload['password'] = Hash::make($payload['password']);

        $usuario->update($payload);

        return $this->success([], 'Senha alterada com sucesso.');
    }

    public function editarPerfil(Request $request, $id)
    {
        
        $admin = auth('admin')->user();

        if($admin === null){
            $admin = Admin::where('id', $id)->first();
            
            if(!$admin){
                return $this->error('Erro. Por favor, deslogue do sistema e tente novamente.', 401);
            }  
        }

        //Caso o email seja do próprio usuário, então alterar só o nome
        if($admin->email === $request->email){
            $messages = [
                'name.required' => 'O campo nome é obrigatório',
                'name.max' => 'O campo nome permite no máximo 255 caracteres',
            ];

            $request->validate([
                'name' => 'required|string|max:255',
            ], $messages);


            $admin->update([
                'name' => $request->name,
            ]);

            //Devolve a imagem
            if($admin->image){
                $path = $admin->image;

                $img = base64_decode($path);
                $dados = utf8_decode($img);

                $admin->image = $dados;
            }

            return $this->success($admin, 'Cadastro editado com sucesso.');
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
            'email' => 'required|string|email|unique:admins,email',
        ], $messages);

        $admin->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        //Devolve a imagem
        if($admin->image){
            $path = $admin->image;

            $img = base64_decode($path);
            $dados = utf8_decode($img);

            $admin->image = $dados;
        }

        return $this->success($admin, 'Cadastro editado com sucesso.');
    }

    public function logout(Request $request, $id)
    {
        $admin = auth('admin')->user();

        if($admin === null){
            $admin = Admin::where('id', $id)->first();
            
            if(!$admin){
                return $this->error('Erro. Por favor, deslogue do sistema e tente novamente.', 401);
            }  
        }

        $requestToken = $request->header('authorization');
        $personalAccessToken = new PersonalAccessToken();
        $token = $personalAccessToken->findToken(str_replace('Bearer ', '', $requestToken));

        //Deleta o token, mesmo que não encontre o user
        $token->delete();
        
        $admin->tokens()->delete();
        
        return $this->success([], 'Sessão encerrada com sucesso.');
    }
}

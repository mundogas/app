<?php

namespace App\Http\Controllers\Api\Users\Admin;

use App\Models\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;
use App\Http\Requests\Api\Auth\Admin\AdminRegisterRequest;
use App\Http\Requests\Api\Admin\AdminUpdateRequest;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    use ApiResponser;
    
    public function listAdmins($id){

        $admin = auth('admin')->user();
        
        if($admin === null){
            $admin = Admin::where('id', $id)->first();
            
            if(!$admin){
                return $this->error('Erro. Por favor, deslogue do sistema e tente novamente.', 401);
            }  
        }

        //Selecionando todos os usuários logados, menos o próprio admin
        $admins = Admin::where('id', '<>', $admin->id)->orderby('created_at', 'desc')->get();

        foreach($admins as $admin){
            if($admin->image != null){
                $path = $admin->image;

                $img = base64_decode($path);
                $dados = utf8_decode($img);

                $admin->image = $dados;
            }

            $string = trim(preg_replace('/\s\s+/', ' ', $admin->name));
            $name = explode(' ', $string);

            $admin->name_array = $name;
        }

        return response()->json($admins);
    }

    public function index(){
        $admins = Admin::orderby('updated_at', 'desc')->get();

        foreach($admins as $admin){
            if($admin->image != null){
                $path = $admin->image;

                $img = base64_decode($path);
                $dados = utf8_decode($img);

                $admin->image = $dados;
            }

            $string = trim(preg_replace('/\s\s+/', ' ', $admin->name));
            $name = explode(' ', $string);

            $admin->name_array = $name;
        }

        return response()->json($admins);
    }

    public function store(AdminRegisterRequest $request){

        $payload = $request->all();

        $payload['password'] = Hash::make($payload['password']);

        $admin = Admin::create($payload);
        $admin['nivel'] = 'admin';

        return $this->success([
            'admin' => $admin,
            'token' => $admin->createToken('New Admin')->plainTextToken
        ], 'Cadastro criado com sucesso.');
    }

    public function show($id){
        $admin = Admin::findOrFail($id);

        if($admin->image != null){
            $path = $admin->image;

            $img = base64_decode($path);
            $dados = utf8_decode($img);

            $admin->image = $dados;
        }

        $string = trim(preg_replace('/\s\s+/', ' ', $admin->name));
        $name = explode(' ', $string);

        $admin->name_array = $name;

        return response()->json($admin);
    }

    // public function update(AdminUpdateRequest $request, $id)
    // {
    //     $admin = Admin::findOrFail($id);

    //     $payload = $request->all();

    //     $admin->update($payload);

    //     return $this->success($admin, 'Cadastro editado com sucesso.');
    // }

    public function update(Request $request, $id)
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
        
        if($admin->image){
            $path = $admin->image;

            $img = base64_decode($path);
            $dados = utf8_decode($img);

            $admin->image = $dados;
        }
        
        return $this->success($admin, 'Cadastro editado com sucesso.');
    }

    public function destroy($id)
    {
        $admin = Admin::findOrFail($id);

        //Deleta os tokens
        $admin->tokens()->delete();

        $admin->delete($id);

        return $this->success([], 'Cadastro deletado com sucesso!');
    }
}

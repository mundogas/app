<?php

namespace App\Http\Controllers\Api\Users\Entregador;

use App\Models\Entregador;
use App\Models\FeedbackPedido;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;
use App\Http\Requests\Api\Auth\Entregador\EntregadorRegisterRequest;
use App\Http\Requests\Api\Auth\Entregador\EntregadorUpdateRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class EntregadorController extends Controller
{
    use ApiResponser;

    public function index(){    
        $entregadores = Entregador::orderby('updated_at', 'desc')->with('stars')->get();

        foreach($entregadores as $entregador){
            if($entregador->image != null){
                $path = $entregador->image;

                $img = base64_decode($path);
                $dados = utf8_decode($img);

                $entregador->image = $dados;
            }

            $string = trim(preg_replace('/\s\s+/', ' ', $entregador->name));
            $name = explode(' ', $string);

            $entregador->name_array = $name;

            if(count($entregador->stars) > 0){
                $soma = 0;

                foreach($entregador->stars as $star){
                    $soma = $star->stars + $soma;
                }
                
                $qtde = count($entregador->stars);
                $media = $soma / $qtde;
                $media = number_format($media, 1);
                $entregador->avaliacao = $media;
            }
            else {
                $entregador->avaliacao = null;
            }
        }
        
        return response()->json($entregadores);
    }

    public function store(EntregadorRegisterRequest $request){
        $payload = $request->all();

        $payload['password'] = Hash::make($payload['password']);
        
        $entregador = Entregador::create($payload);
        $entregador['nivel'] = 'entregador';

        return $this->success([
            'entregador' => $entregador,
            'token' => $entregador->createToken('New Entregador')->plainTextToken
        ], 'Cadastro criado com sucesso.');
    }

    public function show($id){
        $entregador = Entregador::findOrFail($id);

        if($entregador->image != null){
            $path = $entregador->image;

            $img = base64_decode($path);
            $dados = utf8_decode($img);

            $entregador->image = $dados;
        }

        $string = trim(preg_replace('/\s\s+/', ' ', $entregador->name));
        $name = explode(' ', $string);

        $entregador->name_array = $name;

        return response()->json($entregador);
    }

    public function update(Request $request, $id)
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

        return $this->success($entregador, 'Cadastro editado com sucesso.');
    }

    // public function update(EmpresaUpdateRequest $request, $id)
    // {
    //     $empresa = Empresa::findOrFail($id);

    //     $payload = $request->all();

    //     $empresa->update($payload);

    //     return $this->success($empresa, 'Cadastro editado com sucesso.');
    // }

    public function destroy($id)
    {
        $entregador = Entregador::findOrFail($id);
        
        //Deleta os tokens
        $entregador->tokens()->delete();

        $entregador->delete($id);

        return $this->success([], 'Cadastro deletado com sucesso!');
    }
}

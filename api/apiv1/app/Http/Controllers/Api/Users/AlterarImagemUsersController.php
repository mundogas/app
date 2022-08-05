<?php

namespace App\Http\Controllers\Api\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cliente;
use App\Models\Admin;
use App\Models\Empresa;
use App\Traits\ApiResponser;
use App\Http\Requests\Api\Imagem\ImagemStoreRequest;
use Illuminate\Support\Facades\Storage;

class AlterarImagemUsersController extends Controller
{
    use ApiResponser;
    
    public function imageProfileCliente(ImagemStoreRequest $request, $id)
    {
        $user = Cliente::where('id', $id)->first();
       
        if($user === null){
            return $this->error('Nenhum usuário encontrado.', 404);
        }

        //Se tiver imagem anterior, deletar
        
        if($user->image){
            $path = $user->image;

            $img = base64_decode($path);
            $dados = utf8_decode($img);

            $delete = Storage::delete('public/media/' .$dados);
        }
        
        //Validando se é uma imagem mesmo
        if(!$request->has('image')){
            return $this->error('Imagem inválida. Tente novamente mais tarde.', 404);
        }

        //Salvando a nova imagem
        if($request->has('image') && strpos($request->image, ';base64')){
            $payload = $request->all();
  
            $base64 = $request->image;
  
            //Extensão do arquivo
            $extension = explode('/', $base64);
            $str = $extension[61];
            $extension = explode(';', $extension[1]);
            $extension = '.'.$extension[0];

            $name = md5($str .strtotime('now')). $extension;

            //Obtem o arquivo
            $sepatorFile = explode(',', $base64);
            $file = $sepatorFile[1];
            $path = 'public/media/';

            //Envia a imagem
            Storage::put($path.$name, base64_decode($file), 'public');

            $teste = utf8_encode($name);
            $encode = base64_encode($teste);
            
            //Save to DB
            $user->update([
                'image' => $encode,
            ]);

            $user->image = $teste;

            /*return $this->success($user->image, 'Foto de perfil atualizada com sucesso.');*/

            return response()->json(['user' => $user, 'message' => 'Imagem atualizada com sucesso.']);
        }
    }

    public function imageProfileEntregador(ImagemStoreRequest $request, $id)
    {
        $entregador = Entregador::where('id', $id)->first();
       
        if($entregador === null){
            return $this->error('Nenhum usuário encontrado.', 404);
        }

        //Se tiver imagem anterior, deletar
        
        if($entregador->image){
            $path = $entregador->image;

            $img = base64_decode($path);
            $dados = utf8_decode($img);

            $delete = Storage::delete('public/media/' .$dados);
        }
        
        //Validando se é uma imagem mesmo
        if(!$request->has('image')){
            return $this->error('Imagem inválida. Tente novamente mais tarde.', 404);
        }

        //Salvando a nova imagem
        if($request->has('image') && strpos($request->image, ';base64')){
            $payload = $request->all();
  
            $base64 = $request->image;
  
            //Extensão do arquivo
            $extension = explode('/', $base64);
            $str = $extension[61];
            $extension = explode(';', $extension[1]);
            $extension = '.'.$extension[0];

            $name = md5($str .strtotime('now')). $extension;

            //Obtem o arquivo
            $sepatorFile = explode(',', $base64);
            $file = $sepatorFile[1];
            $path = 'public/media/';

            //Envia a imagem
            Storage::put($path.$name, base64_decode($file), 'public');

            $teste = utf8_encode($name);
            $encode = base64_encode($teste);
            
            //Save to DB
            $entregador->update([
                'image' => $encode,
            ]);

            $entregador->image = $teste;

            // return $this->success($entregador->image, 'Foto de perfil atualizada com sucesso.');
            return response()->json(['user' => $entregador, 'message' => 'Imagem atualizada com sucesso.']);
        }
    }

    public function imageProfileAdmin(ImagemStoreRequest $request, $id)
    {
        $admin = Admin::where('id', $id)->first();

        if($admin === null){
            return $this->error('Nenhuma imagem com esta identificação foi encontrada, tente novamente.', 404);
        }

        //Se tiver imagem anterior, deletar
        if($admin->image){
            $path = $admin->image;

            $img = base64_decode($path);
            $dados = utf8_decode($img);

            $delete = Storage::delete('public/media/' .$dados);
        }
        
        //Salvando a nova imagem
        if($request->has('image') && strpos($request->image, ';base64')){
            $payload = $request->all();
  
            $base64 = $request->image;
  
            //Extensão do arquivo
            $extension = explode('/', $base64);
            $str = $extension[61];
            $extension = explode(';', $extension[1]);
            $extension = '.'.$extension[0];

            $name = md5($str .strtotime('now')). $extension;

            //Obtem o arquivo
            $sepatorFile = explode(',', $base64);
            $file = $sepatorFile[1];
            $path = 'public/media/';

            //Envia a imagem
            Storage::put($path.$name, base64_decode($file), 'public');

            $teste = utf8_encode($name);
            $encode = base64_encode($teste);
            
            //Save to DB
            $admin->update([
                'image' => $encode,
            ]);

            $admin->image = $teste;

            // return $this->success($admin, 'Imagem atualizada com sucesso.');
            return response()->json(['user' => $admin, 'message' => 'Imagem atualizada com sucesso.']);
        }
    }
}

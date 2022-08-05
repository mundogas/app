<?php

namespace App\Http\Controllers\Api\_Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PesquisarTokenController extends Controller
{
    public function pesquisarToken(Request $request){
        //Validation
        $request->validate([
            'token' => 'required',
        ]);

        $a = DB::table('password_resets')->where('token', $request->token);
        $b = DB::table('empresa_password_resets')->where('token', $request->token)->union($a);
        $c = DB::table('admin_password_resets')->where('token', $request->token)->union($b)->get();

        if(!$c){
            return response()->json(['error' => 'Token não encontrado'], 401);
        }

        return response()->json($c);

    }

    public function user(Request $request){
        //Validation
        $request->validate([
            'token' => 'required',
        ]);

        $token = DB::table('password_resets')->where('token', $request->token)->first();

        if(!$token){
            return response()->json(['error' => 'Token não encontrado, verifique o e-mail enviado para a sua caixa de entrada.'], 401);
        }

        return response()->json($token);
    }

    public function empresa(Request $request){
        //Validation
        $request->validate([
            'token' => 'required',
        ]);

        $token = DB::table('empresa_password_resets')->where('token', $request->token)->first();

        if(!$token){
            return response()->json(['error' => 'Token não encontrado, verifique o e-mail enviado para a sua caixa de entrada.'], 401);
        }

        return response()->json($token);
    }

    public function admin(Request $request){
        //Validation
        $request->validate([
            'token' => 'required',
        ]);

        $token = DB::table('admin_password_resets')->where('token', $request->token)->first();

        if(!$token){
            return response()->json(['error' => 'Token não encontrado, verifique o e-mail enviado para a sua caixa de entrada.'], 401);
        }

        return response()->json($token);
    }
}
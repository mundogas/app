<?php

namespace App\Http\Controllers\Api\Users\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Api\Auth\Admin\AdminPasswordRequest;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminChangePasswordController extends Controller
{
    public function passwordResetProcess(AdminPasswordRequest $request){
        return $this->updatePasswordRow($request)->count() > 0 ? $this->resetPassword($request) : $this->tokenNotFoundError();
      }

      // Verify if token is valid
      private function updatePasswordRow($request){
         return DB::table('admin_password_resets')->where([
             'email' => $request->email,
             'token' => $request->resetToken
         ]);
      }

      // Token not found response
      private function tokenNotFoundError() {
          return response()->json([
            'error' => 'Seu e-mail ou token estão incorretos.'
          ],Response::HTTP_UNPROCESSABLE_ENTITY);
      }

      // Reset password
      private function resetPassword($request) {
          // find email
          $userData = Admin::whereEmail($request->email)->first();

          // update password
          $request->validate([
            'password' => 'required',
            'password_confirmation' => 'required',
            ]);

          if($request->password != $request->password_confirmation){
            return response()->json([
                'error' => 'As senhas não são iguais.'
              ], 401);
          }
          else if(strlen($request->password) < 8){
            return response()->json(['error' => 'A senha precisa ter no mínimo 8 caracteres.'], 401);
            }
          else{
            $userData->update([
                'password'=>Hash::make($request->password)
              ]);
              // remove verification data from db
              $this->updatePasswordRow($request)->delete();

              // reset password response
              return response()->json([
                'data'=>'A senha foi atualizada.'
              ],Response::HTTP_CREATED);
          }
    }
}
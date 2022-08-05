<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class SanctumAbilitiesCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$abilities)
    {

        $requestToken = $request->header('authorization');
        $personalAccessToken = new PersonalAccessToken();
        $token = $personalAccessToken->findToken(str_replace('Bearer ', '', $requestToken));
        
        foreach ($abilities as $ability) {
            
            //Verifica se a guard e token tem msm valor
            if ($ability != $token->abilities[0]) {
                // abort(400, 'Access denied');

                return response()->json('Acesso negado.', 401);
            }
        }

        return $next($request);
    }
}

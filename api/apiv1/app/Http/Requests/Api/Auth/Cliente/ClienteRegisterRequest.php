<?php

namespace App\Http\Requests\Api\Auth\Cliente;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class ClienteRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:clientes,email',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'required|string',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'O campo nome é obrigatório.',

            'phone.required' => 'O campo celular é obrigatório.',

            'email.required' => 'O campo email é obrigatório.',
            'email.email' => 'O campo precisa ser um e-mail válido.',
            'email.unique' => 'O e-mail já está cadastrado em nossa base de dados.',

            'password.required' => 'O campo senha é obrigatório.',
            'password.min' => 'O campo senha precisa ter no mínimo 8 caracteres',
            'password.confirmed' => 'O campo confirmação de senha precisa ser preenchido.'
        ];
    }

    //Tratando os erros pra enviar em um único array
    public function failedValidation(Validator $validator) {

        foreach ($validator->errors()->messages() as $arrayMessage){
            foreach($arrayMessage as $message){
                $response[] = $message;
            }
        }

        $error['errors'] = $response;

        throw new HttpResponseException(response()->json($error, 422));
    }
}

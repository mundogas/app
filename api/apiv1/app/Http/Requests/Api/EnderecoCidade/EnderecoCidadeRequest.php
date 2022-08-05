<?php

namespace App\Http\Requests\Api\EnderecoCidade;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class EnderecoCidadeRequest extends FormRequest
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
            'cliente_id' => 'required',
            'cidade_id' => 'required',
            'endereco_id' => 'required',
        ];
    }

    public function messages(){
        return [
            'cliente_id.required' => 'O campo usuário é obrigatório.',

            'cidade_id.required' => 'O campo cidade é obrigatório.',

            'endereco_id.required' => 'O campo endereço é obrigatório.',
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

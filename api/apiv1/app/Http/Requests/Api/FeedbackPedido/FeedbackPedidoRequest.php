<?php

namespace App\Http\Requests\Api\FeedbackPedido;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class FeedbackPedidoRequest extends FormRequest
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
            'entregador_id' => 'required',
            'pedido_id' => 'required',
            'stars' => 'required',
           // obs' => 'required',
        ];
    }

    public function messages(){
        return [
            'entregador_id.required' => 'O campo entregador é obrigatório.',

            'pedido.required' => 'O campo pedido é obrigatório.',

            'stars.required' => 'O campo valor stars é obrigatório.'
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

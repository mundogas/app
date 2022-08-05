<?php

namespace App\Http\Requests\Api\ItensPedido;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class ItensPedidoRequest extends FormRequest
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
            'pedido_id' => 'required',
            'produto_id' => 'required',
            'weight_product' => 'required',
            'value' => 'required',
            'qtde' => 'required',
        ];
    }

    public function messages(){
        return [
            'pedido_id.required' => 'O campo pedido é obrigatório.',

            'produto_id.required' => 'O campo produto é obrigatório.',

            'weight_product.required' => 'O campo peso do produto é obrigatório.',

            'value.required' => 'O campo valor é obrigatório.',

            'qtde.required' => 'O campo quantidade é obrigatório.',
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

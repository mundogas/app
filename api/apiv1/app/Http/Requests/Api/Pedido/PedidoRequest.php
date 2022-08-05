<?php

namespace App\Http\Requests\Api\Pedido;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class PedidoRequest extends FormRequest
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
            //'entregador_id' => 'required',
            'endereco_id' => 'required',
            'date_hour' => 'required',
            'total' => 'required',
            'payment_method' => 'required',
            'platform_payment' => 'required',
            'status' => 'required',
            //'dicas' => 'required',
        ];
    }

    public function messages(){
        return [
            'cliente_id.required' => 'O campo cliente é obrigatório.',

            'endereco_id.required' => 'O campo endereco é obrigatório.',

            'date_hour.required' => 'O campo data é obrigatório.',

            'total.required' => 'O campo valor total é obrigatório.',

            'payment_method.required' => 'O campo método de pagamento é obrigatório.',

            'platform_payment.required' => 'O campo plataforma é obrigatório.',

            'status.required' => 'O campo status da entrega é obrigatório.',
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

<?php

namespace App\Http\Requests\Api\ProdutoCidade;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class ProdutoCidadeRequest extends FormRequest
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
            'cidade_id' => 'required',
            //'produto_id' => 'required',
            'sale_price' => 'required',
            //'discount_price' => 'required',
            'promotion' => 'required',
        ];
    }

    public function messages(){
        return [
            'cidade_id.required' => 'O campo cidade é obrigatório.',

            //'produto_id.required' => 'O campo produto é obrigatório.',

            'sale_price.required' => 'O campo preço de venda é obrigatório.',

            //'discount_price.required' => 'O campo preço promocional é obrigatório.',

            'promotion.required' => 'O campo promoção é obrigatório.',

            'ativo.required' => 'O campo situação é obrigatório.',
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

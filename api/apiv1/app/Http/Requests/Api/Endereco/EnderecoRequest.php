<?php

namespace App\Http\Requests\Api\Endereco;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class EnderecoRequest extends FormRequest
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
            'type' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'number' => 'required|max:255',
            'district' => 'required|string|max:255',
            'zipcode' => 'required|max:255',
            'complement' => 'required|string|max:255',
            'cliente_id' => 'required',
        ];
    }

    public function messages(){
        return [
            'name.required' => 'O campo nome é obrigatório.',

            'type.required' => 'O campo situação é obrigatório.',

            'address.required' => 'O campo endereço é obrigatório.',

            'number.required' => 'O campo número é obrigatório.',

            'district.required' => 'O campo bairro é obrigatório.',

            'zipcode.required' => 'O campo cep é obrigatório.',

            'complement.required' => 'O campo complemento é obrigatório.',

            'cliente_id.required' => 'O campo usuário é obrigatório.'
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

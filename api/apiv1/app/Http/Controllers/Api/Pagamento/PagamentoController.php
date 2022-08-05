<?php

namespace App\Http\Controllers\Api\Pagamento;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Traits\ApiResponser;
use Carbon\Carbon;
use GuzzleHttp\Client;

class PagamentoController extends Controller
{
    
    use ApiResponser;
    
    public function picPay(Request $request) {
      
      $now = Carbon::now();
      $expires = $now->addMinutes(1)->toDateTimeString();
     
      $client = new Client();

      $url = 'https://appws.picpay.com/ecommerce/public/payments';

      $referenceID = rand(100000, 999999);

      $order = [
        "referenceId" => $referenceID,
        "callbackUrl" => "http://192.168.0.72:19004/api/callback",
        "returnUrl" => "http://192.168.0.72:19004/api/cliente/picpay/pedido/" .$referenceID,
        "value" => 0.01, //$request->total,
        "expiresAt" =>  $expires, //"2022-05-02T16:00:00-03:00",
        "buyer" => ([
            "firstName" => $request->firstName,
            "lastName" => $request->lastName,
            "document" => $request->cpf,
            "email" => $request->email,
            "phone" => $request->phone
        ])
      ];

      $res = $client->request('POST', $url, [
        'headers' => [
          'x-picpay-token' => env('PICPAY_TOKEN'),
          'Content-Type' => 'application/json',
        ],
        'json' => $order,
      ]);
      
      $return = json_decode($res->getBody());
  
      return response()->json($return);
    }

    public function cancelOrderPicPay(Request $request){
      $url = 'https://appws.picpay.com/ecommerce/public/payments/' .$request->referenceId .'/cancellations';
      
      $client = new Client();
      
      $cancel = [
        'referenceId' => $request->referenceId,
        'authorizationId' => $request->authorizationId
      ];
      
      $res = $client->request('POST', $url, [
        'headers' => [
          'x-picpay-token' => env('PICPAY_TOKEN'),
          'Content-Type' => 'application/json',
        ],
        'json' => $cancel,
      ]);
      
      $return = json_decode($res->getBody());
      return response()->json($return);
    }

    public function callbackPicPay(Request $request){
      //Se tiver authorization ID é porque foi pago.

      $client = new Client();

      $url = 'http://192.168.0.72:19004/api/callback';

      $data = [
        "referenceId" => "638755", 
        "authorizationId" => "555008cef7f321d00ef236333" 
      ];

      $res = $client->request('POST', $url, [
        'headers' => [
          'x-seller-token' => env('PICPAY_SELLER_TOKEN'),
          'Content-Type' => 'application/json',
        ],
        'json' => $data,
      ]);
      
      $return = json_decode($res->getBody());
      return response()->json($return);
    }

    public function returnPedidoPicPay($id){
      dd($id);
    }

    public function statusOrderPicPay($id){
      //Se tiver authorization ID é porque foi pago.

      $client = new Client();
     
      $url = 'https://appws.picpay.com/ecommerce/public/payments/'. $id .'/status';
      
      $res = $client->request('GET', $url, [
        'headers' => [
          'x-picpay-token' => env('PICPAY_TOKEN'),
          'Content-Type' => 'application/json',
        ]
      ]);

      $return = json_decode($res->getBody());
      
      return response()->json($return);
    }
}

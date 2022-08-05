<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;

    protected $fillable = [
        'cliente_id',
        'entregador_id',
        'endereco_id',
        'date_hour',
        'date_hour_entrega',
        'total',
        'payment_method',
        'status',
        'platform_payment',
        'dicas',
    ];

    public function itens(){
        return $this->hasMany(ItensPedido::class, 'pedido_id', 'id')->with('name_produto');
    }

    public function entregador(){
        return $this->belongsTo(Entregador::class, 'entregador_id', 'id')->select('id', 'name');
    }

    public function cliente(){
        return $this->belongsTo(Cliente::class, 'cliente_id', 'id')->select('id', 'name', 'phone');
    }

    public function endereco(){
        return $this->belongsTo(Endereco::class, 'endereco_id', 'id')->with('cidade');
    }

    public function feedback(){
        return $this->hasOne(FeedbackPedido::class, 'pedido_id', 'id');
    }
}

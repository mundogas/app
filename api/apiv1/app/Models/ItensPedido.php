<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItensPedido extends Model
{
    use HasFactory;

    protected $fillable = [
        'pedido_id',
        'produto_id',
        'weight_product',
        'value',
        'qtde'
    ];

    public function name_produto(){
        return $this->belongsTo(Produto::class, 'produto_id', 'id')->select('id', 'name');
    }
}

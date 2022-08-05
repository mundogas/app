<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedbackPedido extends Model
{
    use HasFactory;

    protected $fillable = [
        'pedido_id',
        'entregador_id',
        'stars',
        'obs'
    ];

    public function entregador(){
        return $this->belongsTo(Entregador::class, 'entregador_id', 'id')->select('id', 'name');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Endereco extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', //Para o user, ex. Casa, Trabalho
        'type', //Casa, Apto..
        'address', //Rua Fulano de Tal
        'number', //255, S/N
        'district', //bairro, Centro
        'zipcode', //apenas números
        'complement',
        'cliente_id'
    ];

    public function cidade(){
        return $this->hasOne(EnderecoCidade::class)->select('endereco_id', 'cidade_id')->with('cidade_name');
    }
}

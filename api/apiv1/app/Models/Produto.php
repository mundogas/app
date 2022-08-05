<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produto extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'ativo'
    ];

    public function peso() {
        return $this->hasMany(PesoProduto::class)->select('id', 'produto_id', 'weight');
    }

    public function cidades() {
        return $this->hasMany(ProdutoCidade::class)->with('cidade');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdutoCidade extends Model
{
    use HasFactory;

    protected $fillable = [
        'produto_id',
        'cidade_id',
        'sale_price',
        'discount_price',
        'promotion'
    ];

    public function cidade() {
        return $this->belongsTo(Cidade::class, 'cidade_id', 'id')->select(['id', 'name']);
    }
}

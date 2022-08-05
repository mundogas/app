<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EnderecoCidade extends Model
{
    use HasFactory;

    protected $fillable = [
        'cidade_id',
        'endereco_id',
        'cliente_id'
    ];

    public function cidade_name() {
        return $this->belongsTo(Cidade::class, 'cidade_id', 'id')->select('id', 'name');
    }
}

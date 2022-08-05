<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cidade extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'ativo',
    ];

    public function cidade() {
        return $this->hasMany(Cidade::class, 'cidade_id', 'id');
    }
}

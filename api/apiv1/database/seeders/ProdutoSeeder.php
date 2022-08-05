<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Produto;

class ProdutoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Produto::create([
            "name" => "Gás #01",
            "ativo" => 1
        ]);

        Produto::create([
            "name" => "Gás #02",
            "ativo" => 1
        ]);

        Produto::create([
            "name" => "Gás #03",
            "ativo" => 1
        ]);

        Produto::create([
            "name" => "Gás #04",
            "ativo" => 1
        ]);
    }
}

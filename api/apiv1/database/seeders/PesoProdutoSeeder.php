<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PesoProduto;

class PesoProdutoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PesoProduto::create([
            "produto_id" => 1,
            "weight"  => "5kg",
        ]);

        PesoProduto::create([
            "produto_id" => 1,
            "weight"  => "13kg",
        ]);

        PesoProduto::create([
            "produto_id" => 2,
            "weight"  => "13kg",
        ]);

        PesoProduto::create([
            "produto_id" => 2,
            "weight"  => "20kg",
        ]);

        PesoProduto::create([
            "produto_id" => 3,
            "weight"  => "5kg",
        ]);

        PesoProduto::create([
            "produto_id" => 4,
            "weight"  => "5kg",
        ]);

        PesoProduto::create([
            "produto_id" => 4,
            "weight"  => "13kg",
        ]);

        PesoProduto::create([
            "produto_id" => 4,
            "weight"  => "20kg",
        ]);
    }
}

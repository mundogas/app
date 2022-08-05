<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProdutoCidade;

class ProdutoCidadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ProdutoCidade::create([
            "produto_id" => 1,
            "cidade_id" => 1,
            "sale_price"  => 109.99,
            "discount_price"  => 99.99,
            "promotion"  => 0,
        ]);

        ProdutoCidade::create([
            "produto_id" => 1,
            "cidade_id" => 2,
            "sale_price"  => 129.99,
            "discount_price"  => 129.99,
            "promotion"  => 0,
        ]);

        ProdutoCidade::create([
            "produto_id" => 1,
            "cidade_id" => 3,
            "sale_price"  => 149.99,
            "discount_price"  => 129.99,
            "promotion"  => 0,
        ]);

        // Produto 02
        ProdutoCidade::create([
            "produto_id" => 2,
            "cidade_id" => 1,
            "sale_price"  => 109.99,
            "discount_price"  => 99.99,
            "promotion"  => 0,
        ]);

        ProdutoCidade::create([
            "produto_id" => 2,
            "cidade_id" => 2,
            "sale_price"  => 129.99,
            "discount_price"  => 129.99,
            "promotion"  => 0,
        ]);

        ProdutoCidade::create([
            "produto_id" => 2,
            "cidade_id" => 3,
            "sale_price"  => 149.99,
            "discount_price"  => 129.99,
            "promotion"  => 0,
        ]);

        // Produto 03
        ProdutoCidade::create([
            "produto_id" => 3,
            "cidade_id" => 1,
            "sale_price"  => 109.99,
            "discount_price"  => 99.99,
            "promotion"  => 0,
        ]);

        ProdutoCidade::create([
            "produto_id" => 3,
            "cidade_id" => 2,
            "sale_price"  => 129.99,
            "discount_price"  => 129.99,
            "promotion"  => 0,
        ]);

        ProdutoCidade::create([
            "produto_id" => 3,
            "cidade_id" => 3,
            "sale_price"  => 149.99,
            "discount_price"  => 129.99,
            "promotion"  => 0,
        ]);

        // Produto 04
        ProdutoCidade::create([
            "produto_id" => 4,
            "cidade_id" => 1,
            "sale_price"  => 109.99,
            "discount_price"  => 99.99,
            "promotion"  => 0,
        ]);

        ProdutoCidade::create([
            "produto_id" => 4,
            "cidade_id" => 2,
            "sale_price"  => 129.99,
            "discount_price"  => 129.99,
            "promotion"  => 0,
        ]);

        ProdutoCidade::create([
            "produto_id" => 4,
            "cidade_id" => 3,
            "sale_price"  => 149.99,
            "discount_price"  => 129.99,
            "promotion"  => 0,
        ]);
    }
}

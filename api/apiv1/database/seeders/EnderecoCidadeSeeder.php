<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EnderecoCidade;

class EnderecoCidadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        EnderecoCidade::create([
            'endereco_id' => 3,
            'cidade_id' => 2,
            'cliente_id' => 4
        ]);

        EnderecoCidade::create([
            'endereco_id' => 4,
            'cidade_id' => 1,
            'cliente_id' => 5
        ]);

        EnderecoCidade::create([
            'endereco_id' => 5,
            'cidade_id' => 2,
            'cliente_id' => 6
        ]);

        EnderecoCidade::create([
            'endereco_id' => 6,
            'cidade_id' => 1,
            'cliente_id' => 7
        ]);

        EnderecoCidade::create([
            'endereco_id' => 7,
            'cidade_id' => 2,
            'cliente_id' => 8
        ]);
    }
}

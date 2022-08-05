<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cidade;

class CidadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Cidade::create([
            "name" => "Mongaguá",
            "ativo"  => 1,
        ]);

        Cidade::create([
            "name" => "Praia Grande",
            "ativo"  => 1,
        ]);

        Cidade::create([
            "name" => "São Vicente",
            "ativo"  => 1,
        ]);
    }
}

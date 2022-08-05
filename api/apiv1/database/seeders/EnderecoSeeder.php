<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Endereco;

class EnderecoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Endereco::create([
            "name" => "Casa",
            "type"  => "Casa",
            "address"  => "Av Marechal Deodoro",
            "number"  => "785",
            "district"  => "Centro",
            "complement"  => "Esquina",
            "zipcode"  => "02150-100",
            "cliente_id"  => 4,
        ]);

        Endereco::create([
            "name" => "Escritório",
            "type"  => "Apto",
            "address"  => "Rua Joaquim Dias",
            "number"  => "215",
            "district"  => "Centro",
            "complement"  => "Apto 1001",
            "zipcode"  => "02030-250",
            "cliente_id"  => 5,
        ]);

        Endereco::create([
            "name" => "Casa",
            "type"  => "Casa",
            "address"  => "Rua João Ramalho",
            "number"  => "145",
            "district"  => "Centro",
            "complement"  => "Esquina",
            "zipcode"  => "02150-100",
            "cliente_id"  => 6,
        ]);

        Endereco::create([
            "name" => "Escritório",
            "type"  => "Apto",
            "address"  => "Rua Padre Anchieta",
            "number"  => "95",
            "district"  => "Centro",
            "complement"  => "Apto 1001",
            "zipcode"  => "02030-250",
            "cliente_id"  => 7,
        ]);

        Endereco::create([
            "name" => "Escritório",
            "type"  => "Apto",
            "address"  => "Rua José Bonifácio",
            "number"  => "232",
            "district"  => "Centro",
            "complement"  => "Apto 1001",
            "zipcode"  => "02030-250",
            "cliente_id"  => 8,
        ]);
    }
}

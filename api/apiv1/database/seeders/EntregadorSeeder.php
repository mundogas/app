<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Entregador;
use Illuminate\Support\Facades\Hash;

class EntregadorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Entregador::create([
            "name" => "José Silva",
            'email' => 'jose@mundodogas.com.br',
            'password' => Hash::make('12345678'),
        ]);

        Entregador::create([
            "name" => "Emanuel Afonso",
            'email' => 'emanuel@mundodogas.com.br',
            'password' => Hash::make('12345678'),
        ]);

        Entregador::create([
            "name" => "Carlos Gomes",
            'email' => 'carlos@mundodogas.com.br',
            'password' => Hash::make('12345678'),
        ]);

        Entregador::create([
            "name" => "Pedro Moreira",
            'email' => 'pedro@mundodogas.com.br',
            'password' => Hash::make('12345678'),
        ]);

        Entregador::create([
            "name" => "Joaquim Teixeira",
            'email' => 'joaquim@mundodogas.com.br',
            'password' => Hash::make('12345678'),
        ]);
    }
}

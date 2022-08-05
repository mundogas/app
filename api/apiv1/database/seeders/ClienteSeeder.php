<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cliente;
use Illuminate\Support\Facades\Hash;

class ClienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Cliente::create([
            "name" => "Mayara Nogueira",
            'email' => 'cliente1@gmail.com',
            'phone' => '(13)9999-9999',
            'password' => Hash::make('12345678'),
        ]);

        Cliente::create([
            "name" => "Roberto Afondo",
            'email' => 'cliente2@gmail.com',
            'phone' => '(13)9999-9999',
            'password' => Hash::make('12345678'),
        ]);

        Cliente::create([
            "name" => "Henrique Gomes",
            'email' => 'cliente3@gmail.com',
            'phone' => '(13)9999-9999',
            'password' => Hash::make('12345678'),
        ]);

        Cliente::create([
            "name" => "José Pedro Moreira",
            'email' => 'cliente4@gmail.com',
            'phone' => '(13)9999-9999',
            'password' => Hash::make('12345678'),
        ]);

        Cliente::create([
            "name" => "Vitor Teixeira",
            'email' => 'cliente5@gmail.com',
            'phone' => '(13)9999-9999',
            'password' => Hash::make('12345678'),
        ]);
    }
}

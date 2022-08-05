<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Admin::create([
            'name' => 'Wendes Freitas',
            'email' => 'adm@mundodogas.com.br',
            'password' => Hash::make('12345678'),
        ]);
    }
}

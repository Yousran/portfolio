<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'yousranmz',
            'email' => 'yusranmazidan@gmail.com',
            'password' => '123456789',
        ]);
        $this->call(WorksCategoryTableSeeder::class);
        $this->call(WorksTableSeeder::class);
        $this->call(EducationsTableSeeder::class);
    }
}

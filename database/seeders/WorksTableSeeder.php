<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WorksTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('works')->insert([
            [
                'title' => 'Project 1',
                'category_id' => 1,  // Pastikan ID kategori ini ada di tabel categories
                'desc' => 'Description for Project 1',
                'link' => 'http://example.com',
                'photo' => 'card.jpg',
                'show' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Project 2',
                'category_id' => 2,  // Pastikan ID kategori ini ada di tabel categories
                'desc' => 'Description for Project 2',
                'link' => 'http://example.com',
                'photo' => 'cat.webp',
                'show' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Project 1',
                'category_id' => 4,  // Pastikan ID kategori ini ada di tabel categories
                'desc' => 'Description for Project 1',
                'link' => 'http://example.com',
                'photo' => 'card.jpg',
                'show' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Kucing',
                'category_id' => 2,  // Pastikan ID kategori ini ada di tabel categories
                'desc' => 'Description for Project 2',
                'link' => '',
                'photo' => 'cat.webp',
                'show' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Project 1',
                'category_id' => 1,  // Pastikan ID kategori ini ada di tabel categories
                'desc' => 'Description for Project 1',
                'link' => '',
                'photo' => 'card.jpg',
                'show' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'title' => 'Project 2',
                'category_id' => 2,  // Pastikan ID kategori ini ada di tabel categories
                'desc' => 'Description for Project 2',
                'link' => 'http://example.com',
                'photo' => 'cat.webp',
                'show' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            // Tambahkan lebih banyak entri sesuai kebutuhan
        ]);
    }
}

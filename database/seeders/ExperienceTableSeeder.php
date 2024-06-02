<?php

namespace Database\Seeders;

use App\Models\Experience;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ExperienceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('experiences')->insert([
            [
                'title' => 'TVRI SULAWESI BARAT',
                'time' => 'September 2021 - December 2021',
                'desc' => 'Mengikuti Program Magang di Stasiun siaran TVRI Sulawesi Barat sebagai assitant video switcher ',
                'link' => null,
                'photo' => 'TVRISulawesiBarat.png',
                'show' => 1,
            ],
            [
                'title' => 'CV. METRONIX MAKASSAR UTAMA',
                'time' => '2022',
                'desc' => 'Mengikuti Program Magang di CV.Metronix Makassar Utama',
                'link' => null,
                'photo' => 'CVMetronix.png',
                'show' => 1,
            ],
            [
                'title' => 'LKP YP.CIPTA MANDIRI',
                'time' => '2022',
                'desc' => 'Bekerja sebagai Instruktur Komputer di LKP YP.Cipta Mandiri',
                'link' => null,
                'photo' => 'LogoCiptaMandiri.jpg',
                'show' => 1,
            ],
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EducationsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('educations')->insert([
            [
                'title' => 'SMKN 1 RANGAS MAMUJU',
                'time' => '2019-2022',
                'desc' => 'Jurusan Multimedia dengan empat bidang kompetensi yaitu desain grafis, percetakan, pengolahan audio & video',
                'link' => null,
                'photo' => 'LogoSMKN1Rangas.png',
                'show' => 1,
            ],
            [
                'title' => 'UNIVERSITAS NEGERI MAKASSAR',
                'time' => '2022-Sekarang',
                'desc' => 'Jurusan Teknik Informatika dan Komputer',
                'link' => null,
                'photo' => 'LogoResmiUNM.png',
                'show' => 1,
            ],
        ]);
    }
}

<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WorksCategoryTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('work_categories')->insert([
            [
                'category_name' => 'Code',
                'category_icon' => 'bx-code-alt',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'category_name' => 'Graphic',
                'category_icon' => 'bx-paint',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'category_name' => 'Blender',
                'category_icon' => 'bxl-blender',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'category_name' => 'Unity',
                'category_icon' => 'bxl-unity',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ],
            [
                'category_name' => 'Video',
                'category_icon' => 'bx-movie',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        ]);
    }
}

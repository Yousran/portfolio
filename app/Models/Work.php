<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Work extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = ['title', 'category_id', 'desc', 'link', 'photo', 'show'];

    public function category()
    {
        return $this->belongsTo(WorkCategory::class, 'category_id', 'id');
    }
}
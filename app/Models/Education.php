<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasFactory;

    protected $table = 'educations'; 
    protected $primaryKey = 'id'; 
    protected $fillable = ['title', 'time', 'desc', 'link', 'photo', 'show'];
    
}

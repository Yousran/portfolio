<?php

namespace App\Http\Controllers;

use App\Models\Work;
use Illuminate\Http\Request;

class WorkController extends Controller
{
    public function index() {
        $works = Work::with('category')->where('show', true)->get();
        return view('pages.Works', ['works' => $works]);
    }
}


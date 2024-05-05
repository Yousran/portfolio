<?php

namespace App\Http\Controllers;

use App\Models\Work;
use App\Models\WorkCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WorkController extends Controller
{
    public function index() {
        $works = Work::with('category')->where('show', true)->get();
        $categories = WorkCategory::all();
        return view('pages.Works', ['works' => $works,'categories' => $categories]);
    }


    public function store(Request $request)
    {
        $work = new Work;
        $work->title = $request->title;
        $work->category_id = $request->category_id;  // Pastikan ini ditetapkan
        $work->desc = $request->desc;
        $work->link = $request->link;
        $work->photo = isset($path) ? $path : null;
        $work->show = isset($request->show) ? '1' : '0';
        
        
        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $filename = time() . '_' . $file->getClientOriginalName();
            $destinationPath = public_path('/img'); 
        
            $file->move($destinationPath, $filename);
        
            $work->photo = $filename;
            $work->save();
        
            Log::info('Photo added successfully: ' . $work->photo);
        } else {
            Log::warning('No file selected or file upload failed.');
        }        
        $work->save();
        
        if ($work->save()) {
            Log::info('Work created successfully', ['id' => $work->id]);
            return redirect()->route('works.index')->with('success', 'Work added successfully.');
        } else {
            Log::warning('Failed to create work');
            return back()->with('error', 'Failed to add work');
        }
    }


}


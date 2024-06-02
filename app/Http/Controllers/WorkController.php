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
    public function indexAdmin() {
        $works = Work::with('category')->get();
        $categories = WorkCategory::all();
        return view('pages.Works', ['works' => $works,'categories' => $categories]);
    }

    public function editShow($id, Request $request) {
        $work = Work::findOrFail($id);
        $work->show = $request->show;
        $work->save();
    
        return response()->json(['success' => true]);
    }
    
    public function store(Request $request){
        $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:work_categories,id',
            'desc' => 'nullable|string',
            'link' => 'nullable|url',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp,bmp,ico|max:2048',  // Add additional image formats
            'show' => 'nullable|boolean'
        ]);

        $work = new Work;
        $work->title = $request->title;
        $work->category_id = $request->category_id;
        $work->desc = $request->desc;
        $work->link = $request->link;
        $work->show = $request->input('show') === '1' ? 1 : 0;

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $filename = time() . '_' . $file->getClientOriginalName();
            $destinationPath = public_path('/img');
            $file->move($destinationPath, $filename);
            $work->photo = $filename;
            Log::info('Photo added successfully: ' . $work->photo);
        } else {
            Log::warning('No file selected or file upload failed.');
        }

        if ($work->save()) {
            Log::info('Work created successfully', ['id' => $work->id]);
            return redirect()->route('works.indexAdmin')->with('success', 'Work added successfully.');
        } else {
            Log::warning('Failed to create work');
            return back()->with('error', 'Failed to add work');
        }
    }
}
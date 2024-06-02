<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Education;
use Illuminate\Support\Facades\Log;

class EducationController extends Controller
{
    public function index()
    {
        $educations = Education::where('show', 1)->get();
        return view('pages.Educations', compact('educations'));
    }
    public function indexAdmin() {
        $educations = Education::get();
        return view('pages.Educations', compact('educations'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'time' => 'required',
            'desc' => 'required|string|max:65535',
            'link' => 'nullable|url',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp,bmp,ico|max:2048',
            'show' => 'nullable|boolean'
        ]);

        $education = new Education;
        $education->title = $request->title;
        $education->time = $request->time;
        $education->desc = $request->desc;
        $education->link = $request->link;
        $education->show = $request->input('show') === '1' ? 1 : 0;

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $filename = time() . '_' . $file->getClientOriginalName();
            $destinationPath = public_path('/img');
            $file->move($destinationPath, $filename);
            $education->photo = $filename;
            Log::info('Photo added successfully: ' . $education->photo);
        } else {
            Log::warning('No file selected or file upload failed.');
        }

        if ($education->save()) {
            Log::info('Education created successfully', ['id' => $education->id]);
            return redirect()->route('educations.indexAdmin')->with('success', 'Education added successfully.');
        } else {
            Log::warning('Failed to create education');
            return back()->with('error', 'Failed to add education');
        }
    }

    public function editShow($id, Request $request) {
        $work = Education::findOrFail($id);
        $work->show = $request->show;
        $work->save();
    
        return response()->json(['success' => true]);
    }
}

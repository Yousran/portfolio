<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ExperienceController extends Controller
{
    public function index()
    {
        $experiences = Experience::where('show', 1)->get();
        return view('pages.Experiences', compact('experiences'));
    }

    public function indexAdmin()
    {
        $experiences = Experience::get();
        return view('pages.Experiences', compact('experiences'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'time' => 'required',
            'desc' => 'nullable|string|max:65535',
            'link' => 'nullable|url',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp,bmp,ico|max:2048',
            'show' => 'nullable|boolean'
        ]);

        $experience = new Experience;
        $experience->title = $request->title;
        $experience->time = $request->time;
        $experience->desc = $request->desc;
        $experience->link = $request->link;
        $experience->show = $request->input('show') === '1' ? 1 : 0;

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $filename = time() . '_' . $file->getClientOriginalName();
            $destinationPath = public_path('/img');
            $file->move($destinationPath, $filename);
            $experience->photo = $filename;
            Log::info('Photo added successfully: ' . $experience->photo);
        } else {
            Log::warning('No file selected or file upload failed.');
        }

        if ($experience->save()) {
            Log::info('Experience created successfully', ['id' => $experience->id]);
            return redirect()->route('experiences.indexAdmin')->with('success', 'Experience added successfully.');
        } else {
            Log::warning('Failed to create experience');
            return back()->with('error', 'Failed to add experience');
        }
    }

    public function editShow($id, Request $request)
    {
        $experience = Experience::findOrFail($id);
        $experience->show = $request->show;
        $experience->save();
    
        return response()->json(['success' => true]);
    }
}

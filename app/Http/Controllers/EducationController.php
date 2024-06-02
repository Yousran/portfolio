<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Education;

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
            'title' => 'required|max:255',
            'time' => 'required',
            'desc' => 'nullable|max:65535',
            'link' => 'nullable|url',
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp,bmp,ico|max:2048',
            'show' => 'nullable|boolean'
        ]);

        $photoPath = $request->file('photo')->store('photos', 'public');

        Education::create([
            'title' => $request->title,
            'time' => $request->time,
            'desc' => $request->desc,
            'link' => $request->link,
            'photo' => $photoPath,
            'show' => $request->has('show')
        ]);

        return redirect()->route('educations.index')->with('success', 'Education added successfully.');
    }

    public function editShow($id, Request $request) {
        $work = Education::findOrFail($id);
        $work->show = $request->show;
        $work->save();
    
        return response()->json(['success' => true]);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    // Menampilkan form login
    public function showLoginForm()
    {
        return view('pages.Login');
    }

    // Handle proses login
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials, $request->remember)) {
            $request->session()->regenerate();

            return dd(session());
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::logout();  // Menghapus autentikasi user dari session

        $request->session()->invalidate();  // Menghapus semua data session
        $request->session()->regenerateToken();  // Regenerasi CSRF token

        return dd(session());  // Redirect user ke halaman awal atau halaman login
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

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
        // Validasi input dari user
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Cari user berdasarkan email
        $user = User::where('email', $request->email)->first();

        // Periksa apakah user ditemukan dan password valid
        if ($user && Hash::check($request->password, $user->password)) {
            Log::info('Session ID before login: ' . session()->getId());
            Auth::login($user, $request->has('remember'));
            request()->session()->regenerate();
            Log::info('Session ID after login: ' . session()->getId());
            Log::info('User logged in: ', ['id' => Auth::id(),'user'=>Auth::user()]);
            Log::debug('Session Attributes:', session()->all());

            return redirect()->intended(route('dashboard.index')); 
        }

        // Jika autentikasi gagal, kirim kembali ke halaman login dengan pesan error
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

<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\WorkController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/works', [WorkController::class, 'index'])->name('works.index')->middleware('auth.session');
Route::post('/works/store', [WorkController::class, 'store'])->name('works.store');
Route::get('login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('login', [LoginController::class, 'login']);
Route::post('logout', [LoginController::class, 'logout'])->name('logout');
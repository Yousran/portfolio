<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\WorkController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::prefix('/')->name('dashboard.')->controller(DashboardController::class)->group(function () {
    Route::get('/', 'index')->name('index');
});
Route::prefix('works')->name('works.')->controller(WorkController::class)->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/admin', 'indexadmin')->name('indexAdmin');
    Route::post('/toggle/{id}', 'editShow')->name('editShow');
    Route::post('/store', 'store')->name('store');
});
Route::controller(LoginController::class)->group(function () {
    Route::get('login', 'showLoginForm')->name('login');
    Route::get('dd', function(){
        return dd(session());
    })->name('dd');
    Route::post('login', 'login');
    Route::post('logout', 'logout')->name('logout');
});
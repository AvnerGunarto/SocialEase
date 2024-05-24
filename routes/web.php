<?php

use App\Http\Controllers\PostScheduleController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\EnsurePaymentInfoInput;
use App\Models\PostSchedule;
use App\Models\SocialAccount;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     $postSchedules = PostSchedule::with('user:id, name')->latest()->get();
//     $social_accounts = SocialAccount::where('user_id', Auth::id())->orderBy('social_media_type')->get();
//     return Inertia::render('Dashboard', [
//         'postSchedules' => $postSchedules,
//         'socialAccounts' => $social_accounts,
//     ]);
// })->middleware(['auth', 'verified', EnsurePaymentInfoInput::class])->name('dashboard');

Route::get('/dashboard', [PostScheduleController::class, 'index'])->middleware(['auth', 'verified', EnsurePaymentInfoInput::class])->name('dashboard');

Route::post('/dashboard', [PostScheduleController::class, 'store'])->middleware(['auth', 'verified', EnsurePaymentInfoInput::class])->name('dashboard.store');

Route::put('/dashboard/{postSchedule}', [PostScheduleController::class, 'update'])->middleware(['auth', 'verified', EnsurePaymentInfoInput::class])->name('dashboard.update');

Route::patch('/dashboard/{postSchedule}', [PostScheduleController::class, 'update'])->middleware(['auth', 'verified', EnsurePaymentInfoInput::class])->name('dashboard.update');

Route::delete('/dashboard/{postSchedule}', [PostScheduleController::class, 'destroy'])->middleware(['auth', 'verified', EnsurePaymentInfoInput::class])->name('dashboard.destroy');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

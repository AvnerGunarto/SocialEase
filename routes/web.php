<?php

use App\Http\Controllers\PostScheduleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SocialAccountController;
use App\Http\Middleware\EnsurePaymentInfoInput;
use App\Models\PostSchedule;
use App\Models\SocialAccount;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\AnalyticsController;





Route::get('profile/tumblr', function () {
    return Socialite::driver('tumblr')->redirect();
})->middleware(['auth', 'verified', EnsurePaymentInfoInput::class]);

Route::get('profile/tumblr/callback', function () {
    $user = Socialite::driver('tumblr')->user();
    $token = $user->token;
    $tokenSecret = $user->tokenSecret;
    $client = new Tumblr\API\Client(env('TUMBLR_CLIENT_ID'), env('TUMBLR_CLIENT_SECRET'));
    $client->setToken($token, $tokenSecret);
    $blogName = '';

    foreach ($client->getUserInfo()->user->blogs as $blog) {
        if ($blog->primary) {
            $blogName = $blog->name;
            break;
        }
    }
    $account = SocialAccount::updateOrCreate([
        'user_id' => Auth::id(),
        'social_media_type' => 'tumblr',
        'social_media_name' => $blogName,
        'api_token' => $token,
        'api_token_secret' => $tokenSecret,

    ]);

    return redirect()->route('profile.edit');
})->middleware(['auth', 'verified', EnsurePaymentInfoInput::class]);

Route::resource('socialAccount', SocialAccountController::class)->middleware(['auth', 'verified', EnsurePaymentInfoInput::class]);

Route::get('/post-history', [PostScheduleController::class, 'showHistory'])->middleware(['auth', 'verified', EnsurePaymentInfoInput::class])->name('socialAccount.showHistory');

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

Route::middleware(['auth', EnsurePaymentInfoInput::class])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/analytics', function() {
    return Inertia::render('Analytics');
} )->middleware(['auth', 'verified', EnsurePaymentInfoInput::class])->name('analytics');


Route::get('/api/tumblr/posts', [AnalyticsController::class, 'getTumblrPosts']);


Route::get('/tumblr/posts', [AnalyticsController::class, 'getTumblrPosts']);

// Route::get('/', function () {
//     return file_get_contents(public_path('index.html'));
// });


require __DIR__ . '/auth.php';

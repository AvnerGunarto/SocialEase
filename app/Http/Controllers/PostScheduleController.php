<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\PostSchedule;
use App\Models\SocialAccount;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class PostScheduleController extends Controller
{

    public function index(): Response
    {
        $postSchedules = PostSchedule::where('user_id',Auth::id())->latest()->get();
        $social_accounts = SocialAccount::where('user_id', Auth::id())->orderBy('social_media_type')->get();
        return Inertia::render('Dashboard', [
            'postSchedules' => $postSchedules,
            'socialAccounts' => $social_accounts,
        ]);
    }

    public function create()
    {
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'body' => 'required|string',
            'social_account' => 'required',
            'post_title' => 'required|string',
            'post_date' => 'required|date|after:today',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $image = null;
        if ($request->file('image') !== null) {
            $image = $request->file('image')->store('images');
        }

        $postSchedule = PostSchedule::create([
            'user_id' => Auth::id(),
            'title' => $request->post_title,
            'body' => $request->body,
            'post_date' => $request->post_date,
            'image' => $image,
        ]);

        foreach ($request->social_account as $social_account) {
            $postSchedule->socialAccount()->attach($social_account);
        }

        return redirect()->route('dashboard');
    }

    public function edit(PostSchedule $postSchedule)
    {

    }

    public function update(Request $request, PostSchedule $postSchedule): RedirectResponse
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'publish_at' => 'required',
        ]);

        $postSchedule->update($request->all());

        return redirect()->route('dashboard');
    }

    public function destroy(PostSchedule $postSchedule): RedirectResponse
    {
        $postSchedule->delete();

        return redirect()->route('dashboard');
    }


}

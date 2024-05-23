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
        $postSchedules = PostSchedule::with('user:id, name')->latest()->get();
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
            'title' => 'required',
            'content' => 'required',
            'publish_at' => 'required',
        ]);

        PostSchedule::create($request->all());

        return redirect()->route('post-schedule.index');
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

        return redirect()->route('post-schedule.index');
    }

    public function destroy(PostSchedule $postSchedule): RedirectResponse
    {
        $postSchedule->delete();

        return redirect()->route('post-schedule.index');
    }


}

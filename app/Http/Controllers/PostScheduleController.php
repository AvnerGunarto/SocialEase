<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\PostSchedule;
use Illuminate\Http\RedirectResponse;

class PostScheduleController extends Controller
{

    public function index(): Response
    {
        $postSchedules = PostSchedule::with('user:id, name')->latest->get;
        return Inertia::render('PostSchedule/Index', [
            'postSchedules' => $postSchedules
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('PostSchedule/Create');
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

    public function edit(PostSchedule $postSchedule): Response
    {
        return Inertia::render('PostSchedule/Edit', [
            'postSchedule' => $postSchedule
        ]);
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

    public function show(PostSchedule $postSchedule): Response
    {
        return Inertia::render('PostSchedule/Show', [
            'postSchedule' => $postSchedule
        ]);
    }

}

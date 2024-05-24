<?php

namespace App\Http\Controllers;

use App\Models\SocialAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tumblr;

class SocialAccountController extends Controller
{

    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SocialAccount $socialAccount)
    {

        $request->validate([
            'social_media_name' => 'required|string|max:255',
        ]);
        $socialAccount->update($request->all());
        return redirect()->route('profile.edit');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SocialAccount $socialAccount)
    {
        $socialAccount->delete();
        return redirect()->route('profile.edit');
    }
}

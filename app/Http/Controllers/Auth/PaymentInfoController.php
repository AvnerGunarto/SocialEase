<?php

namespace App\Http\Controllers\Auth;

use App\Models\PaymentInfo;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class PaymentInfoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (PaymentInfo::where('user_id', Auth::id())->exists()) {
            return redirect(route('dashboard', absolute: false));
        }

        return Inertia::render('Auth/RegisterPaymentInfo');
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) : RedirectResponse
    {
        $request->validate([
            'card_number' => 'required|numeric|digits:16',
            'address' => 'required|string|max:255',
            'cvv' => 'required|numeric|digits:3',
            'expiry_date' => 'required|date_format:m-y',
        ]);

        PaymentInfo::create([
            'user_id' => Auth::id(),
            'card_number' => Hash::make($request->card_number),
            'address' => $request->address,
            'cvv' => Hash::make($request->cvv),
            'expiry_date' => Hash::make($request->expiry_date),
        ]);

        return redirect(route('dashboard', absolute: false));
    }

    /**
     * Display the specified resource.
     */
    public function show(PaymentInfo $paymentInfo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PaymentInfo $paymentInfo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PaymentInfo $paymentInfo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PaymentInfo $paymentInfo)
    {
        //
    }
}

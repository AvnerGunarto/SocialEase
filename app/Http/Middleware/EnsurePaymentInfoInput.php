<?php

namespace App\Http\Middleware;

use App\Models\PaymentInfo;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsurePaymentInfoInput
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(PaymentInfo::where('user_id', Auth::id())->exists()) {

            return $next($request);
        }
        return redirect('register/payment');
    }
}

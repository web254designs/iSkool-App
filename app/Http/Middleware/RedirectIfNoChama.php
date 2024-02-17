<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class RedirectIfNoChama
{
    public function handle($request, Closure $next)
    {
        $user = Auth::user();

        // Check if the user is not in any Chama groups
        if ($user && $user->chamaGroups()->count() === 0) {
            return redirect()->route('select-group');
        }

        return $next($request);
    }
}

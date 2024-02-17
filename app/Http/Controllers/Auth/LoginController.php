<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;

class LoginController extends Controller
{
    // Show the login form
    public function showLoginForm()
    {
        return Inertia::render('Login');
    }

    // Handle the login form submission
    public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        $user = Auth::user();
        $roles = $user->roles->pluck('role_name')->toArray();

        if (in_array('admin', $roles)) {
            return redirect('/admin/dashboard');
        } elseif (in_array('teacher', $roles)) {
            return redirect('/teacher/dashboard');
        } elseif (in_array('student', $roles)) {
            return redirect('/student/dashboard');
        } elseif (in_array('parent', $roles)) {
            return redirect('/parent/dashboard');
        } else {
            return redirect('/set-role');
        }
    }

    throw ValidationException::withMessages([
        'email' => [trans('auth.failed')],
    ]);
}
}

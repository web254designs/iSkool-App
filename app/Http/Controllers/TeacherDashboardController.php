<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TeacherDashboardController extends Controller
{
    public function index()
{
    try {
        // Check if the user is authenticated
        if (Auth::check()) {
            // Retrieve the authenticated user
            $user = Auth::user();

            // Retrieve upcoming events, assignments, announcements, etc.
            $announcements = Announcement::where('user_id', $user->id)->get();

            return Inertia::render('StudentDashboard', [
                'user' => $user,
                'announcements' => $announcements,
            ]);
        } else {
            // Handle the case where the user is not authenticated
            return response()->json(['error' => 'User not authenticated'], 401);
        }
    } catch (\Exception $e) {
        // Log the error or handle it accordingly
        return response()->json(['error' => 'Internal Server Error'], 500);
    }
}

}

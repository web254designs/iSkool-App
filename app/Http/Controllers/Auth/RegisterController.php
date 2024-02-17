<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use App\Models\Role;
use App\Models\Guardian;
use App\Models\Student;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;

class RegisterController extends Controller
{
    // Show the registration form
    public function showRegistrationForm(Request $request)
    {

        // Default to regular registration form
        return Inertia::render('Register');
    }

    // Show the registration form
    public function showStudentRegistrationForm(Request $request)
    {

        // Default to regular registration form
        return Inertia::render('StudentRegister');
    }

    // Show the registration form
    public function showTeacherRegistrationForm(Request $request)
    {

        // Default to regular registration form
        return Inertia::render('TeacherRegister');
    }

    // Show the registration form
    public function showParentRegistrationForm(Request $request)
    {

        // Default to regular registration form
        return Inertia::render('ParentRegister');
    }

    // Handle the registration form submission
    public function register(Request $request)
    {
        // Validate user input
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role' => ['required', 'string', 'in:student,teacher,parent'],
            'phone_number' => ['string'],
            'gender' => ['string', 'in:male,female,other'],
            'grade' => ['string'],
            'birthdate' => ['string'],
        ]);

        // Create a new user
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'role' => $request->input('role'),
            'phone_number' => $request->input('phone_number'),
            'gender' => $request->input('gender'),
            'grade' => $request->input('grade'),
            'birthdate' => $request->input('birthdate'),
        ]);

        // Assign Roles to User
        $roles = $this->getRoleIds($request->input('role'));
        $user->roles()->attach($roles);

        // If the user role is 'parent', create a corresponding record in the guardians table
        if ($user->role === 'parent') {
            // Laravel automatically handles the morph relationship, so no need to manually associate
            Guardian::create([
                'name' => $user->name,
                'email' => $user->email,
                'phone_number' => $user->phone_number,
                'gender' => $user->gender,
            ]);
        }

        // If the user role is 'parent', create a corresponding record in the guardians table
        if ($user->role === 'student') {
            // Laravel automatically handles the morph relationship, so no need to manually associate
            Student::create([
                'name' => $user->name,
                'gender' => $user->gender,
                'grade' => $user->grade,
                'birthdate' => $user->birthdate,
            ]);
        }

        // Log in the newly registered user
        Auth::login($user);

        // Redirect to the appropriate dashboard based on the user's role
        return redirect($this->redirectTo($user->role));
    }


    // Helper function to get role IDs based on role names
    private function getRoleIds($roleName)
    {
        // Assuming you have a Role model and a roles table
        // Adjust this based on your actual implementation
        $roleIds = Role::whereIn('role_name', explode(',', $roleName))->pluck('id')->toArray();

        return $roleIds;
    }

    // Determine the redirect path based on the user's role
    protected function redirectTo($role)
    {
        return match ($role) {
            'student' => '/student/dashboard',
            'teacher' => '/teacher/dashboard',
            'parent' => '/parent/dashboard',
            default => '/login', // Default to login for unknown roles
        };
    }
}

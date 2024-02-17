<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\ChamaGroupsController;
use App\Http\Controllers\StudentDashboardController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/images/{filename}', function ($filename) {
    $path = public_path('images/' . $filename);
    if (file_exists($path)) {
        return response()->file($path);
    } else {
        abort(404);
    }
})->where('filename', '.*');


Route::get('/', function () {
    $user = Auth::user(); // Retrieve the authenticated user
    $canLogin = $user ? false : true; // Adjust based on your authentication logic
    $appName = 'CBC School App'; // Provide Chama name
    $groupsCount = 100; // Provide the count of members dynamically

    return Inertia::render('Welcome', [
        'canLogin' => $canLogin,
        'user' => $user,
        'appName' => $appName,
        'groupsCount' => $groupsCount,
    ]);
});

Route::get('/dashboard', function () {
    $user = Auth::user(); // Retrieve the authenticated user
    $appName = 'CBC School App'; // Provide Chama name

    return Inertia::render('Dashboard', [
        'user' => $user,
        'appName' => $appName,
    ]);
})->middleware('auth');

// Route to show the login form
Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');

// Route to handle the login form submission
Route::post('/login', [LoginController::class, 'login']);

// Route to show the registration form
Route::get('/register', [RegisterController::class, 'showRegistrationForm'])->name('register');

// Route to handle the registration form submission
Route::post('/register', [RegisterController::class, 'register']);

// Register routes for different roles
Route::get('/register/student', [RegisterController::class, 'showStudentRegistrationForm'])->name('register.student');
Route::post('/register/student', [RegisterController::class, 'registerStudent']);

Route::get('/register/teacher', [RegisterController::class, 'showTeacherRegistrationForm'])->name('register.teacher');
Route::post('/register/teacher', [RegisterController::class, 'registerTeacher']);

Route::get('/register/parent', [RegisterController::class, 'showParentRegistrationForm'])->name('register.parent');
Route::post('/register/parent', [RegisterController::class, 'registerParent']);


// Add a route for the SelectGroup page
Route::get('/select-group', [ChamaGroupsController::class, 'selectGroup'])->middleware('noChama')->name('select-group');

Route::inertia('/transactions', 'Transactions');

Route::inertia('/members', 'Members');

Route::inertia('/messages', 'Messages');

Route::inertia('/class-management', 'ClassManagement');

Route::inertia('/subject-management', 'SubjectManagement');

Route::inertia('/student-profile', 'StudentProfile');

Route::inertia('/student/dashboard', 'StudentDashboard')
    ->name('student.dashboard')
    ->middleware(['auth:sanctum']);

    Route::inertia('/parent/dashboard', 'ParentDashboard')
    ->name('parent.dashboard')
    ->middleware(['auth:sanctum']);

    Route::inertia('/teacher/dashboard', 'TeacherDashboard')
    ->name('teacher.dashboard')
    ->middleware(['auth:sanctum']);

Route::inertia('/teacher-profile', 'TeacherProfile');

Route::inertia('/assessment-and-grading', 'AssessmentGrading');

Route::inertia('/resources-and-materials', 'ResourcesMaterials');

Route::inertia('/events-and-announcements', 'EventsAnnouncements');

Route::inertia('/profile-management', 'ProfileManagement', [
    'user' => function () {
        // Retrieve the authenticated user using Auth::user()
        $user = Auth::user();

        // Return the user data
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            // Add other user-related data as needed
        ];
    },
])->middleware(['auth']);

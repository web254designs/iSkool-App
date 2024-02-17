<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StudentDashboardController;
use App\Http\Controllers\ParentDashboardController;
use App\Http\Controllers\TeacherDashboardController;
use App\Http\Controllers\TeacherCommunicationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AssignmentController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/get-user', [UserController::class, 'getUser'])
->middleware(['web']);

Route::get('/get-responses/{childId}', [TeacherCommunicationController::class, 'getResponses']);

Route::post('/send-response', [TeacherCommunicationController::class, 'sendResponse'])
->middleware(['web']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/student/dashboard', [StudentDashboardController::class, 'index'])
    ->middleware(['web']);

    Route::get('/teacher/dashboard', [TeacherDashboardController::class, 'index'])
    ->middleware(['web']);

    Route::get('/parent/dashboard', [ParentDashboardController::class, 'index'])
    ->middleware(['web']);

    Route::patch('/update-assignment-status/{assignmentId}', [AssignmentController::class, 'updateStatus'])
    ->middleware(['web']);

    Route::middleware('auth:sanctum')->group(function () {


    });

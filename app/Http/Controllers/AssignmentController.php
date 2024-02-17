<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use Illuminate\Http\Request;

class AssignmentController extends Controller
{
    public function updateStatus(Request $request, $assignmentId)
{
    try {
        // Validate the request data as needed
        $request->validate([
            'status' => 'required|in:completed,pending',
        ]);

        // Find the assignment by ID
        $assignment = Assignment::findOrFail($assignmentId);

        // Update the assignment status
        $status = $request->input('status');
        $assignment->students()->sync([$studentId => ['status' => $status]]);

        // You can return the updated assignment data if needed
        return response()->json($assignment);
    } catch (\Exception $e) {
        // Log the error
        \Log::error($e);
        return response()->json(['error' => 'Internal Server Error'], 500);
    }
}

}

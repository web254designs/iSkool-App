<?php

namespace App\Http\Controllers;

use App\Models\Response;
use Illuminate\Http\Request;

class TeacherCommunicationController extends Controller
{
    public function sendResponse(Request $request)
    {
        $request->validate([
            'childId' => 'required|numeric',
            'response' => 'required|string',
        ]);

        $childId = $request->input('childId');
        $responseText = $request->input('response');

        // Store the response in the database
        $response = Response::create([
            'student_id' => $childId,
            'response' => $responseText,
        ]);

        // Log the received data
        \Log::info("Received response for Child $childId: $responseText");

        return response()->json(['message' => 'Response sent and stored successfully', 'response' => $response], 200);
    }

    public function getResponses($childId)
    {
        try {
            // Fetch responses from the database based on the childId
            $responses = Response::where('student_id', $childId)->pluck('response')->toArray();

            return response()->json(['responses' => $responses], 200);
        } catch (\Exception $e) {
            // Handle any exceptions or errors
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}

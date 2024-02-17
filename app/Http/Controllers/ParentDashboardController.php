<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Guardian;
use App\Models\Event;
use App\Models\Attendance;
use App\Models\Assigment;
use App\Models\Student;
use App\Models\AcademicPerformance;
use App\Models\TeacherCommunication;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;


class ParentDashboardController extends Controller
{
    public function index()
    {
        try {
            $guardian = $this->retrieveAuthenticatedGuardian();

            $student = $this->retrieveAuthenticatedStudent();

            $announcements = $this->retrieveAnnouncements($guardian);

            $children = $this->retrieveChildrenData($guardian);

            $attendanceData = $this->retrieveAttendanceData($guardian);

            $dashboardData = $this->retrieveDashboardData($guardian);

            $schoolNewsData = $this->retrieveSchoolNewsData();

            $behaviorData = $this->retrieveBehaviorData();

            $assignmentsData = $this->retrieveAssignmentsData($guardian);

            $academicPerformanceData = $this->retrieveAcademicPerformanceData($guardian);

            $teacherCommunicationData = $this->retrieveTeacherCommunicationData($guardian);

            $upcomingEventsData = $this->retrieveUpcomingEventsData();

            return response()->json([
                'user' => [
                    'id' => $guardian->id,
                    'name' => $guardian->name,
                    'children' => $children,
                    'academicPerformanceData' => $academicPerformanceData,
                    'attendanceData' => $attendanceData,
                    'teacherCommunicationData' => $teacherCommunicationData,
                    'assignmentsData' => $assignmentsData,
                    'behaviorData' => $behaviorData,
                    'upcomingEventsData' => $upcomingEventsData,
                    'schoolNewsData' => $schoolNewsData,
                    'quickLinksData' => $dashboardData['quickLinksData'],
                ],
                'announcements' => $announcements,
            ]);
        } catch (\Exception $e) {
            // Log the error
            \Log::error($e);
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }

    private function retrieveSchoolNewsData()
    {
        // Retrieve announcements that have not yet occurred
        $announcements = Announcement::where('created_at', '>', now())->get();

        return $announcements;
    }

    private function retrieveBehaviorData()
{
    try {
        // Retrieve the authenticated user (guardian)
        $guardian = auth()->user()->guardian;

        // Check if the guardian has any associated students
        $students = $guardian->students;

        if ($students->isEmpty()) {
            return response()->json(['message' => 'No students found for the guardian'], 200);
        }

        // Retrieve behaviors for each student
        $behaviorsData = [];

        foreach ($students as $student) {
            // Check if the student has behaviors
            if ($student->behaviors->isEmpty()) {
                continue; // Skip to the next student if no behaviors found for this student
            }

            $behaviorsData[$student->id] = [
                'studentId' => $student->id,
                'childName' => $student->name, // Include the student's name here
                'behaviors' => $student->behaviors,
            ];
        }

        return $behaviorsData;
    } catch (\Exception $e) {
        // Log the error
        \Log::error($e);
        return response()->json(['error' => 'Internal Server Error'], 500);
    }
}


private function retrieveAssignmentsData(Guardian $guardian)
{
    try {
        // Assuming you have a relationship between Guardian and Student models
        $students = $guardian->students;

        // Check if the guardian has any associated students
        if (!$students || $students->isEmpty()) {
            return response()->json(['message' => 'No students found for the guardian'], 200);
        }

        // Retrieve assignments data for each student
        $assignmentsData = [];

        foreach ($students as $student) {
            // Check if the student has assignments
            if (!$student->assignments) {
                continue; // Skip to the next student if no assignments found for this student
            }

            $assignmentsData[] = [
                'childName' => $student->name,
                'assignments' => $student->assignments,
            ];
        }

        return $assignmentsData;
    } catch (\Exception $e) {
        // Log the error
        \Log::error($e);
        return response()->json(['error' => 'Internal Server Error'], 500);
    }
}



    private function retrieveAuthenticatedGuardian()
    {
    $user = auth()->user();

    // Assuming you have a relationship between User and Guardian models
    $guardian = $user->guardian;

    return $guardian;
    }

    private function retrieveAuthenticatedStudent()
    {
    $user = auth()->user();

    // Assuming you have a relationship between User and Student models
    $student = $user->student;

    return $student;
    }

    public function expressInterestOrMarkAttendance(Request $request, $eventId)
{
    $user = Auth::user();
    $event = Event::findOrFail($eventId);

    // Add logic to update the pivot table fields based on the parent's action
    $user->events()->syncWithoutDetaching([
        $eventId => [
            'is_interested' => true, // Adjust as needed
            'is_attending' => true,  // Adjust as needed
        ],
    ]);

    return response()->json(['message' => 'Action completed successfully'], 200);
}

private function retrieveUpcomingEventsData()
{
    // Retrieve events that have not yet occurred
    $upcomingEvents = Event::where('date', '>=', Carbon::now())->get();

    // Customize the data format if needed
    $formattedEvents = $upcomingEvents->map(function ($event) {
        return [
            'id' => $event->id,
            'title' => $event->title,
            'date' => $event->date->format('Y-m-d'),
            'description' => $event->description,
            // Add other properties you want to include
        ];
    });

    return $formattedEvents;
}

    private function retrieveAnnouncements(Guardian $guardian)
    {
        return Announcement::where('user_id', $guardian->id)->get();
    }

    private function retrieveChildrenData(Guardian $guardian)
    {
        return $guardian->students()->get();
    }

    private function retrieveAcademicPerformanceData(Guardian $guardian)
{
    $academicPerformanceData = [];

    foreach ($guardian->students as $student) {
        $academicPerformanceRecords = AcademicPerformance::where('student_id', $student->id)->get();

        $subjectData = [];

        foreach ($academicPerformanceRecords as $record) {
            $subjectData[] = [
                'subjectName' => $record->subject_name,
                'academicPerformance' => $record->academic_performance,
            ];
        }

        $academicPerformanceData[$student->id] = [
            'childName' => $student->name,
            'studentId' => $student->id,
            'subjects' => $subjectData,
        ];
    }

    return $academicPerformanceData;
}

private function retrieveTeacherCommunicationData(Guardian $guardian)
{
    $teacherCommunicationData = [];

    foreach ($guardian->students as $student) {
        $teacherCommunicationRecords = TeacherCommunication::where('student_id', $student->id)->get();

        $communicationData = [];

        foreach ($teacherCommunicationRecords as $record) {
            $communicationData[] = [
                'childId' => $student->id, // Assuming 'childId' is used to identify the child in the communication
                'message' => $record->message,
                // Add other fields as needed
            ];
        }

        $teacherCommunicationData[$student->id] = [
            'childName' => $student->name,
            'studentId' => $student->id,
            'communications' => $communicationData,
        ];
    }

    return $teacherCommunicationData;
}



    private function retrieveAttendanceData(Guardian $guardian)
{
    $attendanceData = [];

    foreach ($guardian->students as $student) {
        $attendanceRecords = Attendance::where('student_id', $student->id)->get();

        $attendanceData[$student->id] = [
            'childName' => $student->name,
            'daysPresent' => $attendanceRecords->where('status', 'present')->count(),
            'daysAbsent' => $attendanceRecords->where('status', 'absent')->count(),
        ];
    }

    return $attendanceData;
}

    private function retrieveDashboardData(Guardian $guardian)
    {
        // Replace the following lines with actual logic to retrieve data
        return [
            'quickLinksData' => [],
        ];
    }
}

import React, { useState, useEffect } from 'react';

const AssessmentGrading = () => {
  // State to manage student assessments
  const [assessments, setAssessments] = useState([]);

  // State to manage selected assessment details
  const [selectedAssessment, setSelectedAssessment] = useState({
    studentId: null,
    subject: '',
    grade: '',
    feedback: '',
  });

  // State to manage students
  const [students, setStudents] = useState([]);

  // Fetch initial data (students and assessments)
  useEffect(() => {
    // Fetch students from the server
    // Replace the following with your actual API call or data fetching logic
    const fetchStudents = async () => {
      try {
        // Sample data - Replace with actual data
        const studentsData = [
          { id: 1, name: 'Student A', grade: '2', level: 'Pre-Primary' },
          { id: 2, name: 'Student B', grade: '5', level: 'Upper Primary' },
        ];

        setStudents(studentsData);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    // Fetch assessments from the server
    // Replace the following with your actual API call or data fetching logic
    const fetchAssessments = async () => {
      try {
        // Sample data - Replace with actual data
        const assessmentsData = [
          { id: 101, studentId: 1, subject: 'Mathematics', grade: 'A', feedback: 'Excellent performance' },
          { id: 102, studentId: 2, subject: 'Science', grade: 'B', feedback: 'Good effort' },
        ];

        setAssessments(assessmentsData);
      } catch (error) {
        console.error('Error fetching assessments:', error);
      }
    };

    // Call the fetch functions
    fetchStudents();
    fetchAssessments();
  }, []);

  // Handle assessment selection
  const handleAssessmentSelect = (assessmentId) => {
    // Find the selected assessment based on assessmentId
    const selected = assessments.find((assessment) => assessment.id === assessmentId);

    // Set the selected assessment to the state
    setSelectedAssessment(selected);
  };

  // Render student options for assessment
  const renderStudentOptions = () => {
    return students.map((student) => (
      <option key={student.id} value={student.id}>
        {student.name} - Grade {student.grade}, Level {student.level}
      </option>
    ));
  };

  // Render assessment options for viewing grades
  const renderAssessmentOptions = () => {
    return assessments.map((assessment) => (
      <option key={assessment.id} value={assessment.id}>
        {assessment.subject} - Grade {assessment.grade}
      </option>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Assessment Grading</h2>

      {/* Student selection dropdown for assessment */}
      <div className="mb-6">
        <label htmlFor="studentSelect" className="block text-sm font-medium text-gray-600">
          Select Student:
        </label>
        <select
          id="studentSelect"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          onChange={(e) => setSelectedAssessment((prev) => ({ ...prev, studentId: parseInt(e.target.value) }))}
        >
          <option value="" disabled>
            Select a Student
          </option>
          {renderStudentOptions()}
        </select>
      </div>

      {/* Display selected assessment details */}
      {selectedAssessment && (
        <div className="mb-6 p-4 bg-white rounded-md shadow-md">
          <h3 className="text-xl font-bold mb-2">
            {selectedAssessment.subject} - Grade {selectedAssessment.grade}
          </h3>
          <p className="mb-2 text-gray-700">{selectedAssessment.feedback}</p>
        </div>
      )}

      {/* Assessment selection dropdown for viewing grades */}
      <div className="mb-6">
        <label htmlFor="assessmentSelect" className="block text-sm font-medium text-gray-600">
          View Grades:
        </label>
        <select
          id="assessmentSelect"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          onChange={(e) => handleAssessmentSelect(parseInt(e.target.value))}
        >
          <option value="" disabled>
            Select an Assessment
          </option>
          {renderAssessmentOptions()}
        </select>
      </div>

      {/* Form for grading assessments */}
      <form>
        <div className="mb-6">
          <label htmlFor="grade" className="block text-sm font-medium text-gray-600">
            Grade:
          </label>
          <input
            type="text"
            id="grade"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={selectedAssessment.grade}
            onChange={(e) => setSelectedAssessment((prev) => ({ ...prev, grade: e.target.value }))}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-600">
            Feedback:
          </label>
          <textarea
            id="feedback"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            value={selectedAssessment.feedback}
            onChange={(e) => setSelectedAssessment((prev) => ({ ...prev, feedback: e.target.value }))}
          />
        </div>

        <button
          type="submit"
          className="btn-primary bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-700"
        >
          Record Grade
        </button>
      </form>
    </div>
  );
};

export default AssessmentGrading;

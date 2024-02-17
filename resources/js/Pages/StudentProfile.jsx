import React, { useState, useEffect } from 'react';

const StudentProfile = () => {
  // State to manage student details
  const [studentDetails, setStudentDetails] = useState({
    id: 1,
    name: 'John Doe',
    grade: '5',
    level: 'Upper Primary',
    progressReports: [],
  });

  // Fetch initial data (student details and progress reports)
  useEffect(() => {
    // Fetch student details from the server
    // Replace the following with your actual API call or data fetching logic
    const fetchStudentDetails = async () => {
      try {
        // Sample data - Replace with actual data
        const studentDetailsData = {
          id: 1,
          name: 'John Doe',
          grade: '5',
          level: 'Upper Primary',
          progressReports: [
            { id: 101, term: 'Term 1', grades: { mathematics: 'A', science: 'B', english: 'A' }, feedback: 'Good progress' },
            { id: 102, term: 'Term 2', grades: { mathematics: 'A', science: 'A', english: 'B' }, feedback: 'Keep it up' },
          ],
        };

        setStudentDetails(studentDetailsData);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    // Call the fetch function
    fetchStudentDetails();
  }, []);

  // Render progress reports
  const renderProgressReports = () => {
    return studentDetails.progressReports.map((report) => (
      <div key={report.id} className="mb-8 p-6 bg-white rounded-md shadow-md">
        <h3 className="text-xl font-bold mb-2">{report.term}</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="mb-2">
              <span className="font-semibold">Mathematics:</span> {report.grades.mathematics}
            </p>
          </div>
          <div>
            <p className="mb-2">
              <span className="font-semibold">Science:</span> {report.grades.science}
            </p>
          </div>
          <div>
            <p className="mb-2">
              <span className="font-semibold">English:</span> {report.grades.english}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-semibold">Feedback:</p>
          <p>{report.feedback}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Student Profile</h2>

      {/* Display student details */}
      <div className="mb-8 p-6 bg-white rounded-md shadow-md">
        <h3 className="text-2xl font-bold mb-2">
          {studentDetails.name} - Grade {studentDetails.grade}, Level {studentDetails.level}
        </h3>
      </div>

      {/* Display progress reports */}
      {studentDetails.progressReports.length > 0 ? (
        <div>
          <h3 className="text-2xl font-bold mb-4">Progress Reports</h3>
          {renderProgressReports()}
        </div>
      ) : (
        <p className="text-gray-600">No progress reports available.</p>
      )}
    </div>
  );
};

export default StudentProfile;

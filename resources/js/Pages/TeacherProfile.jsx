import React, { useState, useEffect } from 'react';

const TeacherProfile = () => {
  // State to manage teacher details
  const [teacher, setTeacher] = useState({
    id: 1,
    name: 'John Doe',
    classesTaught: [
      { id: 1, name: 'Class 1A', grade: '2', level: 'Pre-Primary' },
      { id: 2, name: 'Class 2B', grade: '5', level: 'Upper Primary' },
    ],
    subjectsCovered: ['Mathematics', 'Science', 'English', 'Social Studies'],
  });

  // State to manage classes
  const [classes, setClasses] = useState([]);

  // State to manage subjects
  const [subjects, setSubjects] = useState([]);

  // Dummy function for updating teacher profile
  const handleUpdateProfile = (formData) => {
    // Replace this with your actual update logic
    console.log('Updating profile with:', formData);
  };

  // Fetch initial data (teacher details, classes, and subjects)
  useEffect(() => {
    // Fetch teacher details from the server
    // Replace the following with your actual API call or data fetching logic
    const fetchTeacherDetails = async () => {
      try {
        // Sample data - Replace with actual data
        const teacherData = {
          id: 1,
          name: 'John Doe',
          classesTaught: [
            { id: 1, name: 'Class 1A', grade: '2', level: 'Pre-Primary' },
            { id: 2, name: 'Class 2B', grade: '5', level: 'Upper Primary' },
          ],
          subjectsCovered: ['Mathematics', 'Science', 'English', 'Social Studies'],
        };

        setTeacher(teacherData);
      } catch (error) {
        console.error('Error fetching teacher details:', error);
      }
    };

    // Fetch classes from the server
    // Replace the following with your actual API call or data fetching logic
    const fetchClasses = async () => {
      try {
        // Sample data - Replace with actual data
        const classesData = [
          { id: 1, name: 'Class 1A', grade: '2', level: 'Pre-Primary' },
          { id: 2, name: 'Class 2B', grade: '5', level: 'Upper Primary' },
          // ... Add more classes
        ];

        setClasses(classesData);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    // Fetch subjects from the server
    // Replace the following with your actual API call or data fetching logic
    const fetchSubjects = async () => {
      try {
        // Sample data - Replace with actual data
        const subjectsData = ['Mathematics', 'Science', 'English', 'Social Studies'];
        setSubjects(subjectsData);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    // Call the fetch functions
    fetchTeacherDetails();
    fetchClasses();
    fetchSubjects();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg overflow-hidden shadow-md p-6 mb-6">
        <h2 className="text-3xl font-bold mb-4">{teacher.name}'s Profile</h2>

        {/* Display classes taught */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Classes Taught:</h3>
          <ul className="list-disc list-inside">
            {teacher.classesTaught.map((cls) => (
              <li key={cls.id}>
                {cls.name} - Grade {cls.grade}, Level {cls.level}
              </li>
            ))}
          </ul>
        </div>

        {/* Display subjects covered */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Subjects Covered:</h3>
          <ul className="list-disc list-inside">
            {teacher.subjectsCovered.map((subject) => (
              <li key={subject}>{subject}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Update teacher profile form */}
      <div className="bg-white rounded-lg overflow-hidden shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Update Profile</h3>

        {/* Dummy update profile form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Extract form data
            const formData = new FormData(e.target);
            const data = {};
            formData.forEach((value, key) => {
              data[key] = value;
            });
            // Call the dummy update profile function
            handleUpdateProfile(data);
          }}
        >
          {/* Add your form fields here */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Full Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={teacher.name}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue="dummy@example.com"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherProfile;

import React, { useState, useEffect } from 'react';

const SubjectManagement = () => {
  // State to manage subjects
  const [subjects, setSubjects] = useState([]);

  // State to manage selected subject details
  const [selectedSubject, setSelectedSubject] = useState({
    name: '',
    classId: null,
    teacher: '',
  });

  // State to manage classes
  const [classes, setClasses] = useState([]);

  // State to manage teachers
  const [teachers, setTeachers] = useState([]);

  // Fetch initial data (subjects, classes, and teachers)
  useEffect(() => {
    // Fetch subjects from the server
    // Replace the following with your actual API call or data fetching logic
    const fetchSubjects = async () => {
      try {
        // Sample data - Replace with actual data
        const subjectsData = [
          { id: 1, name: 'Mathematics', classId: 1, teacher: 'John Doe' },
          { id: 2, name: 'Science', classId: 2, teacher: 'Jane Doe' },
        ];

        setSubjects(subjectsData);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    // Fetch classes from the server
    // Replace the following with your actual API call or data fetching logic
    const fetchClasses = async () => {
      try {
        // Sample data - Replace with actual data
        const classesData = [
          { id: 1, name: 'Class 1A' },
          { id: 2, name: 'Class 2B' },
        ];

        setClasses(classesData);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    // Fetch teachers from the server
    // Replace the following with your actual API call or data fetching logic
    const fetchTeachers = async () => {
      try {
        // Sample data - Replace with actual data
        const teachersData = [
          { id: 101, name: 'John Doe' },
          { id: 102, name: 'Jane Doe' },
        ];

        setTeachers(teachersData);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    // Call the fetch functions
    fetchSubjects();
    fetchClasses();
    fetchTeachers();
  }, []);

  // Handle subject selection
  const handleSubjectSelect = (subjectId) => {
    // Find the selected subject based on subjectId
    const selected = subjects.find((subj) => subj.id === subjectId);

    // Set the selected subject to the state
    setSelectedSubject(selected);
  };

  // Render subject options
  const renderSubjectOptions = () => {
    return subjects.map((subj) => (
      <option key={subj.id} value={subj.id}>
        {subj.name} - Class {subj.classId}, Teacher: {subj.teacher}
      </option>
    ));
  };

  // Render class options for subject creation
  const renderClassOptions = () => {
    return classes.map((cls) => (
      <option key={cls.id} value={cls.id}>
        {cls.name}
      </option>
    ));
  };

  // Render teacher options for subject creation
  const renderTeacherOptions = () => {
    return teachers.map((teacher) => (
      <option key={teacher.id} value={teacher.name}>
        {teacher.name}
      </option>
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Subject Management</h2>

      {/* Subject selection dropdown */}
      <div className="mb-4">
        <label htmlFor="subjectSelect" className="mr-2 text-lg font-semibold">
          Select Subject:
        </label>
        <select
          id="subjectSelect"
          className="p-2 border border-gray-300 rounded"
          onChange={(e) => handleSubjectSelect(parseInt(e.target.value))}
        >
          <option value="" disabled>
            Select a Subject
          </option>
          {renderSubjectOptions()}
        </select>
      </div>

      {/* Display selected subject details */}
      {selectedSubject && (
        <div className="mb-6 p-4 bg-white rounded shadow-md">
          <h3 className="text-xl font-bold mb-2">
            {selectedSubject.name} - Class {selectedSubject.classId}, Teacher: {selectedSubject.teacher}
          </h3>
        </div>
      )}

      {/* Subject creation form */}
      <div className="mb-8 p-6 bg-white rounded shadow-md">
        <h3 className="text-xl font-bold mb-4">Create a New Subject</h3>
        <form>
          <div className="mb-4">
            <label htmlFor="subjectName" className="mr-2">
              Subject Name:
            </label>
            <input
              type="text"
              id="subjectName"
              className="p-2 border border-gray-300"
              value={selectedSubject.name}
              onChange={(e) => setSelectedSubject((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="classSelect" className="mr-2">
              Select Class:
            </label>
            <select
              id="classSelect"
              className="p-2 border border-gray-300"
              onChange={(e) => setSelectedSubject((prev) => ({ ...prev, classId: parseInt(e.target.value) }))}
            >
              <option value="" disabled>
                Select a Class
              </option>
              {renderClassOptions()}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="teacherSelect" className="mr-2">
              Assign Teacher:
            </label>
            <select
              id="teacherSelect"
              className="p-2 border border-gray-300"
              onChange={(e) => setSelectedSubject((prev) => ({ ...prev, teacher: e.target.value }))}
            >
              <option value="" disabled>
                Select a Teacher
              </option>
              {renderTeacherOptions()}
            </select>
          </div>

          <button type="submit" className="btn-primary bg-blue-500 text-white px-4 py-2 rounded">
            Create Subject
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubjectManagement;

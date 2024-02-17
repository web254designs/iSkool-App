import React, { useState, useEffect } from 'react';

const ClassManagement = () => {
  // State to manage classes
  const [classes, setClasses] = useState([]);

  // State to manage selected class details
  const [selectedClass, setSelectedClass] = useState({
    name: '',
    grade: '',
    level: '',
    learningAreas: [],
  });

  // State to manage learning areas
  const [learningAreas, setLearningAreas] = useState([]);

  // Fetch initial data (classes and learning areas)
  useEffect(() => {
    // Fetch classes from the server
    // Replace the following with your actual API call or data fetching logic
    const fetchClasses = async () => {
      try {
        // Sample data - Replace with actual data
        const classesData = [
          { id: 1, name: 'Class 1A', grade: '2', level: 'Pre-Primary', learningAreas: [] },
          { id: 2, name: 'Class 2B', grade: '5', level: 'Upper Primary', learningAreas: [] },
        ];

        setClasses(classesData);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    // Fetch learning areas from the server
    // Replace the following with your actual API call or data fetching logic
    const fetchLearningAreas = async () => {
      try {
        // Sample data - Replace with actual data
        const learningAreasData = [
          { id: 101, name: 'Mathematics' },
          { id: 102, name: 'Science' },
          // ... Add more learning areas
        ];

        setLearningAreas(learningAreasData);
      } catch (error) {
        console.error('Error fetching learning areas:', error);
      }
    };

    // Call the fetch functions
    fetchClasses();
    fetchLearningAreas();
  }, []);

  // Handle class selection
  const handleClassSelect = (classId) => {
    // Find the selected class based on classId
    const selected = classes.find((cls) => cls.id === classId);

    // Set the selected class to the state
    setSelectedClass(selected);
  };

  // Render class options
  const renderClassOptions = () => {
    return classes.map((cls) => (
      <option key={cls.id} value={cls.id}>
        {cls.name} - Grade {cls.grade}, Level {cls.level}
      </option>
    ));
  };

  // Render learning area options for assignment
  const renderLearningAreaOptions = () => {
    return learningAreas.map((area) => (
      <option key={area.id} value={area.id}>
        {area.name}
      </option>
    ));
  };

  // Handle learning area assignment to the selected class
  const handleAssignLearningArea = (areaId) => {
    // Find the selected learning area based on areaId
    const assignedArea = learningAreas.find((area) => area.id === areaId);

    // Update the selected class with the assigned learning area
    setSelectedClass((prevClass) => ({
      ...prevClass,
      learningAreas: [...prevClass.learningAreas, assignedArea],
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Class Management</h2>

      {/* Class selection dropdown */}
      <div className="mb-4">
        <label htmlFor="classSelect" className="mr-2 text-lg font-semibold">
          Select Class:
        </label>
        <select
          id="classSelect"
          className="p-2 border border-gray-300 rounded"
          onChange={(e) => handleClassSelect(parseInt(e.target.value))}
        >
          <option value="" disabled>
            Select a Class
          </option>
          {renderClassOptions()}
        </select>
      </div>

      {/* Display selected class details */}
      {selectedClass && (
        <div className="mb-6 p-4 bg-white rounded shadow-md">
          <h3 className="text-xl font-bold mb-2">
            {selectedClass.name} - Grade {selectedClass.grade}, Level {selectedClass.level}
          </h3>

          {/* Display assigned learning areas */}
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-2">Assigned Learning Areas:</h4>
            <ul>
              {selectedClass.learningAreas.map((area) => (
                <li key={area.id}>{area.name}</li>
              ))}
            </ul>
          </div>

          {/* Learning area assignment dropdown */}
          <div className="mb-4">
            <label htmlFor="areaSelect" className="mr-2 text-lg font-semibold">
              Assign Learning Area:
            </label>
            <select
              id="areaSelect"
              className="p-2 border border-gray-300 rounded"
              onChange={(e) => handleAssignLearningArea(parseInt(e.target.value))}
            >
              <option value="" disabled>
                Select a Learning Area
              </option>
              {renderLearningAreaOptions()}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassManagement;

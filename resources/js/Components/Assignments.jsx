import React, { useState, useEffect } from 'react';
import { List } from 'antd';

const Assignments = ({ assignmentsData }) => {
  const calculateTimeRemaining = (deadline) => {
    const now = new Date();
    const dueDate = new Date(deadline);
    const timeRemaining = dueDate - now;

    if (timeRemaining <= 0) {
      return 'Time expired';
    }

    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return `${hours} hrs ${minutes} mins ${seconds} secs`;
  };

  const [remainingTime, setRemainingTime] = useState({});

  useEffect(() => {
    // Update the remaining time every second
    const intervalId = setInterval(() => {
      const updatedRemainingTime = {};
      assignmentsData.forEach((assignmentData) => {
        assignmentData.assignments.forEach((assignment) => {
          updatedRemainingTime[assignment.id] = calculateTimeRemaining(assignment.deadline);
        });
      });
      setRemainingTime(updatedRemainingTime);
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [assignmentsData]);

  return (
    <div>
      <List
        dataSource={assignmentsData}
        renderItem={(assignmentData) => (
          <div>
            <h3 className="text-lg font-bold">{assignmentData.childName}</h3>
            {assignmentData.assignments.map((assignment) => (
              <List.Item key={assignment.id} className="text-gray-800 mb-2">
                <h4 className="text-md font-bold">{assignment.title}</h4>
                <p>Status: {assignment.pivot.status}</p>
                <p>Submit In: {remainingTime[assignment.id]}</p>
              </List.Item>
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default Assignments;

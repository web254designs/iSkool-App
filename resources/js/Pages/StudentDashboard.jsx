import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Collapse, Card, Avatar, Badge, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// Assuming this import is for axios, you may need to adjust it based on your project structure
import axios from 'axios';

const { Panel } = Collapse;

const StudentDashboard = () => {
  const [user, setUser] = useState({ id: 1, name: 'Jim - Student' });
  const [loading, setLoading] = useState(true);
  const [children, setChildren] = useState([
    { id: 1, name: 'Alice', grade: '5th', school: 'ABC Elementary School' },
    { id: 2, name: 'Bob', grade: '8th', school: 'XYZ Middle School' },
  ]);
  const [attendanceData, setAttendance] = useState([
    { monthId: 1, daysPresent: 15, daysAbsent: 3 },
  ]);
  const [gradesData, setGrades] = useState([
    { childId: 1, subjects: [{ name: 'Math', grade: 'A' }, { name: 'Science', grade: 'B' }] },
    { childId: 2, subjects: [{ name: 'Math', grade: 'B' }, { name: 'Science', grade: 'A' }] },
  ]);
  const [upcomingEventsData, setUpcomingEvents] = useState([
    { id: 1, title: 'School Fair', date: '2024-02-15' },
    { id: 2, title: 'Parent-Teacher Meeting', date: '2024-02-20' },
  ]);
  const [teacherCommunicationsData, setTeacherCommunications] = useState([
    { childId: 1, message: 'Alice is doing well in her studies!' },
    { childId: 2, message: 'Bob needs some extra help in math.' },
  ]);
  const [assignmentsData, setAssignments] = useState([
    { childId: 1, title: 'Math Homework', deadline: '2024-02-10' },
    { childId: 2, title: 'Science Project', deadline: '2024-02-15' },
  ]);
  const [behaviorData, setBehavior] = useState([
    { childId: 1, behavior: 'Excellent', comments: 'Active participation in class.' },
    { childId: 2, behavior: 'Good', comments: 'Polite and respectful towards peers.' },
  ]);
  const [schoolNewsData, setSchoolNews] = useState([
    { id: 1, news: 'New school policy implemented. Please review.' },
    { id: 2, news: 'Upcoming sports day on March 1st.' },
  ]);
  const [quickLinksData] = useState([
    { id: 1, label: 'School Calendar', link: '/calendar' },
    { id: 2, label: 'Grades', link: '/grades' },
    { id: 3, label: 'Fee Structure', link: '/fee-structure' },
    { id: 4, label: 'Newsletter', link: '/newsletter' },
    // Add more links based on your application
  ]);
  const handleViewCalendar = () => {
    alert('Viewing Calendar!'); // Replace this with your actual logic
    // You can open a modal, navigate to another page, or perform any other action
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
        const response = await fetch('/api/student/dashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
          },
        });

        // Parse the JSON content of the response
        const data = await response.json();

        // Now you can use the data
        setUser(data.user);
        setAnnouncements(data.announcements);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);

        // Log additional information about the error
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
        } else if (error.request) {
          console.error('No response received. Request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }

        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="mx-auto p-4 bg-green-200">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
        <div class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
  <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
  <p>This is your dashboard where you can find information about your kid's performances and announcements.</p>
</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="col-span-2">
  {/* Child Information */}
  <div className="bg-white p-4 rounded-lg shadow-md border-2 border-blue-500 flex items-center">
    <div className="mr-4">
      {/* Child Profile Photo Placeholder */}
      <Avatar size={64} icon={<UserOutlined />} />
    </div>
    <div>
      <h2 className="text-2xl font-bold mb-4 text-blue-500">Profile Overview</h2>
      <ul>
        {children.map((child) => (
          <li key={child.id} className="text-gray-800 mb-2">
            <span className="text-xl font-bold text-blue-700">{child.name}</span>
            {' - '}
            Grade: {child.grade}
            {' - '}
            Roll Number: {child.rollNumber}
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>

<div>
  {/* Attendance */}
  <div className="bg-blue-100 p-4 rounded-lg shadow-md border-2 border-blue-500">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold text-blue-500">Attendance</h2>
      <Button type="primary" onClick={handleViewCalendar}>
        View Calendar
      </Button>
    </div>
    <ul>
      {attendanceData.map((attendance) => (
        <li key={attendance.childId} className="text-gray-800 mb-2">
          Month {attendance.monthId}:
          <span className="text-green-600"> Present - {attendance.daysPresent} days,</span>
          <span className="text-red-600"> Absent - {attendance.daysAbsent} days</span>
        </li>
      ))}
    </ul>
  </div>
</div>

        <div>
          {/* Grades and Academic Performance */}
          <div className="bg-white p-4 rounded-lg shadow-md border-2 border-blue-500">
            <h2 className="text-lg font-bold mb-4 text-blue-500">Grades and Academic Performance</h2>
            <ul>
              {gradesData.map((grades) => (
                <li key={grades.childId} className="text-gray-800 mb-2">
                  Child {grades.childId}: {grades.subjects.map((subject) => `${subject.name}: ${subject.grade}`).join(', ')}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Accordion */}
      <Collapse accordion className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mt-2 mb-2">
        {/* Upcoming Events and Activities */}
        <Panel header={<h2 className="text-lg font-bold mb-4 text-blue-500">Upcoming Events and Activities</h2>} key="1">
          <ul>
            {upcomingEventsData.map((event) => (
              <li key={event.id} className="text-gray-800 mb-2">
                {event.title} - Date: {event.date}
              </li>
            ))}
          </ul>
        </Panel>

        {/* Teacher Communications */}
        <Panel
    header={
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <h2 className="text-lg font-bold mb-4 text-blue-500">Teacher Communications</h2>
        <Badge count={teacherCommunicationsData.length} overflowCount={99}>
          <span className="site-badge-count-4"></span>
        </Badge>
      </div>
    }
    key="2"
  >
    <ul>
      {teacherCommunicationsData.map((communication) => (
        <li key={communication.childId} className="text-gray-800 mb-2">
          Child {communication.childId}: {communication.message}
        </li>
      ))}
    </ul>
  </Panel>

        {/* Assignments and Homework */}
        <Panel header={<h2 className="text-lg font-bold mb-4 text-blue-500">Assignments and Homework</h2>} key="3">
          <ul>
            {assignmentsData.map((assignment) => (
              <li key={assignment.childId} className="text-gray-800 mb-2">
                Child {assignment.childId}: {assignment.title} - Deadline: {assignment.deadline}
              </li>
            ))}
          </ul>
        </Panel>

        {/* Assignments and Homework */}
        <Panel header={<h2 className="text-lg font-bold mb-4 text-blue-500">Behavior and Conduct</h2>} key="4">
          <ul>
            {behaviorData.map((behavior) => (
              <li key={behavior.childId} className="text-gray-800 mb-2">
                Child {behavior.childId}: Behavior - {behavior.behavior}, Comments: {behavior.comments}
              </li>
            ))}
          </ul>
        </Panel>
      </Collapse>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>
    {/* School News and Announcements */}
    <div className="bg-white p-4 rounded-lg shadow-md border-2 border-purple-500">
      <h2 className="text-lg font-bold mb-4 text-purple-500">School News and Announcements</h2>
      <ul>
        {schoolNewsData.map((news) => (
          <li key={news.id} className="text-gray-800 mb-2">
            {news.news}
          </li>
        ))}
      </ul>
    </div>
  </div>

  <div>
    {/* Quick Links */}
    <div className="bg-white p-4 rounded-lg shadow-md border-2 border-purple-500">
      <h2 className="text-lg font-bold mb-4 text-purple-500">Quick Links</h2>
      <ul>
        {quickLinksData.map((link) => (
          <li key={link.id} className="text-purple-500 underline">
            <Link to={link.link}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>

      {/* Feedback and Surveys */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Feedback and Surveys</h2>
        <p className="text-gray-700">
          Provide feedback on school-related matters and participate in surveys to share your opinions.
        </p>
        {/* Add feedback and survey components as needed */}
      </div>
    </div>
  );
};

StudentDashboard.propTypes = {
  announcements: PropTypes.array,
};

export default StudentDashboard;

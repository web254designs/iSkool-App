import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GuestHeader from '@/Components/GuestHeader';
import { Collapse, Card, Avatar, Badge, Input, Button } from 'antd';
import { BoldOutlined, UserOutlined } from '@ant-design/icons';
import Greeting from '@/Components/Greeting';
import Assignments from '@/Components/Assignments';

const { Panel } = Collapse;


const ParentDashboard = () => {
    const [user, setUser] = useState([]);
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [teacherCommunicationData, setTeacherCommunicationData] = useState([]);
    const [assignmentsData, setAssignmentsData] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
          try {
            const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
            const response = await fetch('/api/parent/dashboard', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
              },
            });

            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
              const data = await response.json();
              console.log('API Response:', data); // Log the response

              setUser(data.user);
              setTeacherCommunicationData(data.teacherCommunicationData);
              setAssignmentsData(data.assignmentsData);
              setLoading(false);
            } else {
              console.error('Unexpected response format. Content-Type:', contentType);
              throw new Error('Unexpected response format. Expected JSON.');
            }
          } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
          }
        };

        fetchData();
      }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8">Error: {error}</div>; // Display the error
}

// Check if user is defined before accessing properties
const userName = user && user.name;

// Function to handle changes in the input field
const handleResponseChange = (childId, event) => {
    const { value } = event.target;
    setResponses((prevResponses) => ({
      ...prevResponses,
      [childId]: value,
    }));
  };

  const handleSendResponse = (childId) => {
    const userResponse = responses[childId];
    const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;

    // Send the response to the server
    fetch('/api/send-response', { // Update the URL to your Laravel API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
      },
      body: JSON.stringify({
        childId,
        response: userResponse,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to send response to the server');
        }
        // Parse the JSON response
        return response.json();
      })
      .then(data => {
        // Handle success
        console.log(`Response for Child ${childId} sent successfully. Server response:`, data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error sending response:', error.message);
      });
      // After sending, fetch and update the responses
    fetchResponses(childId);
  };

  // Function to fetch responses from the server
  const fetchResponses = async (childId) => {
    try {
      const response = await fetch(`/api/get-responses/${childId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch responses from the server');
      }
      const responseData = await response.json();
      setResponses((prevResponses) => ({
        ...prevResponses,
        [childId]: responseData.responses,
      }));
    } catch (error) {
      console.error('Error fetching responses:', error.message);
    }
  };

  return (
    <div className="mx-auto p-4 bg-blue-200">
        {<GuestHeader user={user} />}
      <div className="mb-8">
        <Greeting />
        <div className="bg-indigo-900 text-center py-4 lg:px-4">
  <div className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
    <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">New</span>
    <span className="font-semibold mr-2 text-left flex-auto">This is your dashboard where you can find information about your kid's performances and announcements.</span>
    <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
  </div>
</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="col-span-2">
  {/* Child Information */}
  <div className="bg-white p-4 rounded-lg shadow-md border-2 border-blue-500 flex items-center">
    {user.children &&
      user.children.map((child) => (
        <div key={child.id} className="flex-1 mr-4 p-4 border rounded-md flex items-center">
          {/* Add 'flex-1' to make each child take equal width */}
          <div className="flex-shrink-0 ml-4">
            {/* Adjust the size and style of the image as needed */}
            <img src="12055254.jpg" alt="Profile" className="w-16 h-16 rounded-full" />
          </div>
          <div>
            <div className="mb-2">
              <span className="uppercase-text p-1 bg-gray-600 text-gray-100 text-sm">
                <b>{child.gender}</b>
                <UserOutlined style={{ marginLeft: '5px' }} />
              </span>
            </div>
            <div className="text-sm mb-2">
              <b>DOB:</b> {child.birthdate}
            </div>
            <div className="text-2xl font-bold text-blue-700 mb-2">{child.name}</div>
            <div>
              Grade: <b>{child.grade}</b>
            </div>
          </div>
        </div>
      ))}
  </div>
</div>


        <div>
          {/* Attendance */}
          <div className="bg-blue-100 p-4 rounded-lg shadow-md border-2 border-blue-500">
    <h2 className="text-lg font-bold mb-4 text-blue-500">Attendance</h2>
    <ul>
        {user.attendanceData &&
            Object.keys(user.attendanceData).map((childId) => {
                const attendance = user.attendanceData[childId];

                return (
                    <li key={childId} className="flex items-center justify-between bg-gray-100 p-3 mb-3 rounded-md shadow-md">
                        <div className="flex items-center">
                            <span className="font-semibold mr-2">{attendance.childName}:</span>
                            <span className="text-green-600 mr-2">Present - {attendance.daysPresent} days</span>
                            <span className="text-red-600">Absent - {attendance.daysAbsent} days</span>
                        </div>
                        <div className="flex items-center">
                            {/* Add additional information or actions here */}
                        </div>
                    </li>
                );
            })}
    </ul>
</div>

        </div>

        <div>
          {/* Grades and Academic Performance */}
          <div className="bg-white p-4 rounded-lg shadow-md border-2 border-blue-500">
    <h2 className="text-lg font-bold mb-4 text-blue-500">Grades and Academic Performance</h2>
    <table className="min-w-full">
        <thead className="bg-blue-100">
            <tr>
                <th className="text-left py-2 px-4 font-semibold">Child Name</th>
                <th className="text-left py-2 px-4 font-semibold">Subjects</th>
            </tr>
        </thead>
        <tbody>
            {user.academicPerformanceData &&
                Object.entries(user.academicPerformanceData).map(([studentId, academicPerformance]) => (
                    <tr key={studentId} className="text-gray-800">
                        <td className="py-2 px-4">{academicPerformance.childName}</td>
                        <td className="py-2 px-4">
                            <ul className="list ml-4">
                                {academicPerformance.subjects.map((subject, index) => (
                                    <li key={index} className="mb-1">
                                        <b>{subject.subjectName}:</b> {subject.academicPerformance}
                                    </li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                ))}
        </tbody>
    </table>
</div>


        </div>
      </div>

      {/* Accordion */}
      <Collapse accordion className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mt-2 mb-2">
        {/* Upcoming Events and Activities */}
        <Panel header={<h2 className="text-lg font-bold mb-4 text-blue-500">Upcoming Events and Activities</h2>} key="1">
  <ul>
    {user.upcomingEventsData && user.upcomingEventsData.map((event) => (
      <li key={event.id} className="text-gray-800 mb-4">
        <h3 className="text-lg font-bold">{event.title}</h3>
        <p>Date: {event.date}</p>
        <p>Description: {event.description}</p>

        {/* Button to express interest or mark attendance */}
        <button
          onClick={() => {
            // Add logic to handle the parent's action (e.g., express interest or mark attendance)
            console.log(`Express interest or mark attendance for event: ${event.title}`);
          }}
          className="bg-blue-500 text-white px-4 py-2 mt-2"
        >
          Express Interest / Mark Attendance
        </button>
      </li>
    ))}
  </ul>
</Panel>

        {/* Teacher Communications */}
        <Panel
      header={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <h2 className="text-lg font-bold mb-4 text-blue-500">Teacher Communications</h2>
          <Badge count={Object.keys(user.teacherCommunicationData).length} overflowCount={99}>
            <span className="site-badge-count-4"></span>
          </Badge>
        </div>
      }
      key="2"
    >
      <div className="bg-blue-100 p-4 rounded-lg shadow-md border-2 border-blue-500">
        {Object.keys(user.teacherCommunicationData).length > 0 ? (
          Object.keys(user.teacherCommunicationData).map((childId) => {
            const communication = user.teacherCommunicationData[childId];
            const hasCommunications = Array.isArray(communication.communications) && communication.communications.length > 0;

            return hasCommunications && (
              <div key={childId} className="text-gray-800 mb-4 z-100">
                <h3 className="text-lg font-bold mb-2">Child: {communication.childName}</h3>
                <ul>
                  {communication.communications.map((msg, index) => (
                    <li key={index}>
                      <b>Message {index + 1}:</b> {msg.message}
                    </li>
                  ))}
                </ul>

                {/* Display responses below the messages */}
                {responses[childId] && (
                  <div className="mb-2">
                    <b>Your Response:</b> {responses[childId]}
                  </div>
                )}

                {/* Add input and button for response */}
                <Input
                  placeholder="Type your response here"
                  value={responses[childId] || ''}
                  onChange={(event) => handleResponseChange(childId, event)}
                  className="mb-2"
                />
                <Button type="primary" onClick={() => handleSendResponse(childId)}>
                  Send Response
                </Button>
              </div>
            );
          })
        ) : (
          <p>No teacher communication data available.</p>
        )}
      </div>
    </Panel>

        {/* Assignments and Homework */}
        <Panel header={<h2 className="text-lg font-bold mb-4 text-blue-500">Assignments and Homework</h2>} key="3">
        <Assignments assignmentsData={user.assignmentsData} />
        </Panel>

        {/* Assignments and Homework */}
        <Panel header={<h2 className="text-lg font-bold mb-4 text-blue-500">Behavior and Conduct</h2>} key="4">
        <ul>
        {Object.keys(user.behaviorData).length > 0 ? (
  Object.keys(user.behaviorData).map((childId) => {
    const childData = user.behaviorData[childId];
    const childName = childData.childName;
    const behaviors = childData.behaviors;

    console.log(`Child ${childId} Data:`, childData);

    // Check if there are behaviors available for this child
    const hasBehaviors = Array.isArray(behaviors) && behaviors.length > 0;

    // Render the list of behaviors only if there are behaviors available
    return hasBehaviors && (
      <div key={childId} className="text-gray-800 mb-4 z-100">
        <h3 className="text-lg font-bold mb-2">{childName}</h3>
        <ul>
          {behaviors.map((behavior) => (
            <li key={behavior.id} className="text-gray-800 mb-2">
              Behavior: {behavior.name}, Comments: {behavior.description}
            </li>
          ))}
        </ul>
      </div>
    );
  })
) : (
  <p>No behavior data available.</p>
)}

</ul>

        </Panel>
      </Collapse>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>
    {/* School News and Announcements */}
    <div className="bg-white p-4 rounded-lg shadow-md border-2 border-purple-500">
      <h2 className="text-lg font-bold mb-4 text-purple-500">School News and Announcements</h2>
      <ul>
              {user.schoolNewsData && user.schoolNewsData.map((news) => (
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
              {/* Assuming quickLinksData is an array of objects with 'id', 'link', and 'label' properties */}
              {user.quickLinksData && user.quickLinksData.map((link) => (
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

ParentDashboard.propTypes = {
    upcomingEventsData: PropTypes.array,
    schoolNewsData: PropTypes.array,
    quickLinksData: PropTypes.array,
    user: PropTypes.shape({
      name: PropTypes.string,
      children: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        academicPerformance: PropTypes.string,
        teacherCommunicationData: PropTypes.array,
        assignmentsData: PropTypes.array,
        behaviorData: PropTypes.array,
      })),
    }),
  };

export default ParentDashboard;

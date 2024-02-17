import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TeacherDashboard = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [announcementsData, setAnnouncements] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
            const response = await fetch('/api/teacher/dashboard', {
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
            setProjects(data.projects);
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
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
                <p className="text-lg text-gray-700">
                    This is your dashboard where you can find information about your classes, and announcements.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {/* Announcements */}
                <div className="bg-white p-4 rounded shadow-md">
                    <h2 className="text-xl font-bold mb-4">Announcements</h2>
                    {announcementsData.length > 0 ? (
                        <ul>
                            {announcementsData.map((announcement) => (
                                <li key={announcement.id} className="text-gray-700">{announcement.message}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No announcements available.</p>
                    )}
                </div>
            </div>

            {/* Quick Links */}
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/courses" className="text-blue-500 underline">My Courses</Link>
                    </li>
                    <li>
                        <Link to="/grades" className="text-blue-500 underline">My Grades</Link>
                    </li>
                    {/* Add more links based on your application */}
                </ul>
            </div>
        </div>
    );
};

TeacherDashboard.propTypes = {
    announcements: PropTypes.array,
};

export default TeacherDashboard;

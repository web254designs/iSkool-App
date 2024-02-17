import React, { useState, useEffect } from 'react';

const Greeting = () => {
  const [greeting, setGreeting] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
        const response = await fetch('/api/get-user', { // Replace with your actual API endpoint
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
          },
        });

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log('User API Response:', data); // Log the response

          // Assuming the user object has a 'name' property
          setUser(data.user.name);

          // Update the greeting based on the current hour
          const currentHour = new Date().getHours();
          if (currentHour >= 5 && currentHour < 12) {
            setGreeting('Good morning');
          } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Good afternoon');
          } else {
            setGreeting('Good evening');
          }
        } else {
          console.error('Unexpected response format. Content-Type:', contentType);
          throw new Error('Unexpected response format. Expected JSON.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <h1 className="text-2xl font-bold mb-4">
      {greeting ? `${greeting}, ${user}!` : ``}
    </h1>
  );
};

export default Greeting;

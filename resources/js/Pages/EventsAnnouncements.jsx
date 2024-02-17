import React, { useState, useEffect } from 'react';

const EventsAnnouncements = () => {
  // State to manage events
  const [events, setEvents] = useState([]);

  // State to manage selected event details
  const [selectedEvent, setSelectedEvent] = useState({
    id: null,
    title: '',
    date: '',
    description: '',
  });

  // State for form input
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: '',
  });

  // Fetch initial data (events)
  useEffect(() => {
    // Fetch events from the server
    // Replace the following with your actual API call or data fetching logic
    const fetchEvents = async () => {
      try {
        // Sample data - Replace with actual data
        const eventsData = [
          { id: 1, title: 'School Assembly', date: '2024-01-20', description: 'Gather for an important assembly' },
          { id: 2, title: 'Midterm Exams', date: '2024-02-10', description: 'Midterm examinations for all classes' },
        ];

        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    // Call the fetch function
    fetchEvents();
  }, []);

  // Handle event selection
  const handleEventSelect = (eventId) => {
    // Find the selected event based on eventId
    const selected = events.find((event) => event.id === eventId);

    // Set the selected event to the state
    setSelectedEvent(selected);
  };

  // Render event options
  const renderEventOptions = () => {
    return events.map((event) => (
      <option key={event.id} value={event.id}>
        {event.title} - Date: {event.date}
      </option>
    ));
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  // Handle event submission
  const handleEventSubmit = (e) => {
    e.preventDefault();

    // Add the new event to the state
    setEvents((prevEvents) => [
      ...prevEvents,
      { id: prevEvents.length + 1, ...newEvent },
    ]);

    // Reset the form
    setNewEvent({
      title: '',
      date: '',
      description: '',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Events and Announcements</h2>

      {/* Event selection dropdown */}
      <div className="mb-6">
        <label htmlFor="eventSelect" className="block text-sm font-medium text-gray-600">
          Select Event:
        </label>
        <select
          id="eventSelect"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          onChange={(e) => handleEventSelect(parseInt(e.target.value))}
        >
          <option value="" disabled>
            Select an Event
          </option>
          {renderEventOptions()}
        </select>
      </div>

      {/* Display selected event details */}
      {selectedEvent && (
        <div className="mb-6 p-4 bg-white rounded-md shadow-md">
          <h3 className="text-xl font-bold mb-2">
            {selectedEvent.title} - Date: {selectedEvent.date}
          </h3>
          <p>{selectedEvent.description}</p>
        </div>
      )}

      {/* Event scheduling section */}
      <div>
        <h3 className="text-xl font-bold mb-2">Schedule an Event</h3>
        <form onSubmit={handleEventSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-600">
              Event Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-600">
              Event Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">
              Event Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="btn-primary bg-blue-500 text-white px-4 py-2 rounded"
          >
            Schedule Event
          </button>
        </form>
      </div>

      {/* Announcement section */}
      {/* Include your announcement components/form here */}
      {/* Add form fields for making announcements */}
    </div>
  );
};

export default EventsAnnouncements;

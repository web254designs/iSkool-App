import React, { useState, useEffect } from 'react';

const ResourcesMaterials = () => {
  // State to manage resources
  const [resources, setResources] = useState([]);

  // State to manage selected resource details
  const [selectedResource, setSelectedResource] = useState({
    id: null,
    title: '',
    type: '',
    uploadedBy: '',
  });

  // State for form input
  const [newResource, setNewResource] = useState({
    title: '',
    type: '',
    uploadedBy: 'John Doe', // Default uploader (replace with actual user data)
  });

  // Fetch initial data (resources)
  useEffect(() => {
    // Fetch resources from the server
    // Replace the following with your actual API call or data fetching logic
    const fetchResources = async () => {
      try {
        // Sample data - Replace with actual data
        const resourcesData = [
          { id: 1, title: 'Math Textbook', type: 'Textbook', uploadedBy: 'John Doe' },
          { id: 2, title: 'Science Notes', type: 'Notes', uploadedBy: 'Jane Doe' },
        ];

        setResources(resourcesData);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    // Call the fetch function
    fetchResources();
  }, []);

  // Handle resource selection
  const handleResourceSelect = (resourceId) => {
    // Find the selected resource based on resourceId
    const selected = resources.find((res) => res.id === resourceId);

    // Set the selected resource to the state
    setSelectedResource(selected);
  };

  // Render resource options
  const renderResourceOptions = () => {
    return resources.map((res) => (
      <option key={res.id} value={res.id}>
        {res.title} - Type: {res.type}, Uploaded by: {res.uploadedBy}
      </option>
    ));
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource((prev) => ({ ...prev, [name]: value }));
  };

  // Handle resource submission
  const handleResourceSubmit = (e) => {
    e.preventDefault();

    // Add the new resource to the state
    setResources((prevResources) => [
      ...prevResources,
      { id: prevResources.length + 1, ...newResource },
    ]);

    // Reset the form
    setNewResource({
      title: '',
      type: '',
      uploadedBy: 'John Doe', // Default uploader (replace with actual user data)
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Resources and Materials</h2>

      {/* Resource selection dropdown */}
      <div className="mb-6">
        <label htmlFor="resourceSelect" className="block text-sm font-medium text-gray-600">
          Select Resource:
        </label>
        <select
          id="resourceSelect"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          onChange={(e) => handleResourceSelect(parseInt(e.target.value))}
        >
          <option value="" disabled>
            Select a Resource
          </option>
          {renderResourceOptions()}
        </select>
      </div>

      {/* Display selected resource details */}
      {selectedResource && (
        <div className="mb-6 p-4 bg-white rounded-md shadow-md">
          <h3 className="text-xl font-bold mb-2">
            {selectedResource.title} - Type: {selectedResource.type}, Uploaded by: {selectedResource.uploadedBy}
          </h3>
        </div>
      )}

      {/* Resource upload and organization section */}
      <div>
        <h3 className="text-xl font-bold mb-2">Upload and Organize Resources</h3>
        <form onSubmit={handleResourceSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-600">
              Resource Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newResource.title}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-600">
              Resource Type:
            </label>
            <input
              type="text"
              id="type"
              name="type"
              value={newResource.type}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="btn-primary bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upload Resource
          </button>
        </form>
      </div>

      {/* Resource sharing section */}
      {/* Include your resource sharing components/form here */}
      {/* Add form fields for sharing resources with students */}
    </div>
  );
};

export default ResourcesMaterials;

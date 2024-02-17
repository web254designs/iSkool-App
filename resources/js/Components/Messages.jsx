// components/Messages.jsx

import React from 'react';

const Messages = () => {
    // Dummy messages data (replace with your actual data)
    const messages = [
        { id: 1, sender: 'Admin', content: 'Welcome to the Chama!', timestamp: '2024-01-05 10:15 AM' },
        { id: 2, sender: 'John Doe', content: 'Reminder: Chama meeting tomorrow.', timestamp: '2024-02-10 03:30 PM' },
        // Add more messages as needed
    ];

    return (
        <div className="min-h-screen">
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Chama Messages</h2>

                {/* Display the list of messages */}
                <ul>
                    {messages.map(message => (
                        <li key={message.id} className="mb-4">
                            <div className="flex items-center">
                                <strong className="mr-2">{message.sender}:</strong>
                                <p>{message.content}</p>
                            </div>
                            <span className="ml-2 text-gray-500">{message.timestamp}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Messages;

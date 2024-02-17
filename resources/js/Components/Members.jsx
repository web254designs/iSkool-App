// components/Members.jsx

import React from 'react';

const Members = () => {
    // Dummy members data (replace with your actual data)
    const members = [
        { id: 1, name: 'John Doe', contribution: 200.00, joinedDate: '2024-01-10' },
        { id: 2, name: 'Jane Smith', contribution: 150.00, joinedDate: '2024-02-01' },
        // Add more members as needed
    ];

    return (
        <div className="min-h-screen">
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Chama Members</h2>

                {/* Display the list of members */}
                <ul>
                    {members.map(member => (
                        <li key={member.id} className="mb-2">
                            <strong>{member.name}</strong>
                            <span className="ml-2 text-gray-500">
                                Contribution: ${member.contribution.toFixed(2)}
                            </span>
                            <span className="ml-2 text-gray-500">
                                Joined: {member.joinedDate}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Members;

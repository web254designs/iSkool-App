import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/inertia-react';

const SelectGroup = ({ groups: propGroups }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [fetchedGroups, setFetchedGroups] = useState([]);

    useEffect(() => {
        fetchGroupsFromServer()
            .then((groups) => {
                console.log('Fetched groups from server:', groups);
                setFetchedGroups(groups);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching Chama groups:', error.message);
                setLoading(false); // Set loading to false even on error
            });
    }, []);

    const fetchGroupsFromServer = async () => {
        try {
            const response = await fetch('/api/groups');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Response from server:', data);
            const groups = data || [];
            console.log('Fetched Chama groups:', groups);
            return groups;
        } catch (error) {
            throw error;
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        // Add logic to filter groups based on the searchQuery if needed
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Select or Search Chama Groups</h2>

            <div className="mb-6">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search groups..."
                    className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
                />
            </div>

            {loading ? (
                <p>Loading Chama groups...</p>
            ) : propGroups.length === 0 ? (
                <p>No Chama groups available.</p>
            ) : (
                <ul>
                    {propGroups.map((group) => (
                        <GroupItem key={group.id} group={group} />
                    ))}
                </ul>
            )}
        </div>
    );
};

const GroupItem = ({ group }) => (
    <li className="mb-4">
        <div className="mb-2 text-lg font-semibold">{group.group_name}</div>
        <div className="text-gray-600">{group.description}</div>
        <div className="text-sm text-gray-500">Type: {group.group_type}</div>
        <Link href={`/join-group/${group.id}`} className="text-blue-500 hover:underline">
            Join Group
        </Link>
    </li>
);

export default SelectGroup;

import React, { useState } from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import Transactions from '@/components/Transactions.jsx';
import Members from '@/components/Members.jsx';
import Messages from '@/components/Messages.jsx';
import ProfileManagement from '@/components/ProfileManagement.jsx';
ProfileManagement.jsx

// Dashboard component
const Dashboard = ({ user }) => {
    const [activeMenuItem, setActiveMenuItem] = useState('/dashboard'); // Set the default active menu item

    // Function to set the active menu item
    const handleMenuItemClick = (menuItem) => {
        setActiveMenuItem(menuItem);
    };

    // Menu items
    const menuItems = [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/transactions', label: 'Transactions' },
        {
            path: '/members',
            label: 'Members',
            subMenu: [
                { path: '/members/list', label: 'Member List' },
                { path: '/members/contribution', label: 'Contribution Tracking' },
                // Add other member-related features
            ],
        },
        { path: '/messages', label: 'Messages' },
        { path: '/profile-management', label: 'Profile Management' },
        { path: '/document-repository', label: 'Document Repository' },
    ];

    return (
        <div className="min-h-screen">
            {/* Top Navbar */}
            <nav className="bg-gray-800 p-4 text-white">
                <h2 className="text-2xl font-bold">Chama App</h2>
                <div className="flex space-x-4">
                    {menuItems.map((menuItem) => (
                        <InertiaLink
                            key={menuItem.path}
                            href={menuItem.path}
                            className={`text-white ${activeMenuItem === menuItem.path ? 'font-bold' : ''}`}
                            onClick={() => handleMenuItemClick(menuItem.path)}
                        >
                            {menuItem.label}
                        </InertiaLink>
                    ))}
                    <InertiaLink
                        href="/logout"
                        method="post"
                        className="text-blue-500 underline"
                        as="button"
                    >
                        Logout
                    </InertiaLink>
                </div>
            </nav>

            {/* Main Content */}
            <div className="p-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <p>Welcome, {user.name}!</p>
                </div>

                {/* Cards for Dashboard Features */}
                {/* Render different components based on the active menu item */}
                {activeMenuItem === '/dashboard' && <DashboardCard />}
                {activeMenuItem === '/transactions' && <TransactionsCard />}
                {activeMenuItem === '/members' && <MembersCard />}
                {activeMenuItem === '/messages' && <MessagesCard />}
                {activeMenuItem === '/profile-management' && <ProfileManagementCard />}

                {/* Logout button */}
                <p className="mt-4">
                    {/* Add your logout button code here */}
                </p>
            </div>
        </div>
    );
};

// Export the Dashboard component
export default Dashboard;

// Example component for DashboardCard
const DashboardCard = () => {
    return <div>Dashboard Content</div>;
};

// Example component for TransactionsCard
const TransactionsCard = () => {
    return <Transactions />;
};

const MembersCard = () => {
    return <Members />;
};

const MessagesCard = () => {
    return <Messages />;
};

const ProfileManagementCard = () => {
    return <ProfileManagement />;
};



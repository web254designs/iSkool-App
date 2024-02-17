import React, { useState } from 'react';

const ProfileManagement = ({ user }) => {

    // Handle form submission (replace with your actual submission logic)
    const handleSubmit = (e) => {
        e.preventDefault();

    };

    return (
        <div className="min-h-screen">
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Profile Management</h2>

                {/* Profile Update Form */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Full Name</label>
                        <input
                            type="text"
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            className="mt-1 p-2 w-full border rounded-md"

                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">New Password</label>
                        <input
                            type="password"
                            className="mt-1 p-2 w-full border rounded-md"

                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileManagement;

// Import necessary dependencies
import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/inertia-react';


// Register component
const Login = () => {
    // useForm hook from Inertia.js
    const { data, setData, post, errors } = useForm({
        email: '',
        password: '',
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Add your authentication logic here
        console.log('Form submitted with data:', data);

        post('/login', data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-4 bg-white shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Login</h2>

                {
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={data.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                value={data.password}
                                onChange={handleInputChange}
                            />
                        </div>

                        <button
                            className="btn-primary bg-blue-500 text-white px-4 py-2 rounded"
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                }

                <p className="mt-4">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-blue-500 underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

// Export the Login component
export default Login;

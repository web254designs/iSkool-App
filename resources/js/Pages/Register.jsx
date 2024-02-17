import React from 'react';
import { Link, useForm } from '@inertiajs/inertia-react';

const Register = () => {
    const [passwordStrength, setPasswordStrength] = React.useState('');
    const [isEmailValid, setIsEmailValid] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'student',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);

        if (name === 'password') {
            checkPasswordStrength(value);
        } else if (name === 'email') {
            checkEmailFormat(value);
        }
    };

    const checkPasswordStrength = (password) => {
        // Implement your password strength logic here
        // For simplicity, just checking for minimum length
        if (password.length < 8) {
            setPasswordStrength('Weak');
        } else if (password.length < 12) {
            setPasswordStrength('Moderate');
        } else {
            setPasswordStrength('Strong');
        }
    };

    const checkEmailFormat = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(email));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        await post('/register', {
            onSuccess: () => {
                console.log('Registration successful');
                setIsLoading(false);
            },
            onError: () => {
                // Handle error if needed
                setIsLoading(false);
            },
            data: { ...data, role: data.role.toLowerCase() },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-4 bg-white shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Register</h2>

                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            name="name"
                            value={data.name}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                !isEmailValid ? 'border-red-500' : ''
                            }`}
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={data.email}
                            onChange={handleInputChange}
                        />
                        {!isEmailValid && <p className="text-sm text-red-500">Invalid email format</p>}
                    </div>

                    <div className="mb-4">
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
                        {passwordStrength && (
                            <p className={`text-sm ${passwordStrength === 'Weak' ? 'text-red-500' : 'text-green-500'}`}>
                                Password Strength: {passwordStrength}
                            </p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password_confirmation">
                            Confirm Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password_confirmation"
                            type="password"
                            placeholder="Confirm your password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                            Role
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="role"
                            name="role"
                            value={data.role}
                            onChange={handleInputChange}
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="parent">Parent</option>
                        </select>
                    </div>

                    <button
                        className="btn-primary bg-blue-500 text-white px-4 py-2 rounded"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p className="mt-4">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-500 underline">
                        Log in here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;

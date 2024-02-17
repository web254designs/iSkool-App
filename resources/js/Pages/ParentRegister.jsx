import React from 'react';
import { Link, useForm } from '@inertiajs/inertia-react';

const RegisterParent = () => {
    const [passwordStrength, setPasswordStrength] = React.useState('');
    const [isEmailValid, setIsEmailValid] = React.useState(true);
    const [passwordMatch, setPasswordMatch] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);

    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'parent',
        phone_number: '',
        gender: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);

        if (name === 'password') {
            checkPasswordStrength(value);
            checkPasswordMatch(value, data.password_confirmation);
        } else if (name === 'password_confirmation') {
            checkPasswordMatch(data.password, value);
        } else if (name === 'email') {
            checkEmailFormat(value);
        }
    };

    const checkPasswordStrength = (password) => {
        // Implement your password strength logic here
        // For example, checking for a combination of uppercase, lowercase, and numbers
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        const moderateRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

        if (strongRegex.test(password)) {
            setPasswordStrength('Strong');
        } else if (moderateRegex.test(password)) {
            setPasswordStrength('Moderate');
        } else {
            setPasswordStrength('Weak');
        }
    };

    const checkPasswordMatch = (password, confirmPassword) => {
        setPasswordMatch(password === confirmPassword);
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
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Register as a Parent</h2>

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
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                passwordMatch ? '' : 'border-red-500'
                            }`}
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
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                passwordMatch ? '' : 'border-red-500'
                            }`}
                            id="password_confirmation"
                            type="password"
                            placeholder="Confirm your password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={handleInputChange}
                        />
                        {!passwordMatch && <p className="text-sm text-red-500">Passwords do not match</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone_number">
                            Phone Number
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phone_number"
                            type="text"
                            placeholder="Enter your phone number"
                            name="phone_number"
                            value={data.phone_number}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                            Gender
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="gender"
                            name="gender"
                            value={data.gender}
                            onChange={handleInputChange}
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                            Role
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="role"
                            name="role"
                            value="parent"
                            onChange={handleInputChange}
                        >
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

export default RegisterParent;

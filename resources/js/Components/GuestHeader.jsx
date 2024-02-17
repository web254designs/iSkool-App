import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/inertia-react';
import PropTypes from 'prop-types';
import { usePage } from '@inertiajs/inertia-react';

const GuestHeader = ({ user }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleDropdown = () => {
        console.log('Toggling dropdown');
        setDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        console.log('Closing dropdown');
        setDropdownOpen(false);
    };

    const toggleMobileMenu = () => {
        console.log('Toggling mobile menu');
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        console.log('Closing mobile menu');
        setMobileMenuOpen(false);
    };

    const { url } = usePage();

    useEffect(() => {
        console.log('Navigating to a new page. Closing dropdown and mobile menu.');
        // Close the dropdown and mobile menu when navigating to a new page
        setDropdownOpen(false);
        setMobileMenuOpen(false);
    }, [url]);

    return (
        <div className="relative min-h-12 flex items-center justify-between">
            <div className="flex items-center">
                {user ? (
                    <>
                        <Link href='/dashboard' className="text-sm text-gray-700 underline mr-4">Dashboard</Link>
                        {/* Additional links for user-specific actions */}
                    </>
                ) : (
                    <>
                        <span
                            onClick={toggleDropdown}
                            className="text-sm text-gray-700 cursor-pointer ml-4"
                        >
                            Register
                        </span>
                        <Link href='/login' className="ml-4 text-sm text-gray-700 underline">Log in</Link>
                        {/* Dropdown content */}
                        {isDropdownOpen && (
                            <div className="fixed inset-0 z-50 overflow-hidden">
                                <div className="absolute inset-0 overflow-hidden">
                                    <div
                                        onClick={closeDropdown}
                                        className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                                    ></div>
                                    <section className="absolute inset-y-0 right-0 pl-4 max-w-full flex">
                                        <div className="w-screen max-w-xs">
                                            <div className="h-full flex flex-col py-8 bg-white shadow-xl overflow-y-scroll">
                                                <div className="px-4 sm:px-6">
                                                    <h2 className="text-lg font-medium text-gray-900">
                                                        Register
                                                    </h2>
                                                </div>
                                                <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                                    <div className="py-1">
                                                        <Link
                                                            href='/register/student'
                                                            onClick={closeDropdown}
                                                            className="block px-4 py-2 text-sm text-gray-700"
                                                        >
                                                            Student
                                                        </Link>
                                                        <Link
                                                            href='/register/teacher'
                                                            onClick={closeDropdown}
                                                            className="block px-4 py-2 text-sm text-gray-700"
                                                        >
                                                            Teacher
                                                        </Link>
                                                        <Link
                                                            href='/register/parent'
                                                            onClick={closeDropdown}
                                                            className="block px-4 py-2 text-sm text-gray-700"
                                                        >
                                                            Parent
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden">
                <button
                    onClick={toggleMobileMenu}
                    className="text-gray-700 p-2 focus:outline-none focus:bg-gray-300"
                >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>

                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-50 overflow-hidden">
                        <div
                            onClick={closeMobileMenu}
                            className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        ></div>
                        <div className="absolute inset-y-0 right-0 pl-4 max-w-full flex">
                            <div className="w-screen max-w-xs">
                                <div className="h-full flex flex-col py-8 bg-white shadow-xl overflow-y-scroll">
                                    <div className="px-4 sm:px-6">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Menu
                                        </h2>
                                    </div>
                                    <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                        <div className="py-1">
                                            <Link
                                                href='/dashboard'
                                                onClick={closeMobileMenu}
                                                className="block px-4 py-2 text-sm text-gray-700"
                                            >
                                                Dashboard
                                            </Link>
                                            {!user && (
                                                <>
                                                    <Link
                                                        href='/login'
                                                        onClick={closeMobileMenu}
                                                        className="block px-4 py-2 text-sm text-gray-700"
                                                    >
                                                        Log in
                                                    </Link>
                                                    <span
                                                        onClick={toggleDropdown}
                                                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                                                    >
                                                        Register
                                                    </span>
                                                    {/* Additional links for registration */}
                                                    {isDropdownOpen && (
                                                        <div className="py-1">
                                                            <Link
                                                                href='/register/student'
                                                                onClick={closeMobileMenu}
                                                                className="block px-4 py-2 text-sm text-gray-700"
                                                            >
                                                                Student
                                                            </Link>
                                                            <Link
                                                                href='/register/teacher'
                                                                onClick={closeMobileMenu}
                                                                className="block px-4 py-2 text-sm text-gray-700"
                                                            >
                                                                Teacher
                                                            </Link>
                                                            <Link
                                                                href='/register/parent'
                                                                onClick={closeMobileMenu}
                                                                className="block px-4 py-2 text-sm text-gray-700"
                                                            >
                                                                Parent
                                                            </Link>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

GuestHeader.propTypes = {
    user: PropTypes.object,
};

export default GuestHeader;

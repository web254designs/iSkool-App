import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/inertia-react';
import CarouselComponent from '@/Components/Carousel';
import LargeButtons from '@/Components/LargeButtons';

const HeroSection = ({ appName, user }) => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Hero Section */}
            <div className="absolute top-1/8 w-full text-center">
                <h1 className="text-4xl font-bold mb-2 text-blue-600">Welcome to iSkool App{appName}</h1>
                <p className="text-lg text-gray-600 mb-6">
                    Elevate your learning experience with our Competency-Based Curriculum (CBC) School App.
                </p>

                <p className="text-lg text-gray-800 mb-2">
                    {user ? `Hello, ${user.name}!` : 'Explore, interact, and excel in your education journey.'}
                </p>

                {user ? (
                    <Link href='/dashboard' className="btn-primary bg-blue-500 text-white px-4 py-2 rounded">Go to Dashboard</Link>
                ) : <CarouselComponent />}
                <div className="relative block bottom-6"><LargeButtons /></div>
            </div>
        </div>
  );
};

HeroSection.propTypes = {
    user: PropTypes.object, // Adjust the type according to your actual user object structure
    appName: PropTypes.string,
    variant: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6", "lead", "paragraph", "small"]).isRequired,
};

export default HeroSection;

import React from 'react';
import PropTypes from 'prop-types';
import GuestHeader from '@/Components/GuestHeader';
import HeroSection from '@/Components/HeroSection';
import { Footer } from '@/Components/Footer';

const Frontpage = ({ canLogin, user }) => {
    return (
        <div>
            {canLogin && <GuestHeader user={user} />}
            <HeroSection />


        </div>
    );
};

Frontpage.propTypes = {
    canLogin: PropTypes.bool.isRequired,
    user: PropTypes.object,
};

export default Frontpage;

import React from 'react';

const MobileMenu = ({ toggleDropdown }) => {
  return (
    <div className="sm:hidden absolute top-0 right-0 px-6 py-4">
      <button onClick={toggleDropdown} className="text-gray-700 focus:outline-none">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>
  );
};

export default MobileMenu;

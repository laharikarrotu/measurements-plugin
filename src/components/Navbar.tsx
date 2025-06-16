import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-40 p-4 bg-gray-800 shadow-lg">
      <div className="container flex items-center justify-between mx-auto">
        <Link 
          to="/" 
          className={`text-white text-2xl font-bold transition duration-300 ${
            isActive('/') ? 'text-blue-300' : 'hover:text-blue-300'
          }`}
        >
          Measurements App
        </Link>
        <div className="space-x-4">
          <Link 
            to="/" 
            className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
              isActive('/') 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/customers" 
            className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
              isActive('/customers') 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            Customers
          </Link>
          <Link 
            to="/measurements" 
            className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
              isActive('/measurements') 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            All Measurements
          </Link>
          <Link 
            to="/add" 
            className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
              isActive('/add') 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            Add New Measurement
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
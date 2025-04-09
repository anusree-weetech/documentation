import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="bg-blue-500 text-white flex justify-between items-center p-4">
      <h1 className="text-xl font-bold">User Management App</h1>
      <div className="flex items-center space-x-4">
        {!isAuthenticated ? (
          <>
            <button className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200">
              Login
            </button>
            <button className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200">
              Register
            </button>
          </>
        ) : (
          <div className="flex items-center space-x-2 cursor-pointer hover:opacity-80">
            <img
              src={user?.picture}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span>{user?.name}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

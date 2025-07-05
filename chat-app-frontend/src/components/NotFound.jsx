import React from 'react';
import notFoundImg from '../assets/404.svg'; // Use any cool 404 illustration here


const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="p-8 dark:border-gray-700 border w-full max-w-xl rounded dark:bg-gray-900 shadow flex flex-col items-center gap-6">
        <img src={notFoundImg} alt="404 Not Found" className="w-full max-h-72 object-contain" />
        <h1 className="text-3xl font-bold text-center">Oops! Page not found</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center">
          The page you're looking for doesn’t exist or has been moved.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
import React from 'react';
import { FaLeaf } from 'react-icons/fa';

const Loader = () => {
  const message = 'Loading...';

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 flex items-center justify-center z-50 transition-colors duration-200">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto animate-pulse shadow-lg">
            <FaLeaf className="w-10 h-10 text-white animate-bounce" />
          </div>
          {/* Rotating Ring */}
          <div className="absolute inset-0 w-20 h-20 border-4 border-green-200 dark:border-green-800 border-t-green-500 rounded-full animate-spin mx-auto"></div>
        </div>

        {/* Loading Text */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {message}
        </h3>
        
        {/* Progress Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>

        {/* Loading Bar */}
        <div className="mt-6 w-64 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mx-auto">
          <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
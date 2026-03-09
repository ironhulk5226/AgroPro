import React, { useState, useEffect } from 'react';

const InternetStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflinePopup, setShowOfflinePopup] = useState(false);
  const [showOnlinePopup, setShowOnlinePopup] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflinePopup(false);
      
      // Show online popup for 5 seconds
      setShowOnlinePopup(true);
      setTimeout(() => {
        setShowOnlinePopup(false);
      }, 5000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOnlinePopup(false);
      setShowOfflinePopup(true);
      
      // Hide popup after 5 seconds
      setTimeout(() => {
        setShowOfflinePopup(false);
      }, 5000);
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Show offline popup
  if (showOfflinePopup) {
    return (
      <div className="fixed top-4 max-md:top-10 left-1/2 transform -translate-x-1/2 z-[9999] animate-pulse">
        <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">No Internet Connection</p>
            <p className="text-xs opacity-90">Please check your network settings</p>
          </div>
          <button
            onClick={() => setShowOfflinePopup(false)}
            className="flex-shrink-0 text-white hover:text-red-200 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Show online popup
  if (showOnlinePopup) {
    return (
      <div className="fixed top-4 max-md:top-10 left-1/2 transform -translate-x-1/2 z-[9999] animate-bounce">
        <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">You're back online!</p>
            <p className="text-xs opacity-90">Internet connection restored</p>
          </div>
          <button
            onClick={() => setShowOnlinePopup(false)}
            className="flex-shrink-0 text-white hover:text-green-200 transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // Don't render anything when both popups are hidden
  return null;
};

export default InternetStatus;
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSun, BsMoon } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InternetStatus from "./InternetStatus";

// Custom CSS for Google Translate widget
const translateStyles = `
  #google_element .goog-te-combo {
    background: linear-gradient(135deg, #e8f5e9, #f1f8e9);
    border: 1.5px solid #4caf50;
    border-radius: 8px;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: 500;
    color: #2e7d32;
    outline: none;
    cursor: pointer;
    appearance: auto;
    transition: all 0.2s ease;
    box-shadow: 0 1px 3px rgba(76, 175, 80, 0.15);
  }

  #google_element .goog-te-combo:hover {
    background: linear-gradient(135deg, #c8e6c9, #dcedc8);
    border-color: #388e3c;
    box-shadow: 0 2px 6px rgba(76, 175, 80, 0.25);
  }

  #google_element .goog-te-combo:focus {
    border-color: #2e7d32;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.3);
  }

  [data-theme="dark"] #google_element .goog-te-combo {
    background: linear-gradient(135deg, #1b3a1b, #1a2e1a);
    border-color: #4caf50;
    color: #81c784;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  [data-theme="dark"] #google_element .goog-te-combo:hover {
    background: linear-gradient(135deg, #254025, #223822);
    border-color: #66bb6a;
    box-shadow: 0 2px 6px rgba(76, 175, 80, 0.3);
  }

  [data-theme="dark"] #google_element .goog-te-combo:focus {
    border-color: #81c784;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.25);
  }

  .goog-te-banner-frame.skiptranslate {
    display: none !important;
  }

  body {
    top: 0 !important;
  }

  /* Hide the Google Translate attribution */
  .goog-logo-link,
  .goog-te-gadget > span {
    display: none !important;
  }
  .goog-te-gadget {
    font-size: 0 !important;
    line-height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  #google_element {
    line-height: 0;
  }
`;

// Inject styles once
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = translateStyles;
  document.head.appendChild(style);
}


function Header() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_AUTH_API_BASE_URL}/api/user/logout`,
        {
          withCredentials: true,
        }
      );

      toast(` ${response.data.message}`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        className: "agricultural-toast",
        bodyClassName: "agricultural-toast-body",
        style: {
          background: "#f0f8e6",
          border: "1px solid #4caf50",
          borderLeft: "5px solid #4caf50",
        },
        bodyStyle: {
          color: "#2e7d32",
          fontWeight: "500",
        },
      });

      // Navigate only after successful toast
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Logout failed.";

      toast(` ${errorMessage}`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        className: "agricultural-toast",
        bodyClassName: "agricultural-toast-body",
        style: {
          background: "#fdf3f2",
          border: "1px solid #e57373",
          borderLeft: "5px solid #e57373",
        },
        bodyStyle: {
          color: "#c62828",
          fontWeight: "500",
        },
      });

      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      // Default to light mode if no preference or light preference
      setDarkMode(false);
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }

    // Load Google Translate script only once
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=loadGoogleTranslate";
      script.async = true;
      document.head.appendChild(script);
    }

    // Simple callback — matches the old site's implementation
    window.loadGoogleTranslate = function () {
      new google.translate.TranslateElement("google_element");
    };

    return () => {
      delete window.loadGoogleTranslate;
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('header') && !event.target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Handle mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
    
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isMenuOpen]);

  const toggleTheme = () => {
    if (darkMode) {
      setDarkMode(false);
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const navItems = [
    { label: "Home", path: "/home" },
    { label: "About", path: "/about" },
    { label: "Features", path: "/features" },
    { label: "Achievements", path: "/achievements" },
    { label: "Feedback", path: "/feedback" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      <InternetStatus />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        icon={({ type }) => (
          <div style={{ fontSize: "24px" }}>
            {type === "success"
              ? "🌱"
              : type === "error"
              ? "🍂"
              : type === "warning"
              ? "🌾"
              : "🌿"}
          </div>
        )}
        toastStyle={{
          borderRadius: "8px",
          background: "#f0f8e6",
          boxShadow: "0 4px 12px rgba(76, 175, 80, 0.15)",
        }}
      />

      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f1f3f1] dark:border-b-gray-700 px-4 md:px-6 lg:px-10 py-4 bg-white dark:bg-gray-900 transition-colors duration-200 relative z-[60] h-37 max-md:h-35">
        <div className="flex items-center gap-2 md:gap-4 text-[#131613] dark:text-white transition-colors duration-200">
          {/* Logo  */}
          <img 
            src="/Team-Indra-Logo.png" 
            alt="Team Indra Logo" 
            className="w-10 h-10 md:w-12 md:h-12 lg:w-15 lg:h-15 object-contain rounded-lg hover:scale-110 transition-all duration-200 cursor-pointer shadow-md border border-gray-200 dark:border-gray-600 p-1 bg-white dark:bg-gray-700"
            onClick={()=>navigate('/home')}
          />
          <h2 className="text-[#131613] dark:text-white text-sm md:text-lg font-bold leading-tight tracking-[-0.015em] transition-colors duration-200">
            TEAM INDRA
          </h2>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-end">
          <div className="flex items-center gap-6">
            <nav className="flex items-center space-x-6">
              {navItems.map(({ label, path }) => (
                <Link
                  key={label}
                  to={path}
                  className={`text-[#131613] dark:text-white text-sm font-medium leading-normal hover:text-green-700 dark:hover:text-green-400 transition-colors duration-200 ${
                    location.pathname === path
                      ? "text-green-700 dark:text-green-400"
                      : ""
                  }`}
                >
                  {label}
                </Link>
              ))}
              {/* Logout Button
              <button
                onClick={() => handleLogout()}
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#daf0da] dark:bg-green-700 text-[#131613] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-green-600 dark:hover:bg-green-600 transition-colors duration-200"
              >
                Logout
              </button> */}
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 cursor-pointer text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200"
              >
                {darkMode ? <BsMoon size={20} /> : <BsSun size={20} />}
              </button>
            </nav>
          </div>
        </div>
        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Theme Toggle on Mobile */}
          <button
            onClick={toggleTheme}
            className="p-2 cursor-pointer text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200"
          >
            {darkMode ? <BsMoon size={20} /> : <BsSun size={20} />}
          </button>
          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-[#131613] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </header>

      {/* Language Selector — compact, top-right, below navbar */}
      <div className={`flex justify-end bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 relative ${isMenuOpen ? 'z-[30]' : 'z-[60]'}`}>
        <div className="inline-flex items-center py-1.5 gap-2">
          <span className="text-xs text-green-700 dark:text-green-400 font-semibold whitespace-nowrap tracking-wide">🌐 Language:</span>
          <div id="google_element"></div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu-container lg:hidden fixed inset-x-0 top-[160px] max-md:top-[140px] bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out z-[101] shadow-lg overflow-y-auto max-h-[calc(100vh-160px)] max-md:max-h-[calc(100vh-140px)] ${
        isMenuOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-full invisible"
      }`}>
        <nav className="flex flex-col px-4 py-4 space-y-2">
          {navItems.map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              onClick={() => setIsMenuOpen(false)}
              className={`text-[#131613] dark:text-white text-base font-medium py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 ${
                location.pathname === path
                  ? "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                  : ""
              }`}
            >
              {label}
            </Link>
          ))}
          {/* <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center justify-center rounded-lg h-12 px-4 bg-[#daf0da] dark:bg-green-700 text-[#131613] dark:text-white text-base font-bold hover:bg-green-600 dark:hover:bg-green-600 transition-colors duration-200"
            >
              Logout
            </button>
          </div> */}
        </nav>
      </div>
    </>
  );
}

export default Header;
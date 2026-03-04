import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSun, BsMoon } from "react-icons/bs";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Custom CSS for Google Translate widget
const translateStyles = `
  .translate-widget .goog-te-combo {
    background: #f1f3f1;
    border: 1px solid #dce5dc;
    border-radius: 6px;
    padding: 4px 8px;
    font-size: 12px;
    color: #131613;
    outline: none;
    cursor: pointer;
  }
  
  .translate-widget .goog-te-combo:hover {
    background: #e8f5e8;
  }
  
  [data-theme="dark"] .translate-widget .goog-te-combo {
    background: #374151;
    border-color: #4b5563;
    color: white;
  }
  
  [data-theme="dark"] .translate-widget .goog-te-combo:hover {
    background: #4b5563;
  }
  
  .goog-te-banner-frame.skiptranslate {
    display: none !important;
  }
  
  body {
    top: 0 !important;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = translateStyles;
  document.head.appendChild(style);
}


function Header() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
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

    // Load Google Translate script
    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=loadGoogleTranslate";
    script.async = true;
    document.head.appendChild(script);

    // Define the callback function
    window.loadGoogleTranslate = function() {
      new window.google.translate.TranslateElement({ pageLanguage: 'en' }, "google_element");
    };

    return () => {
      // Cleanup script on component unmount
      const existingScript = document.querySelector('script[src*="translate.google.com"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
      delete window.loadGoogleTranslate;
    };
  }, []);

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
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f1f3f1] dark:border-b-gray-800 px-10 py-3 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="flex items-center gap-4 text-[#131613] dark:text-white transition-colors duration-200">
          {/* Logo  */}
          <img 
            src="/Team-Indra-Logo.png" 
            alt="Team Indra Logo" 
            className="w-15 h-15 object-contain rounded-lg hover:scale-110 transition-all duration-200 cursor-pointer shadow-md border border-gray-200 dark:border-gray-600 p-1 bg-white dark:bg-gray-700"
            onClick={()=>navigate('/home')}
          />
          <h2 className="text-[#131613] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] transition-colors duration-200">
            TEAM INDRA
          </h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <nav className="flex space-x-4">
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
            </nav>
          </div>
          {/* Google Translate */}
          <div className="flex items-center">
            <div id="google_element" className="translate-widget"></div>
          </div>
          <div className="flex gap-2 mt-5">
            <div className="flex gap-2">
              <button
                onClick={() => handleLogout()}
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#daf0da] dark:bg-green-700 text-[#131613] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-green-600 dark:hover:bg-green-600 transition-colors duration-200"
              >
                logout
              </button>
            </div>
            <div className="flex max-w-[480px] items-center justify-center overflow-hidden rounded-full h-10 bg-[#f1f3f1] dark:bg-gray-800 text-[#131613] dark:text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 transition-colors duration-200">
              <div className="text-[#131613] dark:text-white transition-colors duration-200">
                {/* Sun SVG - light/dark mode */}
                <button
                  onClick={toggleTheme}
                  className="p-1 cursor-pointer text-green-600 dark:text-green-400 hover:bg-green-300 dark:hover:bg-green-700 rounded-full transition-all duration-200"
                >
                  {darkMode ? <BsMoon size={24} /> : <BsSun size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
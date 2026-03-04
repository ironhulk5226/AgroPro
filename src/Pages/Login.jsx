import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/ToastStyles.css";
import { FaSpinner } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";


const Login = () => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Scroll to top when component mounts and hide loader
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_AUTH_API_BASE_URL}/api/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast(` ${response.data.message} to AgroPro!`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        className: "agricultural-toast success-toast",
        bodyClassName: "agricultural-toast-body",
        style: {
          background: "linear-gradient(135deg, #f0f8e6 0%, #e8f5e8 100%)",
          border: "1px solid #4caf50",
          borderLeft: "4px solid #4caf50",
          borderRadius: "12px",
          boxShadow:
            "0 8px 32px rgba(76, 175, 80, 0.2), 0 2px 8px rgba(76, 175, 80, 0.1)",
          backdropFilter: "blur(10px)",
          fontFamily: 'Lexend, "Noto Sans", sans-serif',
        },
        bodyStyle: {
          color: "#2e7d32",
          fontWeight: "600",
          fontSize: "14px",
          letterSpacing: "0.01em",
        },
        progressStyle: {
          background: "linear-gradient(90deg, #4caf50, #66bb6a)",
        },
      });

      setTimeout(() => navigate("/home"), 1500);
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        error?.response?.data?.message ||
        "Login failed. Please check your credentials.";
      toast(` ${errorMessage}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        type: "error",
        className: "agricultural-toast error-toast",
        bodyClassName: "agricultural-toast-body",
        style: {
          background: "linear-gradient(135deg, #fdf3f2 0%, #fce8e6 100%)",
          border: "1px solid #e57373",
          borderLeft: "4px solid #e57373",
          borderRadius: "12px",
          boxShadow:
            "0 8px 32px rgba(229, 115, 115, 0.2), 0 2px 8px rgba(229, 115, 115, 0.1)",
          backdropFilter: "blur(10px)",
          fontFamily: 'Lexend, "Noto Sans", sans-serif',
        },
        bodyStyle: {
          color: "#c62828",
          fontWeight: "600",
          fontSize: "14px",
          letterSpacing: "0.01em",
        },
        progressStyle: {
          background: "linear-gradient(90deg, #e57373, #ef5350)",
        },
      });
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white dark:bg-gray-900 group/design-root overflow-x-hidden transition-colors duration-200"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      {isPageLoading && <Loader />}
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
          <div
            style={{
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background:
                type === "success"
                  ? "rgba(76, 175, 80, 0.1)"
                  : type === "error"
                  ? "rgba(229, 115, 115, 0.1)"
                  : "rgba(76, 175, 80, 0.1)",
              marginRight: "8px",
            }}
          >
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
          borderRadius: "12px",
          background: "linear-gradient(135deg, #f0f8e6 0%, #e8f5e8 100%)",
          boxShadow:
            "0 8px 32px rgba(76, 175, 80, 0.2), 0 2px 8px rgba(76, 175, 80, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(76, 175, 80, 0.2)",
          fontFamily: 'Lexend, "Noto Sans", sans-serif',
          minHeight: "64px",
          padding: "12px 16px",
        }}
      />
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center items-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 flex-1 items-center">
            <h2 className="text-[#131613] dark:text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5 transition-colors duration-200">
              Welcome Back
            </h2>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex max-w-[480px] w-full justify-center flex-wrap items-center gap-4 px-4 py-3 mx-auto">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#131613] dark:text-white text-base font-medium leading-normal pb-2 transition-colors duration-200">
                    Email
                  </p>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#131613] dark:text-white focus:outline-0 focus:ring-0 border border-[#dee3de] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#4caf50] dark:focus:border-green-500 h-14 placeholder:text-[#6c7f6c] dark:placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal transition-colors duration-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
              </div>

              <div className="flex max-w-[480px] w-full flex-wrap items-center gap-4 px-4 py-3 mx-auto">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#131613] dark:text-white text-base font-medium leading-normal pb-2 transition-colors duration-200">
                    Password
                  </p>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#131613] dark:text-white focus:outline-0 focus:ring-0 border border-[#dee3de] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#4caf50] dark:focus:border-green-500 h-14 placeholder:text-[#6c7f6c] dark:placeholder:text-gray-400 p-[15px] pr-12 text-base font-normal leading-normal transition-colors duration-200"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-green-700 dark:text-green-500 focus:outline-none transition-colors duration-200"
                    >
                      {showPassword ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <FiEye size={20} />
                      )}
                    </button>
                  </div>
                </label>
              </div>

              <div className="flex px-4 py-3 w-full justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-[#daf0da] dark:bg-green-800 text-[#131613] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-green-600 hover:text-white dark:hover:bg-green-700 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <FaSpinner className="animate-spin mr-2" />
                      <span className="truncate">Logging in...</span>
                    </div>
                  ) : (
                    <span className="truncate">Login</span>
                  )}
                </button>
              </div>
            </form>

            <p
              className="text-[#6c7f6c] dark:text-gray-400 text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Don't have an account? Sign up
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
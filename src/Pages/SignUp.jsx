import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import "../components/ToastStyles.css";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function SignUp() {
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
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [city, setCity] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [isLoading, setIsLoading] = useState(false);


   const handleSubmit = async(e) => {
     e.preventDefault();
     setIsLoading(true);
     try {
         const response = await axios.post(`${import.meta.env.VITE_AUTH_API_BASE_URL}/api/user/register`,{
          name,
          email,
          city,
          password
         },{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true
         }).then(()=>setTimeout(()=>navigate('/login'),1500));

         toast('Registration successful! Welcome to AgroPro!', {
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
              borderLeft: "5px solid #4caf50"
            },
            bodyStyle: {
              color: "#2e7d32",
              fontWeight: "500"
            }
            });

         console.log(response)
     } catch (error) {
        setIsLoading(false);
        toast(error.response.data.message, {
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
          className: "agricultural-toast",
          bodyClassName: "agricultural-toast-body",
          style: {
            background: "#fdf3f2",
            border: "1px solid #e57373",
            borderLeft: "5px solid #e57373"
          },
          bodyStyle: {
            color: "#c62828",
            fontWeight: "500"
          }
        });
        console.error("Registration error:", error);
     } finally {
         // In case of success, we keep the loading state until the toast notification is shown
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
        position="top-right"
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
            {type === "success" ? "🌱" : type === "error" ? "🍂" : type === "warning" ? "🌾" : "🌿"}
          </div>
        )}
        toastStyle={{
          borderRadius: "8px",
          background: "#f0f8e6",
          boxShadow: "0 4px 12px rgba(76, 175, 80, 0.15)"
        }}
        />
    <div className="layout-container flex h-full grow flex-col">
      {/* Header */}
      {/* <Header /> */}

      {/* Main signup form */}
      <div className="flex flex-1 justify-center items-center py-5">
        <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1 items-center">
          <h2 className="text-[#131613] dark:text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5 transition-colors duration-200">Create an Account</h2>
          
          <form onSubmit={handleSubmit} className="w-full">
            {/* Name Field */}
            <div className="flex max-w-[480px] w-full flex-wrap items-center gap-4 px-4 py-3 mx-auto">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#131613] dark:text-white text-base font-medium leading-normal pb-2 transition-colors duration-200">Name</p>
                <input
                  placeholder="Enter your name"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#131613] dark:text-white focus:outline-0 focus:ring-0 border border-[#dee3de] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#dee3de] dark:focus:border-gray-600 h-14 placeholder:text-[#6c7f6c] dark:placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal transition-colors duration-200"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
            </div>

            {/* Email Field */}
            <div className="flex max-w-[480px] w-full flex-wrap items-center gap-4 px-4 py-3 mx-auto">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#131613] dark:text-white text-base font-medium leading-normal pb-2 transition-colors duration-200">Email</p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#131613] dark:text-white focus:outline-0 focus:ring-0 border border-[#dee3de] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#dee3de] dark:focus:border-gray-600 h-14 placeholder:text-[#6c7f6c] dark:placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal transition-colors duration-200"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>

            {/* City Field */}
            <div className="flex max-w-[480px] w-full flex-wrap items-center gap-4 px-4 py-3 mx-auto">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#131613] dark:text-white text-base font-medium leading-normal pb-2 transition-colors duration-200">City</p>
                <input
                  type="text"
                  placeholder="Enter your city"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#131613] dark:text-white focus:outline-0 focus:ring-0 border border-[#dee3de] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#dee3de] dark:focus:border-gray-600 h-14 placeholder:text-[#6c7f6c] dark:placeholder:text-gray-400 p-[15px] text-base font-normal leading-normal transition-colors duration-200"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </label>
            </div>

            {/* Password Field with Eye Button */}
            <div className="flex max-w-[480px] w-full flex-wrap items-center gap-4 px-4 py-3 mx-auto">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#131613] dark:text-white text-base font-medium leading-normal pb-2 transition-colors duration-200">
                  Password
                </p>
                <div className="relative w-full">
                  <input
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#131613] dark:text-white focus:outline-0 focus:ring-0 border border-[#dee3de] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#dee3de] dark:focus:border-gray-600 h-14 placeholder:text-[#6c7f6c] dark:placeholder:text-gray-400 p-[15px] pr-12 text-base font-normal leading-normal transition-colors duration-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-green-700 dark:text-green-500 focus:outline-none transition-colors duration-200"
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </label>
            </div>

            {/* Sign Up Button */}
            <div className="flex px-4 py-3 w-full justify-center">
              <button 
                type="submit"
                disabled={isLoading}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-[#daf0da] dark:bg-green-800 text-[#131613] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-green-700 dark:hover:bg-green-700 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" />
                    <span className="truncate">Signing up...</span>
                  </div>
                ) : (
                  <span className="truncate">Sign Up</span>
                )}
              </button>
            </div>
          </form>

          <p 
            className="text-[#6c7f6c] dark:text-gray-400 cursor-pointer text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
            onClick={() => navigate('/login')}
          >
            Already have an account? Login
          </p>
        </div>
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  </div>
  )
};

export default SignUp;

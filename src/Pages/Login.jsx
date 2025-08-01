import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <Header />

        {/* Main login form */}
        <div className="flex flex-1 justify-center items-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1 items-center">
            <h2 className="text-[#131613] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Login to your Account</h2>

            {/* Email Field */}
            <div className="flex max-w-[480px] w-full flex-wrap items-center gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#131613] text-base font-medium leading-normal pb-2">Email</p>
                <input
                  placeholder="Enter your email"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#131613] focus:outline-0 focus:ring-0 border border-[#dee3de] bg-white focus:border-[#dee3de] h-14 placeholder:text-[#6c7f6c] p-[15px] text-base font-normal leading-normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>

            {/* Password Field */}
            <div className="flex max-w-[480px] w-full flex-wrap items-center gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#131613] text-base font-medium leading-normal pb-2">Password</p>
                <div className="relative w-full">
                  <input
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#131613] focus:outline-0 focus:ring-0 border border-[#dee3de] bg-white focus:border-[#dee3de] h-14 placeholder:text-[#6c7f6c] p-[15px] pr-12 text-base font-normal leading-normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-green-700 focus:outline-none"
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </label>
            </div>

            {/* Login Button */}
            <div className="flex px-4 py-3 w-full justify-center">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-[#daf0da] text-[#131613] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-green-700">
                <span className="truncate">Login</span>
              </button>
            </div>

            <p className="text-[#6c7f6c] cursor-pointer text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline hover:text-black">
              Don’t have an account? Sign Up
            </p>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default Login;

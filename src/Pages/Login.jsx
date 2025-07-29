import React from "react";
import Header from "../components/Header";
const Login = () => (
  <div
    className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
    style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
  >
    <div className="layout-container flex h-full grow flex-col">
      {/* Header */}
      <Header/>
 

      {/* Main login form */}
      <div className="flex flex-1 justify-center items-center py-5">
        <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1 items-center">
          <h2 className="text-[#131613] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Welcome Back</h2>
          <div className="flex max-w-[480px] w-full justify-center flex-wrap items-center gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#131613] text-base font-medium leading-normal pb-2">Email</p>
              <input
                placeholder="Enter your email"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#131613] focus:outline-0 focus:ring-0 border border-[#dee3de] bg-white focus:border-[#dee3de] h-14 placeholder:text-[#6c7f6c] p-[15px] text-base font-normal leading-normal"
                value=""
                onChange={() => {}}
              />
            </label>
          </div>
          <div className="flex max-w-[480px] w-full flex-wrap items-center gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#131613] text-base font-medium leading-normal pb-2">Password</p>
              <input
                placeholder="Enter your password"
                type="password"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#131613] focus:outline-0 focus:ring-0 border border-[#dee3de] bg-white focus:border-[#dee3de] h-14 placeholder:text-[#6c7f6c] p-[15px] text-base font-normal leading-normal"
                value=""
                onChange={() => {}}
              />
            </label>
          </div>
          <p className="text-[#6c7f6c] text-sm font-normal leading-normal pb-3 pt-1 px-4 underline">Forgot Password?</p>
          <div className="flex px-4 py-3 w-full justify-center">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-[#daf0da] text-[#131613] text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Login</span>
            </button>
          </div>
          <p className="text-[#6c7f6c] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">Or sign in with</p>
          <div className="flex justify-center">
            <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f1f3f1] text-[#131613] text-sm font-bold leading-normal tracking-[0.015em] grow">
                <span className="truncate">Continue with Google</span>
              </button>
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#f1f3f1] text-[#131613] text-sm font-bold leading-normal tracking-[0.015em] grow">
                <span className="truncate">Continue with Facebook</span>
              </button>
            </div>
          </div>
          <p className="text-[#6c7f6c] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline">
            Don't have an account? Sign up
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex justify-center">
        <div className="flex max-w-[960px] flex-1 flex-col">
          <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
            <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
              <a className="text-[#6c7f6c] text-base font-normal leading-normal min-w-40" href="#">Privacy Policy</a>
              <a className="text-[#6c7f6c] text-base font-normal leading-normal min-w-40" href="#">Terms of Service</a>
              <a className="text-[#6c7f6c] text-base font-normal leading-normal min-w-40" href="#">Contact Us</a>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {/* Twitter */}
              <a href="#">
                <div className="text-[#6c7f6c]">
                  <svg width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"></path>
                  </svg>
                </div>
              </a>
              {/* Facebook */}
              <a href="#">
                <div className="text-[#6c7f6c]">
                  <svg width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"></path>
                  </svg>
                </div>
              </a>
              {/* Instagram */}
              <a href="#">
                <div className="text-[#6c7f6c]">
                  <svg width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                  </svg>
                </div>
              </a>
            </div>
            <p className="text-[#6c7f6c] text-base font-normal leading-normal">© 2024 TIFAN. All rights reserved.</p>
          </footer>
        </div>
      </footer>
    </div>
  </div>
);

export default Login;

import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="flex justify-center">
        <div className="flex max-w-[960px] flex-1 flex-col">
          <div className="flex flex-col gap-6 px-5 py-10 text-center">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:flex-row sm:justify-around">
              <a
                className="text-[#618961] text-base font-normal leading-normal min-w-40"
                href="#"
              >
                Privacy Policy
              </a>
              <a
                className="text-[#618961] text-base font-normal leading-normal min-w-40"
                href="#"
              >
                Terms of Service
              </a>
              <a
                className="text-[#618961] text-base font-normal leading-normal min-w-40"
                href="#"
              >
                Contact Us
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#">
                <div className="text-[#618961]">
                  {/* Twitter Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57..." />
                  </svg>
                </div>
              </a>
              <a href="#">
                <div className="text-[#618961]">
                  {/* Facebook Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M128,24A104,104,0,1,0,232,128..." />
                  </svg>
                </div>
              </a>
              <a href="#">
                <div className="text-[#618961]">
                  {/* Instagram Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M128,80a48,48,0,1,0,48,48..." />
                  </svg>
                </div>
              </a>
            </div>
            <p className="text-[#618961] text-base font-normal leading-normal">
              © 2024 Agro-Pro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="flex justify-center">
        <div className="flex max-w-[960px] flex-1 flex-col">
          <div className="flex flex-col gap-6 px-5 py-10 text-center">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:flex-row sm:justify-around">
              <a
                className="black text-base font-bold leading-normal min-w-40 hover:text-green-700"
                href="#"
              >
                Privacy Policy
              </a>
              <a
                className="black text-base font-bold leading-normal min-w-40 hover:text-green-700"
                href="#"
              >
                Terms of Service
              </a>
              <a
                className="black text-base font-bold leading-normal min-w-40 hover:text-green-700"
                href="#"
              >
                Contact Us
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/team-indra-gcek/mycompany/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border-2 border-green-700 rounded-md text-green-700 hover:bg-green-700 hover:text-white transition-colors duration-200"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border-2 border-green-700 rounded-md text-green-700 hover:bg-green-700 hover:text-white transition-colors duration-200"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/team_indra_24/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border-2 border-green-700 rounded-md text-green-700 hover:bg-green-700 hover:text-white transition-colors duration-200"
              >
                <FaInstagram className="w-5 h-5" />
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

import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <footer className="flex justify-center bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="flex max-w-6xl w-full flex-1 flex-col">
          <div className="flex flex-col gap-4 sm:gap-6 px-4 sm:px-5 py-6 sm:py-10 text-center">
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 sm:justify-around">
              <a
                className="text-black dark:text-white text-sm sm:text-base font-bold leading-normal min-w-32 sm:min-w-40 hover:text-green-700 dark:hover:text-green-400 transition-colors duration-200 cursor-pointer"
                onClick={()=>navigate('/gallery')}
              >
                Gallery
              </a>
              <a
                className="text-black dark:text-white text-sm sm:text-base font-bold leading-normal min-w-32 sm:min-w-40 hover:text-green-700 dark:hover:text-green-400 transition-colors duration-200"
                href="#"
              >
                Terms of Service
              </a>
              <a
                className="text-black dark:text-white text-sm sm:text-base font-bold leading-normal min-w-32 sm:min-w-40 hover:text-green-700 dark:hover:text-green-400 transition-colors duration-200"
                href="/contact"
              >
                Contact Us
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/team-indra-gcek/mycompany/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border-2 border-green-700 dark:border-green-500 rounded-md text-green-700 dark:text-green-500 hover:bg-green-700 dark:hover:bg-[#14b714] hover:text-white dark:hover:text-white transition-colors duration-200"
              >
                <FaLinkedinIn className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/team_indra_24/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border-2 border-green-700 dark:border-green-500 rounded-md text-green-700 dark:text-green-500 hover:bg-green-700 dark:hover:bg-[#14b714] hover:text-white dark:hover:text-white transition-colors duration-200"
              >
                <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
            <p className="text-[#618961] dark:text-gray-400 text-sm sm:text-base font-normal leading-normal transition-colors duration-200">
              © 2026 Agro-Pro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { HiOutlineChartBar } from "react-icons/hi";
import { FaLeaf } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";
import StickyButtons from "../components/StickyButtons";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-200">
      {/*Nav Bar*/}
      <Header />
      {/* StickyButtons */}
      <StickyButtons/>
      {/*Hero Section*/}
      <div className="px-40 flex flex-1 justify-center py-5 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          {/* Hero Section */}
          <div className="@container">
            <div className="@[480px]:p-4">
              <div
                className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCEqxc6ybMrFwcqUxFjEJLD3i5NrEvWREXXMjMuY1LU6k6chEat0688O2EssCBDC9-5rfnVNkOWEcEA5dIaEzlPxCUzlsAziIchFerntMJKhGVz2ExZ-IreE7nCVkGwfjnotsZG7zAJFuzJPKyevJqkbOdZW3_XUaUYIUJWkxMkJAKw6ewRnfY2CH0JuEJMW3r_egJX_vMCXSEKPSyJ4dLmSDd_uAD3Vpf7kQie6Y656ccbzthUn0_6JIPFRXyyjpQlb-WjG9E0B0P2")`,
                }}
              >
                <div className="flex flex-col gap-2 text-center">
                  <h1 className="text-white dark:text-gray-100 text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] transition-colors duration-200">
                    Revolutionizing Farming with AI and Mechanization
                  </h1>
                  <h2 className="text-white dark:text-gray-200 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal transition-colors duration-200">
                    Team INDRA's TIFAN agricultural machine combines artificial
                    intelligence and advanced mechanics to transform farming
                    practices.
                  </h2>
                </div>
                <div className="flex-wrap gap-3 flex justify-center">
                  <Link to="/form">
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#11d411] dark:bg-green-600 text-[#111811] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:bg-green-600 dark:hover:bg-green-700">
                    <span className="truncate">Explore TIFAN</span>
                  </button>
                  </Link>
                  <Link to="/chatbot">
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#f0f4f0] dark:bg-gray-700 text-[#111811] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:bg-[#14b714] dark:hover:bg-green-600">
                    <span className="truncate">Try AgroChat</span>
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features Section */}
          <div className="flex flex-col gap-10 px-4 py-10 @container">
            <div className="flex flex-col gap-4">
              <h1 className="text-[#111811] dark:text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px] transition-colors duration-200">
                Key Features of TIFAN
              </h1>
              <p className="text-[#111811] dark:text-gray-300 text-base font-normal leading-normal max-w-[720px] transition-colors duration-200">
                TIFAN integrates AI and mechanization to enhance farming
                efficiency and sustainability.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
              {/* Card 1 */}
              <div className="flex flex-1 gap-3 rounded-lg border border-[#dbe6db] dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex-col cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 dark:hover:bg-gray-700">
                <div className="text-[#111811] dark:text-white transition-colors duration-200">
                  {/* Leaf Icon */}
                  <div className="p-2 text-green-700 dark:text-green-500 transition-colors duration-200">
                    <FaLeaf className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#111811] dark:text-white text-base font-bold leading-tight transition-colors duration-200">
                    Precision Agriculture
                  </h2>
                  <p className="text-[#618961] dark:text-gray-400 text-sm font-normal leading-normal transition-colors duration-200">
                    Optimize resource use with AI-powered precision farming
                    techniques.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-1 gap-3 rounded-lg border border-[#dbe6db] dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex-col cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 dark:hover:bg-gray-700">
                <div className="text-[#111811] dark:text-white transition-colors duration-200">
                  {/* Robot Icon */}
                  <div className="p-2 text-green-700 dark:text-green-500 transition-colors duration-200">
                    <FaRobot className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#111811] dark:text-white text-base font-bold leading-tight transition-colors duration-200">
                    Automated Operations
                  </h2>
                  <p className="text-[#618961] dark:text-gray-400 text-sm font-normal leading-normal transition-colors duration-200">
                    Automate tasks like planting, weeding, and harvesting to
                    reduce labor costs.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex flex-1 gap-3 rounded-lg border border-[#dbe6db] dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex-col cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 dark:hover:bg-gray-700">
                <div className="text-[#111811] dark:text-white transition-colors duration-200">
                  {/* Chart Icon */}
                  <div className="p-2 text-green-700 dark:text-green-500 transition-colors duration-200">
                    <HiOutlineChartBar className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#111811] dark:text-white text-base font-bold leading-tight transition-colors duration-200">
                    Data-Driven Insights
                  </h2>
                  <p className="text-[#618961] dark:text-gray-400 text-sm font-normal leading-normal transition-colors duration-200">
                    Gain valuable insights from real-time data on crop health
                    and environmental conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Footer*/}
      <Footer />
    </div>
  );
};

export default Hero;

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { HiOutlineChartBar } from "react-icons/hi";
import { FaLeaf } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";
import StickyButtons from "../components/StickyButtons";

const Hero = () => {
  return (
    <div>
      {/*Nav Bar*/}
      <Header />
      {/* StickyButtons */}
      <StickyButtons/>
      {/*Hero Section*/}
      <div className="px-40 flex flex-1 justify-center py-5">
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
                  <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                    Revolutionizing Farming with AI and Mechanization
                  </h1>
                  <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                    Team INDRA's TIFAN agricultural machine combines artificial
                    intelligence and advanced mechanics to transform farming
                    practices.
                  </h2>
                </div>
                <div className="flex-wrap gap-3 flex justify-center">
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#11d411] text-[#111811] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                    <span className="truncate">Explore TIFAN</span>
                  </button>
                  <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#f0f4f0] text-[#111811] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                    <span className="truncate">Try AgroChat</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features Section */}
          <div className="flex flex-col gap-10 px-4 py-10 @container">
            <div className="flex flex-col gap-4">
              <h1 className="text-[#111811] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                Key Features of TIFAN
              </h1>
              <p className="text-[#111811] text-base font-normal leading-normal max-w-[720px]">
                TIFAN integrates AI and mechanization to enhance farming
                efficiency and sustainability.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
              {/* Card 1 */}
              <div className="flex flex-1 gap-3 rounded-lg border border-[#dbe6db] bg-white p-4 flex-col">
                <div className="text-[#111811]">
                  {/* Leaf Icon */}
                  <div className="p-2 text-green-700">
                    <FaLeaf className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#111811] text-base font-bold leading-tight">
                    Precision Agriculture
                  </h2>
                  <p className="text-[#618961] text-sm font-normal leading-normal">
                    Optimize resource use with AI-powered precision farming
                    techniques.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex flex-1 gap-3 rounded-lg border border-[#dbe6db] bg-white p-4 flex-col">
                <div className="text-[#111811]">
                  {/* Robot Icon */}
                  <div className="p-2 text-green-700">
                    <FaRobot className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#111811] text-base font-bold leading-tight">
                    Automated Operations
                  </h2>
                  <p className="text-[#618961] text-sm font-normal leading-normal">
                    Automate tasks like planting, weeding, and harvesting to
                    reduce labor costs.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex flex-1 gap-3 rounded-lg border border-[#dbe6db] bg-white p-4 flex-col">
                <div className="text-[#111811]">
                  {/* Chart Icon */}
                  <div className="p-2 text-green-700">
                    <HiOutlineChartBar className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#111811] text-base font-bold leading-tight">
                    Data-Driven Insights
                  </h2>
                  <p className="text-[#618961] text-sm font-normal leading-normal">
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

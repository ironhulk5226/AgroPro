import React from "react";
import Header from "../components/Header";
import { schemesData } from "../data/schemes";

const Schemes = () => {
  return (
    <div
      className="relative flex min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Header/>

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Heading */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#111811] tracking-light text-[32px] font-bold leading-tight">
                  Schemes & Subsidies
                </p>
                <p className="text-[#638863] text-sm font-normal leading-normal">
                  Explore a comprehensive list of government and private schemes
                  designed to support and enhance your farming practices. Find
                  the right opportunities to boost your agricultural endeavors.
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="px-4 py-3">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                  <div className="text-[#638863] flex border-none bg-[#f0f4f0] items-center justify-center pl-4 rounded-l-lg border-r-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M229.66,218.34l-50.07-50.06..." />
                    </svg>
                  </div>
                  <input
                    placeholder="Search for schemes"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111811] focus:outline-0 focus:ring-0 border-none bg-[#f0f4f0] focus:border-none h-full placeholder:text-[#638863] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    value=""
                  />
                </div>
              </label>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              {["Type", "State", "Category"].map((label) => (
                <button
                  key={label}
                  className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#f0f4f0] pl-4 pr-2"
                >
                  <p className="text-[#111811] text-sm font-medium leading-normal">
                    {label}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M213.66,101.66l-80,80..." />
                  </svg>
                </button>
              ))}
            </div>

            {/* Scheme Cards */}
            <div className="p-4">
              <div className="grid ">
                {schemesData.map((scheme, index) => (
                <div
                  key={index}
                  className="mb-4 flex items-stretch justify-between gap-4 rounded-lg bg-white p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]"
                >
                  <div className="flex flex-[2_2_0px] flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-[#638863] text-sm font-normal leading-normal">
                        Type: {scheme.type} |
                        Organization:{scheme.organization}
                      </p>
                      <p className="text-[#111811] text-base font-bold leading-tight">
                        {scheme.name}
                      </p>
                      <p className="text-[#638863] text-sm font-normal leading-normal">
                        {scheme.description}
                      </p>
                    </div>
                    <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                      <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 flex-row-reverse bg-[#f0f4f0] text-[#111811] pr-2 gap-1 text-sm font-medium leading-normal w-fit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M221.66,133.66l-72,72..." />
                      </svg>
                      <span className="truncate">More Information</span>
                    </button>
                    </a>
                  </div>
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex-1"
                    style={{ backgroundImage: `url(undefined)` }}
                  ></div>
                  <img alt="Image" className="invisible absolute size-0" />
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schemes;

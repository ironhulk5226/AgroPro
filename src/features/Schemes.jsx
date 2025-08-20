import React from "react";
import Header from "../components/Header";
import { schemesData } from "../data/schemes";
import { FiFileText } from "react-icons/fi";
import { useState } from "react";
import { FaSearch } from 'react-icons/fa';


const Schemes = () => {
  const [search, setSearch] = useState("");

  const filtered = schemesData.filter((item) =>
  item.name.toLowerCase().includes(search.toLowerCase()) ||
  item.type.toLowerCase().includes(search.toLowerCase()) ||
  item.organization.toLowerCase().includes(search.toLowerCase())
);



  return (
    <>
      <Header />
    <div
      className="relative flex min-h-screen flex-col bg-white overflow-x-hidden"
      style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}
    >
      <div className="flex h-full grow flex-col">

        {/* Page container */}
        <div className="px-4 sm:px-8 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
          <div className="flex flex-col w-full max-w-[960px] flex-1">
            {/* Heading */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-0 flex-col gap-3">
                <p className="text-[#111811] text-2xl sm:text-3xl font-bold leading-tight">
                  Schemes & Subsidies
                </p>
                <p className="text-[#638863] text-sm sm:text-base">
                  Explore a comprehensive list of government and private schemes
                  designed to support and enhance your farming practices. Find
                  the right opportunities to boost your agricultural endeavors.
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="px-4 py-3">
              <label className="flex flex-col w-full">
                <div className="flex w-full items-center rounded-lg h-12 bg-[#f0f4f0]">
                  <div className="text-[#638863] flex items-center justify-center pl-4">
                    <button className="bg-transparent p-2 ">
                <FaSearch className="w-4.5 h-4.5" />
             </button>
                  </div>
                  <input onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for schemes"
                    className="flex-1 bg-[#f0f4f0] border-none outline-none px-4 text-sm sm:text-base placeholder:text-[#638863]"
                  />
                </div>
              </label>
            </div>


            {/* Scheme Cards */}
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                
                {filtered.map((scheme, index) => (
                  <a
                        href={scheme.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start sm:items-stretch gap-4 rounded-lg bg-white p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out 
                   hover:shadow-lg hover:-translate-y-1 hover:bg-[#e7f7e7]"
                  >
                    {/* Icon */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f0f4f0] flex-shrink-0">
                      <FiFileText size={24} />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col gap-2 flex-1">
                      <p className="text-[#638863] text-xs sm:text-sm">
                        Type: {scheme.type} | Organization: {scheme.organization}
                      </p>
                      <p className="text-[#111811] text-sm sm:text-base font-bold">
                        {scheme.name}
                      </p>
                      <p className="text-[#638863] text-xs sm:text-sm">
                        {scheme.description}
                      </p>
                  
                    
                      
                    </div>
                    
                  </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Schemes;

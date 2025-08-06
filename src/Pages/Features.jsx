import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Features() {
  const [search, setSearch] = useState("");

  // const categories = [
  //   "All Categories",
  //   "Crop Management",
  //   "Technology",
  //   "Sustainability",
  // ];

  const resources = [
    {
      title: "Crop Diseases",
      desc: "Learn to identify and manage common crop diseases effectively.",
      img: "https://picsum.photos/300/300?random=1",
    },
    {
      title: "Pest Control",
      desc: "Discover strategies for controlling pests and protecting your crops.",
      img: "https://picsum.photos/300/300?random=2",
    },
    {
      title: "Irrigation Tips",
      desc: "Optimize your irrigation systems for efficient water use.",
      img: "https://picsum.photos/300/300?random=3",
    },
    {
      title: "Soil Health",
      desc: "Improve soil quality and fertility for better crop yields.",
      img: "https://picsum.photos/300/300?random=4",
    },
    {
      title: "Weather Monitoring",
      desc: "Stay informed with real-time weather data and forecasts.",
      img: "https://picsum.photos/300/300?random=5",
    },
    {
      title: "Market Insights",
      desc: "Access market trends and insights to make informed decisions.",
      img: "https://picsum.photos/300/300?random=6",
    },
  ];

  const filtered = resources.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
    <div className="px-10 flex flex-1 justify-center py-5">
      <div className="flex flex-col max-w-[960px] flex-1">
        {/* Header */}
        <div className="flex flex-col gap-3 p-4">
          <h1 className="text-[#111811] tracking-wide text-[32px] font-bold leading-tight">
            Features
          </h1>
          <p className="text-[#618961] text-sm leading-normal">
            Explore our comprehensive Features to enhance your smart farming
            practices. Find guides, tips, and tools to optimize your farm's
            productivity and sustainability.
          </p>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-3">
          <div className="flex items-center bg-[#f0f4f0] rounded-xl h-12">
            <span className="text-[#618961] px-3">
              {/* Search Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search Features"
              className="flex-1 bg-transparent outline-none text-[#111811] placeholder:text-[#618961] px-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Category Buttons */}
        {/* <div className="flex gap-3 p-3 flex-wrap">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className="flex items-center gap-x-2 rounded-xl bg-[#f0f4f0] px-4 py-1"
            >
              <span className="text-[#111811] text-sm font-medium">{cat}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
            </button>
          ))}
        </div> */}

        {/* Resource Cards */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-4">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-2 rounded-xl shadow-sm p-2 bg-white"
            >
              <div
                className="w-full aspect-square rounded-xl bg-cover bg-center"
                style={{ backgroundImage: `url(${item.img})` }}
              ></div>
              <div>
                <h3 className="text-[#111811] font-medium">{item.title}</h3>
                <p className="text-[#618961] text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </div>
    </>
  );
}

export default Features;

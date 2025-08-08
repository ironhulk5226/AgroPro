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
             <button className="bg-transparent p-2 ">
                <FaSearch className="w-4.5 h-4.5" />
             </button>
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

        {/* Resource Cards */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-4">
          {filtered.map((item, idx) => (
            <Link key={idx} to={item.path}>
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
              </Link>
          ))}
        </div>

        <Footer />
      </div>
    </div>
    </>
  );
}

export default Features;

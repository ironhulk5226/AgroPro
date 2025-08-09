import Footer from "../components/Footer";
import Header from "../components/Header";
import { FaSearch } from "react-icons/fa";
import GrowSmart from "../assets/Feature_Images/GrowSmart.png";
import AgroChat from "../assets/Feature_Images/AgroChat.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import Schemes from "../features/Schemes";
import schemesImg from "../assets/Feature_Images/schemes.png";
import weatherImg from "../assets/Feature_Images/weather-wise.png";
import { FiFileText } from "react-icons/fi";

function Features() {
  const [search, setSearch] = useState("");

  const resources = [
    {
      title: "Weather Wise",
      desc: "Stay ahead with accurate weather forecasts and farming advice tailored to your crops and location.",
      img: weatherImg,
      path: "/weatherwise",
    },
    {
      title: "Schemes",
      desc: "..",
      img: schemesImg,
      path: "/schemes",
    },
    {
      title: "Grow Smart",
      desc: "GrowSmart helps farmers plan the best planting layout for their land to maximize yield using smart spacing methods.",
      img: GrowSmart,
      path: "/growsmart",
    },
    {
      title: "AgroChat",
      desc: "A smart assistant that answers farming questions, gives crop tips, and supports better decisions in real-time.",
      img: AgroChat,
      path: "/chatbot",
    },
    {
      title: "Title",
      desc: "Description",
      img: "",
      path: "",
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
                  className="flex flex-col gap-2 rounded-xl shadow-md p-2 bg-white 
                   transition-all duration-300 ease-in-out 
                   hover:shadow-lg hover:-translate-y-1 hover:bg-[#e7f7e7]"
                >
                  <div
                    className="w-full aspect-square rounded-xl bg-cover bg-center shadow-sm"
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

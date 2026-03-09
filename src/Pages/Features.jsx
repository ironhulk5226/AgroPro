
import Loader from "../components/Loader";
import { FaSearch } from "react-icons/fa";
import GrowSmart from "../assets/Feature_Images/GrowSmart.png";
import AgroChat from "../assets/Feature_Images/AgroChat.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import schemesImg from "../assets/Feature_Images/schemes.png";
import weatherImg from "../assets/Feature_Images/weather-wise.png";
import PlantDiseaseDetectorImg from "../assets/Feature_Images/PlantDiseaseDetector.png";
import cropCalenderImg from "../assets/Feature_Images/CropCalender.jpeg";

function Features() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Hide loader after delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const resources = [
    {
      title: "Crop Calender",
      desc: "Plan your farming activities with our Crop Calendar, providing timely reminders for planting, fertilizing, and harvesting based on your location and crops.",
      img: cropCalenderImg,
      path: "/form",
    },
    {
      title: "Weather Wise",
      desc: "Stay ahead with accurate weather forecasts and farming advice tailored to your crops and location.",
      img: weatherImg,
      path: "/weatherwise",
    },
    {
      title: "Schemes",
      desc: "Access all government schemes for farmers in one place — simplified, updated, and easy to understand, helping you make the most of available benefits.",
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
      title: "Plant Diseases Detector",
      desc: "Plant Disease Detector helps farmers identify crop diseases by analyzing images of plant leaves using AI.",
      img: PlantDiseaseDetectorImg,
      path: "/disease-detector",
    },
  ];

  const filtered = resources.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-200">
      {isLoading && <Loader />}
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16 2xl:px-20 flex flex-1 justify-center py-5 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="flex flex-col max-w-6xl w-full flex-1">
          {/* Header */}
          <div className="flex flex-col gap-3 p-4">
            <h1 className="text-[#111811] dark:text-white tracking-wide text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight transition-colors duration-200">
              Features
            </h1>
            <p className="text-[#618961] dark:text-gray-400 text-sm sm:text-base leading-normal transition-colors duration-200">
              Explore our comprehensive Features to enhance your smart farming
              practices. Find guides, tips, and tools to optimize your farm's
              productivity and sustainability.
            </p>
          </div>

          {/* Search Bar */}
          <div className="px-4 py-3">
            <div className="flex items-center bg-[#f0f4f0] dark:bg-gray-800 rounded-xl h-10 sm:h-12 transition-colors duration-200">
              <span className="text-[#618961] dark:text-gray-400 px-2 sm:px-3 transition-colors duration-200">
                {/* Search Icon */}
                <button className="bg-transparent p-1 sm:p-2">
                  <FaSearch className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
                </button>
              </span>
              <input
                type="text"
                placeholder="Search Features"
                className="flex-1 bg-transparent outline-none text-[#111811] dark:text-white placeholder:text-[#618961] dark:placeholder:text-gray-400 px-2 text-sm sm:text-base transition-colors duration-200"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Resource Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4">
            {filtered.map((item, idx) => (
              <Link key={idx} to={item.path}>
                <div className="flex flex-col gap-2 sm:gap-3 rounded-xl shadow-md p-3 sm:p-4 bg-white dark:bg-gray-800 border border-transparent dark:border-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:bg-[#e7f7e7] dark:hover:bg-gray-700 min-h-[280px] sm:min-h-[320px]">
                  <div
                    className="w-full aspect-square rounded-xl bg-cover bg-center shadow-sm"
                    style={{ backgroundImage: `url(${item.img})` }}
                  ></div>
                  <div className="flex-1">
                    <h3 className="text-[#111811] dark:text-white font-medium text-base sm:text-lg mb-2 transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-[#618961] dark:text-gray-400 text-xs sm:text-sm leading-relaxed transition-colors duration-200">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Features;

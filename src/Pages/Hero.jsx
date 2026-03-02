import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { HiOutlineChartBar } from "react-icons/hi";
import { FaLeaf, FaRobot, FaStar, FaTrophy, FaUsers, FaIndustry, FaQuoteLeft, FaUser, FaChevronLeft, FaChevronRight, FaCalendarAlt, FaMedal, FaAward } from "react-icons/fa";
import StickyButtons from "../components/StickyButtons";
import { Link } from "react-router-dom";
import GrowSmart from "../assets/Feature_Images/GrowSmart.png";
import AgroChat from "../assets/Feature_Images/AgroChat.png";
import schemesImg from "../assets/Feature_Images/schemes.png";
import weatherImg from "../assets/Feature_Images/weather-wise.png";

const Hero = () => {
  const [currentTestimonialPage, setCurrentTestimonialPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentFeaturePage, setCurrentFeaturePage] = useState(0);
  const [isFeatureTransitioning, setIsFeatureTransitioning] = useState(false);
  const testimonialsPerPage = 3;
  const featuresPerPage = 2;

  // Features data
  const features = [
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
  ];

  // Achievements data
  const achievements = [
    {
      id: 1,
      image: '/achievements/news1.jpg',
      date: {
        day: '26',
        month: 'May',
        year: '2024'
      },
      title: 'AIR 3 in Overall Season',
      description: 'Team INDRA has secured ALL INDIA RANK 3 for overall season held in 2024.',
      icon: <FaTrophy className="w-6 h-6 text-yellow-500" />,
      category: 'Overall Performance'
    },
    {
      id: 2,
      image: '/achievements/news2.jpg',
      date: {
        day: '27',
        month: 'Dec',
        year: '2023'
      },
      title: 'AIR 1 in Phase -1 Design Presentation',
      description: 'Team INDRA has secured ALL INDIA RANK 1 for design Presentation held in December 2023.',
      icon: <FaMedal className="w-6 h-6 text-gold-500" />,
      category: 'Design Excellence'
    },
    {
      id: 3,
      image: '/achievements/news3.jpg',
      date: {
        day: '26',
        month: 'May',
        year: '2024'
      },
      title: 'AIR 1 - Best Design Award',
      description: 'Team INDRA has secured ALL INDIA RANK 1 in category of Best Design.',
      icon: <FaAward className="w-6 h-6 text-green-500" />,
      category: 'Design Award'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Satish Mangore',
      location: 'Farmer, Koge, Maharashtra',
      image: '/customers/customer_1.jpg',
      rating: 5,
      testimonial: 'AgroPro has completely transformed the way I approach farming. The crop recommendation system helped me identify the best crops for my land, and the results have been amazing. My yield has doubled this season!'
    },
    {
      id: 2,
      name: 'Maruti Patil',
      location: 'Farmer, Kolhapur, Maharashtra',
      image: '/customers/customer_2.jpg',
      rating: 4,
      testimonial: 'As a small farmer, I always struggled to make decisions about fertilizers. The fertilizer recommendation system is a game-changer. It provided me with accurate suggestions, and I saw a noticeable improvement in my crop quality.'
    },
    {
      id: 3,
      name: 'Ramesh Patil',
      location: 'Farmer, Fulewadi, Maharashtra',
      image: '/customers/customer_3.jpg',
      rating: 5,
      testimonial: 'The plant disease classifier saved my tomato crop! I uploaded a photo, and within seconds, I knew exactly what disease it was and how to treat it. AgroPro is a must-have for every farmer.'
    },
    {
      id: 4,
      name: 'Vithal Mangore',
      location: 'Farmer, Koge, Maharashtra',
      image: '/customers/customer_4.jpg',
      rating: 4,
      testimonial: 'The Agro-Chat feature is so helpful. I can ask questions in my local language, and I always get quick and reliable advice. It feels like having an expert by my side all the time.'
    },
    {
      id: 5,
      name: 'Nivas Chopade',
      location: 'Farmer, Majegaon, Maharashtra',
      image: '/customers/customer_5.jpg',
      rating: 5,
      testimonial: 'Farming used to feel overwhelming, but with AgroPro, I now have all the information I need at my fingertips. The multilingual support makes it so easy to use, even for someone like me who isn\'t fluent in English.'
    },
    {
      id: 6,
      name: 'Sumit Patil',
      location: 'Farmer, Punal, Maharashtra',
      image: '/customers/customer_6.jpg',
      rating: 5,
      testimonial: 'Thanks to AgroPro, I\'ve adopted smarter, more sustainable farming practices. The insights provided are not only improving my yield but also helping me conserve resources like water and fertilizers.'
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);
  const currentTestimonials = testimonials.slice(
    currentTestimonialPage * testimonialsPerPage,
    (currentTestimonialPage + 1) * testimonialsPerPage
  );

  const totalFeaturePages = Math.ceil(features.length / featuresPerPage);
  const currentFeatures = features.slice(
    currentFeaturePage * featuresPerPage,
    (currentFeaturePage + 1) * featuresPerPage
  );

  const nextFeaturePage = () => {
    if (isFeatureTransitioning) return;
    setIsFeatureTransitioning(true);
    setTimeout(() => {
      setCurrentFeaturePage((prev) => (prev + 1) % totalFeaturePages);
      setTimeout(() => setIsFeatureTransitioning(false), 100);
    }, 150);
  };

  const prevFeaturePage = () => {
    if (isFeatureTransitioning) return;
    setIsFeatureTransitioning(true);
    setTimeout(() => {
      setCurrentFeaturePage((prev) => (prev - 1 + totalFeaturePages) % totalFeaturePages);
      setTimeout(() => setIsFeatureTransitioning(false), 100);
    }, 150);
  };

  const nextTestimonialPage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTestimonialPage((prev) => (prev + 1) % totalPages);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 150);
  };

  const prevTestimonialPage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTestimonialPage((prev) => (prev - 1 + totalPages) % totalPages);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 150);
  };

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

          {/* Services We Offer Section */}
          <div className="flex flex-col gap-10 px-4 py-10 @container">
            <div className="flex flex-col gap-4">
              <h1 className="text-[#111811] dark:text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px] transition-colors duration-200">
                Services We Offer
              </h1>
              <p className="text-[#111811] dark:text-gray-300 text-base font-normal leading-normal max-w-[720px] transition-colors duration-200">
                Comprehensive agricultural solutions powered by AI and advanced technology to revolutionize modern farming practices.
              </p>
            </div>

            {/* Feature Cards with Horizontal Scroll */}
            <div className="relative">
              {/* Navigation Buttons */}
              {totalFeaturePages > 1 && (
                <>
                  <button
                    onClick={prevFeaturePage}
                    disabled={isFeatureTransitioning}
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
                      isFeatureTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                    }`}
                  >
                    <FaChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextFeaturePage}
                    disabled={isFeatureTransitioning}
                    className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
                      isFeatureTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                    }`}
                  >
                    <FaChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              
              <div className={`grid grid-cols-1 @[640px]:grid-cols-2 gap-6 min-h-[520px] transition-all duration-300 ease-in-out transform ${
                isFeatureTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}>
                {currentFeatures.map((item, idx) => (
                  <Link key={idx} to={item.path} className="group">
                    <div className="flex flex-col gap-4 rounded-xl shadow-md p-6 bg-white dark:bg-gray-800 border border-transparent dark:border-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:bg-[#e7f7e7] dark:hover:bg-gray-700 h-full">
                      <div
                        className="w-full h-72 rounded-xl bg-cover bg-center shadow-sm flex-shrink-0"
                        style={{ backgroundImage: `url(${item.img})` }}
                      ></div>
                      <div className="flex flex-col gap-3 flex-grow">
                        <h3 className="text-[#111811] dark:text-white font-bold text-xl transition-colors duration-200">
                          {item.title}
                        </h3>
                        <p className="text-[#618961] dark:text-gray-400 text-sm transition-colors duration-200 flex-grow leading-relaxed">
                          {item.desc}
                        </p>
                        <div className="mt-2">
                          <span className="text-green-600 dark:text-green-400 text-sm font-semibold group-hover:underline">
                            Explore →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Pagination Dots */}
              {totalFeaturePages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  {[...Array(totalFeaturePages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentFeaturePage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentFeaturePage
                          ? 'bg-green-600 scale-125'
                          : 'bg-gray-300 dark:bg-gray-600 hover:bg-green-400'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Features Overview Section */}
          <div className="flex flex-col gap-10 px-4 py-10 @container bg-gray-50 dark:bg-gray-800 rounded-xl transition-colors duration-200">
            <div className="flex flex-col gap-4 text-center">
              <h1 className="text-[#111811] dark:text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px] mx-auto transition-colors duration-200">
                Explore Our Complete Solutions
              </h1>
              <p className="text-[#111811] dark:text-gray-300 text-base font-normal leading-normal max-w-[620px] mx-auto transition-colors duration-200">
                Discover how TIFAN and our agricultural solutions can transform your farming operations with cutting-edge technology and proven results.
              </p>
            </div>

            <div className="grid grid-cols-1 @[640px]:grid-cols-2 @[960px]:grid-cols-4 gap-4">
              <Link to="/features" className="group block">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group-hover:bg-green-50 dark:group-hover:bg-green-900/20 border border-[#dbe6db] dark:border-gray-600">
                  <div className="p-2 text-green-700 dark:text-green-500 mb-3 transition-colors duration-200">
                    <FaLeaf className="w-8 h-8 mx-auto" />
                  </div>
                  <h3 className="text-[#111811] dark:text-white font-bold text-base mb-2 transition-colors duration-200">
                    Smart Features
                  </h3>
                  <p className="text-[#618961] dark:text-gray-400 text-sm transition-colors duration-200">
                    Explore all intelligent features and capabilities
                  </p>
                </div>
              </Link>

              <Link to="/about-tifan" className="group block">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group-hover:bg-green-50 dark:group-hover:bg-green-900/20 border border-[#dbe6db] dark:border-gray-600">
                  <div className="p-2 text-green-700 dark:text-green-500 mb-3 transition-colors duration-200">
                    <FaIndustry className="w-8 h-8 mx-auto" />
                  </div>
                  <h3 className="text-[#111811] dark:text-white font-bold text-base mb-2 transition-colors duration-200">
                    About 
                  </h3>
                  <p className="text-[#618961] dark:text-gray-400 text-sm transition-colors duration-200">
                    Learn about our company and mission
                  </p>
                </div>
              </Link>

              <Link to="/gallery" className="group block">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group-hover:bg-green-50 dark:group-hover:bg-green-900/20 border border-[#dbe6db] dark:border-gray-600">
                  <div className="p-2 text-green-700 dark:text-green-500 mb-3 transition-colors duration-200">
                    <HiOutlineChartBar className="w-8 h-8 mx-auto" />
                  </div>
                  <h3 className="text-[#111811] dark:text-white font-bold text-base mb-2 transition-colors duration-200">
                    Gallery
                  </h3>
                  <p className="text-[#618961] dark:text-gray-400 text-sm transition-colors duration-200">
                    View our products in action
                  </p>
                </div>
              </Link>

              <Link to="/contact" className="group block">
                <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group-hover:bg-green-50 dark:group-hover:bg-green-900/20 border border-[#dbe6db] dark:border-gray-600">
                  <div className="p-2 text-green-700 dark:text-green-500 mb-3 transition-colors duration-200">
                    <FaUsers className="w-8 h-8 mx-auto" />
                  </div>
                  <h3 className="text-[#111811] dark:text-white font-bold text-base mb-2 transition-colors duration-200">
                    Contact Us
                  </h3>
                  <p className="text-[#618961] dark:text-gray-400 text-sm transition-colors duration-200">
                    Get in touch for more information
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="flex flex-col gap-10 px-4 py-10 @container">
            <div className="flex flex-col gap-4 text-center">
              <h1 className="text-[#111811] dark:text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px] mx-auto transition-colors duration-200">
                Our Latest Achievements
              </h1>
              <p className="text-[#111811] dark:text-gray-300 text-base font-normal leading-normal max-w-[620px] mx-auto transition-colors duration-200">
                Celebrating our journey of innovation, recognition, and excellence in agricultural technology
              </p>
            </div>

            {/* Achievement Cards */}
            <div className="grid grid-cols-1 @[640px]:grid-cols-2 @[960px]:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 border border-gray-100 dark:border-gray-700 relative overflow-hidden group"
                  style={{
                    boxShadow: '0 10px 30px -5px rgba(20, 183, 20, 0.3)',
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Achievement Image */}
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = '/achievements/news1.jpg'; // Fallback image
                      }}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      {achievement.category}
                    </div>

                    {/* Achievement Icon */}
                    <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg">
                      {achievement.icon}
                    </div>
                  </div>

                  {/* Date Section */}
                  <div className="absolute top-40 right-6 bg-green-600 text-white text-center rounded-lg shadow-lg p-3 min-w-[70px] z-10">
                    <div className="text-xl font-bold leading-none">{achievement.date.day}</div>
                    <div className="text-sm font-medium">{achievement.date.month}</div>
                    <div className="text-xs opacity-90">{achievement.date.year}</div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 pt-8">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                        <FaCalendarAlt className="w-4 h-4 mr-2" />
                        {achievement.date.month} {achievement.date.year}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                      {achievement.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                      {achievement.description}
                    </p>

                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-1 -right-1 w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                  <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-green-200 dark:bg-green-800 rounded-full opacity-30 group-hover:scale-125 transition-transform duration-700"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mb-16 px-4 py-10 @container">
            <div className="text-center mb-12">
              <span className="text-green-600 dark:text-green-400 font-semibold text-lg uppercase tracking-wider">
                Our Customers
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
                TESTIMONIALS
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Hear what our farmers have to say about their experience with AgroPro
              </p>
            </div>

            {/* Testimonial Carousel Container */}
            <div className="relative">
              {/* Navigation Buttons */}
              {totalPages > 1 && (
                <>
                  <button
                    onClick={prevTestimonialPage}
                    disabled={isTransitioning}
                    className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
                      isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                    }`}
                  >
                    <FaChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTestimonialPage}
                    disabled={isTransitioning}
                    className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
                      isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                    }`}
                  >
                    <FaChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Testimonial Cards Grid */}
              <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px] transition-all duration-300 ease-in-out transform ${
                isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}>
                {currentTestimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 relative group"
                    style={{
                      boxShadow: '0 10px 25px -5px rgba(20, 183, 20, 0.3), 0 10px 10px -5px rgba(20, 183, 20, 0.04)'
                    }}
                  >
                    {/* Quote Icon */}
                    <div className="absolute -top-3 -left-3 bg-green-500 text-white p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <FaQuoteLeft className="w-4 h-4" />
                    </div>

                    {/* Customer Info */}
                    <div className="flex items-center mb-4 mt-2">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-green-200 dark:border-green-700 mr-4 flex-shrink-0">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        <div className="w-full h-full bg-green-100 dark:bg-green-900 flex items-center justify-center" style={{display: 'none'}}>
                          <FaUser className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                          {testimonial.name}
                        </h3>
                        <p className="text-green-600 dark:text-green-400 text-sm font-medium">
                          {testimonial.location}
                        </p>
                        <div className="flex items-center mt-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm italic">
                      "{testimonial.testimonial}"
                    </p>

                    {/* Green accent border */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-b-xl"></div>
                  </div>
                ))}
              </div>

              {/* Pagination Dots */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 space-x-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonialPage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTestimonialPage
                          ? 'bg-green-600 scale-125'
                          : 'bg-gray-300 dark:bg-gray-600 hover:bg-green-400'
                      }`}
                    />
                  ))}
                </div>
              )}
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

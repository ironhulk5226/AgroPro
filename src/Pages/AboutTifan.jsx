import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import React, { useEffect, useState } from "react";
import MainImg from "../assets/About/Main.png";
import { HiOutlineLightningBolt, HiOutlineAdjustments, HiOutlineUserGroup } from "react-icons/hi";

function AboutTifan() {
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

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {isLoading && <Loader />}
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-40 flex flex-1 justify-center py-5 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="layout-content-container flex flex-col max-w-4xl w-full flex-1">
          {/* Heading */}
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-[#111811] dark:text-white tracking-light text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight min-w-0 w-full transition-colors duration-200">
               INDRA AGROTECH Pvt. Ltd.
            </p>
          </div>

          {/* Main Image */}
          <div className="flex w-full grow bg-white dark:bg-gray-900 py-3 transition-colors duration-200">
            <div className="w-full gap-1 overflow-hidden bg-white aspect-[3/2] sm:aspect-[2/1] md:aspect-[3/2] flex">
              <div
                className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-xl flex-1 shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                style={{
                  backgroundImage: `url(${MainImg})`,
                }}
              ></div>
            </div>
          </div>

          {/* Establishment Section */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 sm:p-6 mb-6 transition-colors duration-200">
            <h2 className="text-[#111811] dark:text-white text-lg sm:text-xl md:text-2xl font-bold pb-3 pt-1 transition-colors duration-200 flex items-start sm:items-center gap-3 flex-col sm:flex-row">
              <div className="w-1 h-6 bg-green-600 rounded-full flex-shrink-0"></div>
              <span>Established in 2023 | Based in Karad, Satara</span>
            </h2>
            <p className="text-[#111811] dark:text-gray-300 text-sm sm:text-base pb-3 pt-1 leading-relaxed transition-colors duration-200">
              Indra Agrotech Pvt. Ltd. is an emerging agricultural equipment manufacturing company. We are committed to modernizing agriculture with advanced machinery that enhances farm productivity and reduces labor efforts.
            </p>
          </div>

          {/* Specialization Section */}
          <div className="mb-6">
            <h2 className="text-[#111811] dark:text-white text-lg sm:text-xl md:text-2xl font-bold px-4 pb-3 pt-5 transition-colors duration-200 flex items-start sm:items-center gap-3 flex-col sm:flex-row">
              <div className="w-1 h-6 bg-green-600 rounded-full flex-shrink-0"></div>
              <span>Specialization</span>
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md border border-green-100 dark:border-gray-700 transition-colors duration-200">
              <p className="text-[#111811] dark:text-gray-300 text-sm sm:text-base leading-relaxed transition-colors duration-200">
                We specialize in manufacturing <span className="font-semibold text-green-600 dark:text-green-400">harvesters</span> and <span className="font-semibold text-green-600 dark:text-green-400">transplanters</span>. Our machines are designed to streamline farming operations, making them more efficient and less labor-intensive.
              </p>
            </div>
          </div>

          {/* Flagship Product VAJRA */}
          <div className="mb-6 ">
            <h2 className="text-[#111811] dark:text-white text-lg sm:text-xl md:text-2xl font-bold px-4 pb-3 pt-5 transition-colors duration-200 flex items-start sm:items-center gap-3 flex-col sm:flex-row">
              <div className="w-1 h-6 bg-green-600 rounded-full flex-shrink-0"></div>
              <span>Flagship Product: VAJRA</span>
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 sm:p-6 shadow-md border border-green-100 dark:border-gray-700 transition-colors duration-200">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg px-3 py-1 mb-3 text-xs sm:text-sm font-semibold transition-colors duration-200">
                  Flagship Product
                </div>
                <h3 className="text-[#111811] dark:text-white text-lg sm:text-xl md:text-2xl font-bold mb-3 transition-colors duration-200">Sapling Transplanter VAJRA</h3>
                <p className="text-[#111811] dark:text-gray-300 text-sm sm:text-base leading-relaxed transition-colors duration-200">
                  Our flagship model, launched in April 2025, is designed to revolutionize the transplanting process by automating the planting of young saplings, thereby improving speed and accuracy for farmers.
                </p>
              </div>
              
              {/* VAJRA Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="overflow-hidden rounded-lg shadow-md border border-gray-200 dark:border-gray-600">
                  <img
                    src="/gallery/10.jpg"
                    alt="VAJRA Transplanter - View 1"
                    className="w-full h-32 sm:h-40 md:h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden rounded-lg shadow-md border border-gray-200 dark:border-gray-600">
                  <img
                    src="/gallery/11.jpg"
                    alt="VAJRA Transplanter - View 2"
                    className="w-full h-32 sm:h-40 md:h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>

              {/* VAJRA Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border border-[#dbe6db] dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="p-2 text-green-700 dark:text-green-500 mb-3 transition-colors duration-200">
                    <HiOutlineLightningBolt className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h4 className="text-[#111811] dark:text-white font-bold text-xs sm:text-sm mb-1 transition-colors duration-200">Revolutionary Speed</h4>
                  <p className="text-[#618961] dark:text-gray-400 text-xs transition-colors duration-200">Automates planting process with exceptional speed and efficiency</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border border-[#dbe6db] dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="p-2 text-green-700 dark:text-green-500 mb-3 transition-colors duration-200">
                    <HiOutlineAdjustments className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h4 className="text-[#111811] dark:text-white font-bold text-xs sm:text-sm mb-1 transition-colors duration-200">Enhanced Accuracy</h4>
                  <p className="text-[#618961] dark:text-gray-400 text-xs transition-colors duration-200">Ensures optimal spacing and depth for maximum crop yield</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border border-[#dbe6db] dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="p-2 text-green-700 dark:text-green-500 mb-3 transition-colors duration-200">
                    <HiOutlineUserGroup className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h4 className="text-[#111811] dark:text-white font-bold text-xs sm:text-sm mb-1 transition-colors duration-200">Labor Reduction</h4>
                  <p className="text-[#618961] dark:text-gray-400 text-xs transition-colors duration-200">Significantly reduces manual labor requirements and operational costs</p>
                </div>
              </div>
            </div>
          </div>

          {/* The Development Story */}
          <div className="mb-6">
            <h2 className="text-[#111811] dark:text-white text-lg sm:text-xl md:text-2xl font-bold px-4 pb-3 pt-5 transition-colors duration-200 flex items-start sm:items-center gap-3 flex-col sm:flex-row">
              <div className="w-1 h-6 bg-green-600 rounded-full flex-shrink-0"></div>
              <span>The Development Story</span>
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md border border-green-100 dark:border-gray-700 transition-colors duration-200">
              <p className="text-[#111811] dark:text-gray-300 text-sm sm:text-base leading-relaxed transition-colors duration-200">
                Established in 2023 in Karad, Satara, Indra Agrotech Pvt. Ltd. is a growing manufacturer of modern agricultural equipment, specializing in harvesters and transplanters.
              </p>
              <br />
              <p className="text-[#111811] dark:text-gray-300 text-sm sm:text-base leading-relaxed transition-colors duration-200">
                After the successful launch of our VAJRA Sapling Transplanter in April 2025, we are now gearing up to introduce our new Vegetable Transplanter in 2026 — designed to make vegetable plantation faster, easier, and more efficient.
              </p>
              <br />
              <p className="text-green-600 dark:text-green-400 font-semibold text-sm sm:text-base transition-colors duration-200">
                Indra Agrotech — Modern Machines for Modern Farming.
              </p>
            </div>
          </div>

          {/* Our Vision */}
          <div className="mb-8">
            <h2 className="text-[#111811] dark:text-white text-lg sm:text-xl md:text-2xl font-bold px-4 pb-3 pt-5 transition-colors duration-200 flex items-start sm:items-center gap-3 flex-col sm:flex-row">
              <div className="w-1 h-6 bg-green-600 rounded-full flex-shrink-0"></div>
              <span>Our Vision</span>
            </h2>
            <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-4 sm:p-6 shadow-md border border-green-100 dark:border-gray-700 transition-colors duration-200">
              <p className="text-[#111811] dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-4 transition-colors duration-200">
                At Indra Agrotech, we aim to empower farmers through innovative equipment that improves productivity, sustainability, and profitability. Our mission is to contribute to a growing agricultural economy by providing efficient and eco-friendly solutions.
              </p>
              <ul className="text-[#111811] dark:text-gray-300 text-sm sm:text-base space-y-2 transition-colors duration-200">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Empower farmers through innovative agricultural equipment</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Enhance farm productivity using advanced and efficient technology</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Promote sustainable farming practices</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Provide eco-friendly agricultural solutions</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Contribute to the growth of the agricultural economy</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="text-center py-6 sm:py-8">
            <h2 className="text-[#111811] dark:text-white text-lg sm:text-xl font-bold mb-4 sm:mb-6 transition-colors duration-200 px-4">
              Learn More About Our Innovations
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <a
                href="https://docs.google.com/presentation/d/19SC89VJTEbxhYPfZ_20G_V9zmT6WFYOd/edit?usp=sharing&ouid=103944652864170388789&rtpof=true&sd=true"
                className="inline-flex items-center justify-center min-w-[180px] sm:min-w-[200px] cursor-pointer overflow-hidden rounded-xl h-10 sm:h-12 px-4 sm:px-6 bg-[#11d411] dark:bg-green-600 text-white text-sm sm:text-base font-bold leading-normal tracking-[0.015em] transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:bg-green-600 dark:hover:bg-green-700"
                target="_blank"
              >
                <span className="truncate">About AgroPro Project</span>
              </a>
              
              <a
                href="https://drive.google.com/file/d/19_RBrpIJuqAaWbXht8HelOMi6MZ1Nf1V/view?usp=drive_link"
                className="inline-flex items-center justify-center min-w-[180px] sm:min-w-[200px] cursor-pointer overflow-hidden rounded-xl h-10 sm:h-12 px-4 sm:px-6 bg-transparent border-2 border-[#11d411] dark:border-green-600 text-[#11d411] dark:text-green-600 text-sm sm:text-base font-bold leading-normal tracking-[0.015em] transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:bg-[#11d411] hover:text-white dark:hover:bg-green-600 dark:hover:text-white"
                target="_blank"
              >
                <span className="truncate">About VAJRA</span>
              </a>
            </div>
          </div>
          
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AboutTifan;

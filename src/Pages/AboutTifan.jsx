import Header from "../components/Header";
import Footer from "../components/Footer";
import React from "react";
import MainImg from "../assets/About/Main.png"
function AboutTifan() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="px-40 flex flex-1 justify-center py-5 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          {/* Heading */}
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-[#111811] dark:text-white tracking-light text-[32px] font-bold leading-tight min-w-72 transition-colors duration-200">
               INDRA AGROTECH Pvt. Ltd.
            </p>
          </div>

          {/* Main Image */}
          <div className="flex w-full grow bg-white dark:bg-gray-900 py-3 transition-colors duration-200">
            <div className="w-full gap-1 overflow-hidden bg-white aspect-[3/2] flex">
              <div
                className="w-full bg-center bg-no-repeat bg-cover aspect-auto rounded-none flex-1"
                style={{
                  backgroundImage:
                    `url(${MainImg})`,
                }}
              ></div>
            </div>
          </div>

          {/* Sections */}
          <h2 className="text-[#111811] dark:text-white text-[22px] font-bold px-4 pb-3 pt-5 transition-colors duration-200">
            Establishment in 2023 | Based in Karad, Satara
          </h2>
          <p className="text-[#111811] dark:text-gray-300 text-base px-4 pb-3 pt-1 transition-colors duration-200">
            Indra Agrotech Pvt. Ltd. is an emerging agricultural equipment manufacturing company. We are committed to modernizing agriculture with advanced machinery that enhances farm productivity and reduces labor efforts.
          </p>

          <h2 className="text-[#111811] dark:text-white text-[22px] font-bold px-4 pb-3 pt-5 transition-colors duration-200">
            The Development Story
          </h2>
          <p className="text-[#111811] dark:text-gray-300 text-base px-4 pb-3 pt-1 transition-colors duration-200">
           Established in 2023 in Karad, Satara, Indra Agrotech Pvt. Ltd. is a growing manufacturer of modern agricultural equipment, specializing in harvesters and transplanters.

After the successful launch of our VAJRA Sapling Transplanter in April 2025, we are now gearing up to introduce our new Vegetable Transplanter in 2026 — designed to make vegetable plantation faster, easier, and more efficient.

Indra Agrotech — Modern Machines for Modern Farming.
          </p>

          <h2 className="text-[#111811] dark:text-white text-[22px] font-bold px-4 pb-3 pt-5 transition-colors duration-200">
            Our Vision
          </h2>
          <ul className="text-[#111811] dark:text-gray-300 text-base px-8 pb-3 pt-1 list-disc transition-colors duration-200">
            <li>Empower farmers through innovative agricultural equipment</li>
            <li>Enhance farm productivity using advanced and efficient technology</li>
            <li>Promote sustainable farming practices</li>
            <li>Provide eco-friendly agricultural solutions</li>
            <li>Contribute to the growth of the agricultural economy</li>
          </ul>

          
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AboutTifan;

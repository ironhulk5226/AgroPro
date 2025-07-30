import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BiLeaf, BiWater, BiSun } from "react-icons/bi"; // Import react-icons

function Chatbot() {
  const [question, setQuestion] = useState("");

  return (
    <div>
      <Header />

      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <h2 className="text-[#111811] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
            Ask TIFAN
          </h2>
          <p className="text-[#111811] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
            Get instant answers to your crop-related questions. Our AI-powered
            assistant is here to help you optimize your farming practices.
          </p>

          {/* Input Field Centered */}
          <div className="flex justify-center px-4 py-3">
            <label className="flex flex-col w-full max-w-[600px]">
              <input
                placeholder="Type your question here..."
                className="form-input w-full rounded-xl text-[#111811] focus:outline-0 focus:ring-0 border border-[#dce5dc] bg-white focus:border-[#14b714] h-16 placeholder:text-[#638863] p-[18px] text-lg font-normal leading-normal text-center"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </label>
          </div>

          {/* Send Button */}
          <div className="flex px-4 py-3 justify-center">
            <button
              className="flex min-w-[100px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-[#14b714] text-white text-base font-bold leading-normal tracking-[0.015em]"
              onClick={() => alert(`Your Question: ${question}`)}
            >
              <span className="truncate">Send</span>
            </button>
          </div>

          {/* Example Questions */}
          <h3 className="text-[#111811] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
            Example Questions
          </h3>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
            {/* Example 1 */}
            <div className="flex flex-1 gap-3 rounded-lg border border-[#dce5dc] bg-white p-4 items-center">
              <div className="text-[#14b714] text-2xl">
                <BiLeaf />
              </div>
              <h2 className="text-[#111811] text-base font-bold leading-tight">
                What are the best crops for my soil type?
              </h2>
            </div>

            {/* Example 2 */}
            <div className="flex flex-1 gap-3 rounded-lg border border-[#dce5dc] bg-white p-4 items-center">
              <div className="text-[#14b714] text-2xl">
                <BiWater />
              </div>
              <h2 className="text-[#111811] text-base font-bold leading-tight">
                How much water does this crop need?
              </h2>
            </div>

            {/* Example 3 */}
            <div className="flex flex-1 gap-3 rounded-lg border border-[#dce5dc] bg-white p-4 items-center">
              <div className="text-[#14b714] text-2xl">
                <BiSun />
              </div>
              <h2 className="text-[#111811] text-base font-bold leading-tight">
                What's the optimal sunlight exposure for tomatoes?
              </h2>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Chatbot;

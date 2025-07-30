import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Chatbot() {
  // Add state for input
  const [question, setQuestion] = useState("")

  return (
    <div>
      <Header/>

      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <h2 className="text-[#111811] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
            Ask TIFAN
          </h2>
          <p className="text-[#111811] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
            Get instant answers to your crop-related questions. Our AI-powered
            assistant is here to help you optimize your farming practices.
          </p>

          {/* Input Field */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <input
                placeholder="Type your question here..."
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111811] focus:outline-0 focus:ring-0 border border-[#dce5dc] bg-white focus:border-[#dce5dc] h-14 placeholder:text-[#638863] p-[15px] text-base font-normal leading-normal"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </label>
          </div>

          {/* Send Button */}
          <div className="flex px-4 py-3 justify-center">
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#14b714] text-white text-sm font-bold leading-normal tracking-[0.015em]"
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
              <div className="text-[#111811]">
                {/* Plant Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M247.63,39.89a8,8,0,0,0-7.52-7.52c-51.76-3-93.32,12.74-111.18,42.22-11.8,19.49-11.78,43.16-.16,65.74a71.34,71.34,0,0,0-14.17,27L98.33,151c7.82-16.33,7.52-33.35-1-47.49-13.2-21.79-43.67-33.47-81.5-31.25a8,8,0,0,0-7.52,7.52c-2.23,37.83,9.46,68.3,31.25,81.5A45.82,45.82,0,0,0,63.44,168,54.58,54.58,0,0,0,87,162.33l25,25V216a8,8,0,0,0,16,0V186.51a55.61,55.61,0,0,1,12.27-35,73.91,73.91,0,0,0,33.31,8.4,60.9,60.9,0,0,0,31.83-8.86C234.89,133.21,250.67,91.65,247.63,39.89ZM47.81,147.6C32.47,138.31,23.79,116.32,24,88c28.32-.24,50.31,8.47,59.6,23.81,4.85,8,5.64,17.33,2.46,26.94L61.65,114.34a8,8,0,0,0-11.31,11.31l24.41,24.41C65.14,153.24,55.82,152.45,47.81,147.6Zm149.31-10.22c-13.4,8.11-29.15,8.73-45.15,2l53.69-53.7a8,8,0,0,0-11.31-11.31L140.65,128c-6.76-16-6.15-31.76,2-45.15,13.94-23,47-35.82,89.33-34.83C232.94,90.34,220.14,123.44,197.12,137.38Z" />
                </svg>
              </div>
              <h2 className="text-[#111811] text-base font-bold leading-tight">
                What are the best crops for my soil type?
              </h2>
            </div>

            {/* Example 2 */}
            <div className="flex flex-1 gap-3 rounded-lg border border-[#dce5dc] bg-white p-4 items-center">
              <div className="text-[#111811]">
                {/* Water Drop Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M174,47.75a254.19,254.19,0,0,0-41.45-38.3,8,8,0,0,0-9.18,0A254.19,254.19,0,0,0,82,47.75C54.51,79.32,40,112.6,40,144a88,88,0,0,0,176,0C216,112.6,201.49,79.32,174,47.75ZM128,216a72.08,72.08,0,0,1-72-72c0-57.23,55.47-105,72-118,16.53,13,72,60.75,72,118A72.08,72.08,0,0,1,128,216Zm55.89-62.66a57.6,57.6,0,0,1-46.56,46.55A8.75,8.75,0,0,1,136,200a8,8,0,0,1-1.32-15.89c16.57-2.79,30.63-16.85,33.44-33.45a8,8,0,0,1,15.78,2.68Z" />
                </svg>
              </div>
              <h2 className="text-[#111811] text-base font-bold leading-tight">
                How much water does this crop need?
              </h2>
            </div>

            {/* Example 3 */}
            <div className="flex flex-1 gap-3 rounded-lg border border-[#dce5dc] bg-white p-4 items-center">
              <div className="text-[#111811]">
                {/* Sun Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm-16,0a48,48,0,1,0-48,48A48.05,48.05,0,0,0,176,128ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z" />
                </svg>
              </div>
              <h2 className="text-[#111811] text-base font-bold leading-tight">
                What's the optimal sunlight exposure for tomatoes?
              </h2>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default Chatbot

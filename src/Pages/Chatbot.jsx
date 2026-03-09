import React, { useState, useRef, useEffect } from "react";

import Loader from "../components/Loader";
import { BiLeaf, BiWater, BiSun, BiSend } from "react-icons/bi";
import axios from "axios";
import { SyncLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";

function Chatbot() {
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Hide loader after delay
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const url = import.meta.env.VITE_GEMINI_API_URL;
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const [question, setQuestion] = useState("");
  const [ans, setAns] = useState("");
  const [loader, setLoader] = useState(false);
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  const getData = () => {
    if (!question.trim() || loader) return; // 🔥 prevent spam calls

    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: question }],
        },
      ],
      systemInstruction: {
        role: "system",
        parts: [
          {
            text: "You are a helpful agricultural specialist AI. Always answer questions with expertise in farming, crops, soil, water management, and related agriculture topics, answer in clear concise but detailed and simple manner so that any user can understand easily",
          },
        ],
      },
    };

    // Add user question to chat UI
    const newUserMessage = { type: "question", content: question };
    setMessages((prev) => [...prev, newUserMessage]);

    setLoader(true);

    axios
      .post(url, payload, {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": API_KEY,
        },
      })
      .then((res) => {
        const answer = res.data.candidates[0].content.parts[0].text;
        setAns(answer);
        const newAIMessage = { type: "answer", content: answer };
        setMessages((prev) => [...prev, newAIMessage]);
        setQuestion("");
      })
      .catch((e) => {
        console.log(e.message);
        const errorMessage = {
          type: "answer",
          content: "Sorry, I couldn't process your request. Please try again.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      })
      .finally(() => setLoader(false));
  };

  const handleInput = (e) => {
    setQuestion(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      getData();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-200">
      {isPageLoading && <Loader />}

      <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-40 flex flex-1 justify-center py-5 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="layout-content-container flex flex-col max-w-4xl w-full flex-1">
          <h2 className="text-[#111811] dark:text-white tracking-light text-xl sm:text-2xl md:text-3xl font-bold leading-tight px-4 text-center pb-3 pt-5 transition-colors duration-200">
            Ask AgroChat
          </h2>
          <p className="text-[#111811] dark:text-gray-300 text-sm sm:text-base font-normal leading-normal pb-3 pt-1 px-4 text-center transition-colors duration-200">
            Get instant answers to your crop-related questions. Our AI-powered
            assistant is here to help you optimize your farming practices.
          </p>

          {/* Chat Messages Display */}
          <div
            ref={chatContainerRef}
            className="flex flex-col w-full max-w-full mx-auto mb-4 h-[400px] sm:h-[500px] md:h-[600px] overflow-y-auto border border-[#dce5dc] dark:border-gray-700 rounded-xl bg-green-300 dark:bg-gray-800 p-3 sm:p-4 transition-colors duration-200"
          >
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-black dark:text-white text-base sm:text-lg transition-colors duration-200">
                <p className="text-center px-2">Ask a question to get started!</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-3 sm:mb-4 ${
                    message.type === "question" ? "self-end" : "self-start"
                  }`}
                >
                  <div
                    className={`p-2 sm:p-3 rounded-lg max-w-[85%] sm:max-w-[80%] transition-colors duration-200 ${
                      message.type === "question"
                        ? "bg-[#e6f7e6] dark:bg-green-700 text-[#111811] dark:text-white ml-auto"
                        : "bg-[#f1f5f1] dark:bg-gray-700 text-[#111811] dark:text-white"
                    }`}
                  >
                    {message.type === "question" ? (
                      <p className="whitespace-pre-wrap break-words text-sm sm:text-base">
                        {message.content}
                      </p>
                    ) : (
                      <div className="markdown-content text-black dark:text-white transition-colors duration-200 text-sm sm:text-base">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            {loader && (
              <div className="self-start p-2 sm:p-3 rounded-lg bg-[#f1f5f1] dark:bg-gray-700 text-[#14b714] dark:text-green-400 transition-colors duration-200">
                <SyncLoader color="#14b714" size={6} margin={2} />
              </div>
            )}
          </div>

          {/* Input Field and Send Button */}
          <div className="flex justify-center px-4 py-3">
            <div className="flex w-full max-w-full relative">
              <input
                placeholder="Hello! How Can I Help You?"
                className="form-input w-full rounded-xl text-[#111811] dark:text-white focus:outline-0 focus:ring-0 border border-[#dce5dc] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#14b714] dark:focus:border-green-500 h-12 sm:h-14 md:h-16 placeholder:text-[#638863] dark:placeholder:text-gray-400 p-3 sm:p-4 md:p-[18px] pr-12 sm:pr-14 md:pr-[60px] text-sm sm:text-base md:text-lg font-normal leading-normal transition-colors duration-200"
                value={question}
                onChange={handleInput}
                onKeyPress={handleKeyPress}
              />
              <button
                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#14b714] dark:bg-green-600 text-white cursor-pointer transition-colors duration-200 hover:bg-green-600 dark:hover:bg-green-700"
                onClick={getData}
                disabled={loader}
              >
                {loader ? (
                  <SyncLoader color="#ffffff" size={3} margin={1} />
                ) : (
                  <>
                    <BiSend size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Example Questions */}
          <h3 className="text-[#111811] dark:text-white text-base sm:text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 transition-colors duration-200">
            Example Questions
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 p-4">
            {/* Example 1 */}
            <div
              className="flex flex-1 gap-3 rounded-lg border border-[#dce5dc] dark:border-gray-700 bg-white dark:bg-gray-800 p-3 sm:p-4 items-center transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:bg-[#e7f7e7] dark:hover:bg-gray-700 cursor-pointer"
              onClick={() =>
                setQuestion("What are the best crops for my soil type?")
              }
            >
              <div className="text-[#14b714] dark:text-green-500 text-xl sm:text-2xl transition-colors duration-200 flex-shrink-0">
                <BiLeaf />
              </div>
              <h2 className="text-[#111811] dark:text-white text-sm sm:text-base font-bold leading-tight transition-colors duration-200">
                What are the best crops for my soil type?
              </h2>
            </div>

            {/* Example 2 */}
            <div
              className="flex flex-1 gap-3 rounded-lg border border-[#dce5dc] dark:border-gray-700 bg-white dark:bg-gray-800 p-3 sm:p-4 items-center transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:bg-[#e7f7e7] dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => setQuestion("How much water does this crop need?")}
            >
              <div className="text-[#14b714] dark:text-green-500 text-xl sm:text-2xl transition-colors duration-200 flex-shrink-0">
                <BiWater />
              </div>
              <h2 className="text-[#111811] dark:text-white text-sm sm:text-base font-bold leading-tight transition-colors duration-200">
                How much water does this crop need?
              </h2>
            </div>

            {/* Example 3 */}
            <div
              className="flex flex-1 gap-3 rounded-lg border border-[#dce5dc] dark:border-gray-700 bg-white dark:bg-gray-800 p-3 sm:p-4 items-center transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:bg-[#e7f7e7] dark:hover:bg-gray-700 cursor-pointer"
              onClick={() =>
                setQuestion(
                  "What's the optimal sunlight exposure for tomatoes?"
                )
              }
            >
              <div className="text-[#14b714] dark:text-green-500 text-xl sm:text-2xl transition-colors duration-200 flex-shrink-0">
                <BiSun />
              </div>
              <h2 className="text-[#111811] dark:text-white text-sm sm:text-base font-bold leading-tight transition-colors duration-200">
                What's the optimal sunlight exposure for tomatoes?
              </h2>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Chatbot;

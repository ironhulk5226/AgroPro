import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
      <Header />

      <div className="px-40 flex flex-1 justify-center py-5 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <h2 className="text-[#111811] dark:text-white tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5 transition-colors duration-200">
            Ask AgroChat
          </h2>
          <p className="text-[#111811] dark:text-gray-300 text-base font-normal leading-normal pb-3 pt-1 px-4 text-center transition-colors duration-200">
            Get instant answers to your crop-related questions. Our AI-powered
            assistant is here to help you optimize your farming practices.
          </p>

          {/* Chat Messages Display */}
          <div
            ref={chatContainerRef}
            className="flex flex-col w-[800px] max-w-[800px] mx-auto mb-4 h-[600px] overflow-y-auto border border-[#dce5dc] dark:border-gray-700 rounded-xl bg-green-300 dark:bg-gray-800 p-4 transition-colors duration-200"
          >
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-black dark:text-white text-lg transition-colors duration-200">
                <p>Ask a question to get started!</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.type === "question" ? "self-end" : "self-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-[80%] transition-colors duration-200 ${
                      message.type === "question"
                        ? "bg-[#e6f7e6] dark:bg-green-700 text-[#111811] dark:text-white ml-auto"
                        : "bg-[#f1f5f1] dark:bg-gray-700 text-[#111811] dark:text-white"
                    }`}
                  >
                    {message.type === "question" ? (
                      <p className="whitespace-pre-wrap break-words">
                        {message.content}
                      </p>
                    ) : (
                      <div className="markdown-content text-black dark:text-white transition-colors duration-200">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            {loader && (
              <div className="self-start p-3 rounded-lg bg-[#f1f5f1] dark:bg-gray-700 text-[#14b714] dark:text-green-400 transition-colors duration-200">
                <SyncLoader color="#14b714" size={8} margin={2} />
              </div>
            )}
          </div>

          {/* Input Field and Send Button */}
          <div className="flex justify-center px-4 py-3">
            <div className="flex w-[800px] max-w-[800px] relative">
              <input
                placeholder="Hello! How Can I Help You?"
                className="form-input w-full rounded-xl text-[#111811] dark:text-white focus:outline-0 focus:ring-0 border border-[#dce5dc] dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-[#14b714] dark:focus:border-green-500 h-16 placeholder:text-[#638863] dark:placeholder:text-gray-400 p-[18px] pr-[60px] text-lg font-normal leading-normal transition-colors duration-200"
                value={question}
                onChange={handleInput}
                onKeyPress={handleKeyPress}
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-[#14b714] dark:bg-green-600 text-white cursor-pointer transition-colors duration-200 hover:bg-green-600 dark:hover:bg-green-700"
                onClick={getData}
                disabled={loader}
              >
                {loader ? (
                  <SyncLoader color="#ffffff" size={4} margin={2} />
                ) : (
                  <>
                    <BiSend size={20} />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Example Questions */}
          <h3 className="text-[#111811] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4 transition-colors duration-200">
            Example Questions
          </h3>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
            {/* Example 1 */}
            <div
              className="flex flex-1 gap-3 rounded-lg border border-[#dce5dc] dark:border-gray-700 bg-white dark:bg-gray-800 p-4 items-center transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:bg-[#e7f7e7] dark:hover:bg-gray-700 cursor-pointer"
              onClick={() =>
                setQuestion("What are the best crops for my soil type?")
              }
            >
              <div className="text-[#14b714] dark:text-green-500 text-2xl transition-colors duration-200">
                <BiLeaf />
              </div>
              <h2 className="text-[#111811] dark:text-white text-base font-bold leading-tight transition-colors duration-200">
                What are the best crops for my soil type?
              </h2>
            </div>

            {/* Example 2 */}
            <div
              className="flex flex-1 gap-3 rounded-lg border border-[#dce5dc] dark:border-gray-700 bg-white dark:bg-gray-800 p-4 items-center transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:bg-[#e7f7e7] dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => setQuestion("How much water does this crop need?")}
            >
              <div className="text-[#14b714] dark:text-green-500 text-2xl transition-colors duration-200">
                <BiWater />
              </div>
              <h2 className="text-[#111811] dark:text-white text-base font-bold leading-tight transition-colors duration-200">
                How much water does this crop need?
              </h2>
            </div>

            {/* Example 3 */}
            <div
              className="flex flex-1 gap-3 rounded-lg border border-[#dce5dc] dark:border-gray-700 bg-white dark:bg-gray-800 p-4 items-center transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 hover:bg-[#e7f7e7] dark:hover:bg-gray-700 cursor-pointer"
              onClick={() =>
                setQuestion(
                  "What's the optimal sunlight exposure for tomatoes?"
                )
              }
            >
              <div className="text-[#14b714] dark:text-green-500 text-2xl transition-colors duration-200">
                <BiSun />
              </div>
              <h2 className="text-[#111811] dark:text-white text-base font-bold leading-tight transition-colors duration-200">
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

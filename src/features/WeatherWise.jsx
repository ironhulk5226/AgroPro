import React, { useState, useEffect } from "react";
import axios from "axios";
import { SyncLoader } from "react-spinners";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
// url : https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// API key : 6758d9c84d9f9d0f2a48d6cf155e670d

const WeatherWise = () => {
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

  const [city, setCity] = useState("");
  const [submittedCity, setSubmittedCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading,SetisLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const weatherIcons = {
    Clear: "/weather-icons/Clear.png",
    Clouds: "/weather-icons/Clouds.png",
    Rain: "/weather-icons/Rain.png",
    Mist: "/weather-icons/Mist.png",
  };

  const personalizedTips = {
    Clear: [
      "Irrigate crops early morning or late evening to conserve water.",
      "Provide shade to young plants during peak heat.",
      "Use mulch to prevent soil moisture loss.",
    ],
    Clouds: [
      "Monitor for fungal diseases due to increased humidity.",
      "Adjust irrigation based on cloud cover and soil moisture.",
      "Ensure drainage is not blocked due to possible drizzle.",
    ],
    Rain: [
      "Check for waterlogging and ensure proper drainage.",
      "Reduce irrigation frequency to avoid root rot.",
      "Secure plants against heavy rain or wind.",
    ],
    Mist: [
      "Use antifungal sprays if mist persists over days.",
      "Increase plant spacing to improve air circulation.",
      "Avoid watering in the evening to reduce humidity buildup.",
    ],
    Default: [
      "Keep monitoring local conditions for crop-specific care.",
      "Adjust irrigation and pest control accordingly.",
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    SetisLoading(true);
    setWeatherData(null);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric` // &units = metric for converting F to degree celsius
      );

      setSubmittedCity(city);
      setWeatherData({
        temperature: `${response.data.main.temp} °C`,
        humidity: `${response.data.main.humidity}%`,
        condition: response.data.weather[0].main,
        windSpeed: `${response.data.wind.speed} m/s`,
        description: response.data.weather[0].description,
      });
    } catch (error) {
      console.log(error);
    }
    finally{
        SetisLoading(false);
    }
    setCity("");
  };

  return (
   <>
    {isPageLoading && <Loader />}
    <Header/>
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-6 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#111811] dark:text-white mb-6 transition-colors duration-200">
          ⛅ Weather Wise
        </h1>

        {/* City Input */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8"
        >
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="px-4 py-2 border border-[#14b714] dark:border-green-500 rounded-lg shadow w-full md:w-2/3 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all duration-200 hover:border-green-500 dark:hover:border-green-400 hover:shadow-md"
            required
          />
          <button
            type="submit"
            className="bg-[#4fa74f] hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
          >
            Get Weather
          </button>
        </form>


        {/* Loader */}
        {isLoading && (
            <div className="flex justify-center items-center my-10">
                <SyncLoader color="#15803d" size={12} />
            </div>
        )}

        {/* Weather Display */}
        {!isLoading && weatherData && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.4)] dark:shadow-[0_10px_25px_rgba(255,255,255,0.1)] p-6 mb-10 max-w-xl mx-auto border border-transparent dark:border-gray-700 transition-colors duration-200">
            <h2 className="text-2xl font-bold text-[#14b714] dark:text-green-400 text-center mb-6 transition-colors duration-200">
              Weather in {submittedCity}
            </h2>
            <div className="flex flex-col items-center justify-center">
              <img
                src={
                  weatherIcons[weatherData.condition]
                }
                alt={weatherData.condition}
                className="w-50 h-50 mb-4"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-lg text-gray-700 dark:text-gray-300 transition-colors duration-200">
                <p>
                  🌡️ <strong className="font-semibold">Temperature:</strong>{" "}
                  {weatherData.temperature}
                </p>
                <p>
                  💧 <strong className="font-semibold">Humidity:</strong>{" "}
                  {weatherData.humidity}
                </p>
                <p>
                  📝 <strong className="font-semibold">Description:</strong>{" "}
                  {weatherData.description.charAt(0).toUpperCase() +
                    weatherData.description.slice(1)}
                </p>
                <p>
                  🌥️ <strong className="font-semibold">Condition:</strong>{" "}
                  {weatherData.condition}
                </p>
                <p>
                  💨 <strong className="font-semibold">Wind Speed:</strong>{" "}
                  {weatherData.windSpeed}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Personalized Recommendations */}
        {!isLoading && weatherData && (
          <div className="bg-green-100 dark:bg-gray-800 border border-green-300 dark:border-gray-600 rounded-lg shadow-md p-6 transition-colors duration-200">
            <h2 className="text-xl font-bold text-[#14b714] dark:text-green-400 mb-4 transition-colors duration-200">
              🌱 Personalized Farming Tips
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-green-900 dark:text-green-300 transition-colors duration-200">
              {(personalizedTips[weatherData.condition] ||
                personalizedTips["Default"]).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
    <Footer/>
   </>
  );
};

export default WeatherWise;

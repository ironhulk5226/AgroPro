import Features from "./Pages/Features";
import Chatbot from "./Pages/Chatbot";
import Hero from "./Pages/Hero";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import AboutTifan from "./Pages/AboutTifan";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import WeatherWise from "./features/WeatherWise";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/features" element={<Features/>} />
        <Route path="/about" element={<AboutTifan/>} />
        <Route path="/chatbot" element={<Chatbot/>} />
        <Route path="/weatherwise" element={<WeatherWise/>} />
         <Route path="*" element={<Hero/>} />
      </Routes>
   </BrowserRouter>
    
  )
}

export default App

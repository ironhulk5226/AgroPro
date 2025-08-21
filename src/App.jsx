import Features from "./Pages/Features";
import Chatbot from "./Pages/Chatbot";
import Hero from "./Pages/Hero";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import AboutTifan from "./Pages/AboutTifan";
import Schemes from "./features/Schemes";
import { BrowserRouter, Route, Routes,Navigate} from "react-router-dom";
import WeatherWise from "./features/WeatherWise";
import GrowSmart from "./features/GrowSmart";
import MultiStepForm from "./features/multiStepForm";



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/home" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/features" element={<Features/>} />
        <Route path="/about" element={<AboutTifan/>} />
        <Route path="/chatbot" element={<Chatbot/>} />
        <Route path="/weatherwise" element={<WeatherWise/>} />
        <Route path="/growsmart" element={<GrowSmart/>} />
        <Route path="/schemes" element={<Schemes/>}/>
        <Route path="/form" element={<MultiStepForm/>}/>
        <Route path="*" element={<Hero/>} />
      </Routes>
   </BrowserRouter>
     
  )
}

export default App

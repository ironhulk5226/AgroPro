import React, { useState } from "react";
import Header from "../components/Header.jsx";
import Step1 from "../components/formSteps/Step1.jsx";
import Step2 from "../components/formSteps/Step2.jsx";
import Step3 from "../components/formSteps/Step3.jsx";
import Roadmap from "./Roadmap.jsx";
import axios from "axios";
import { SyncLoader } from "react-spinners";

const Page = {
  Step1: 1,
  Step2: 2,
  Step3: 3,
};
const Final_Step = Page.Step3;
const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(Page.Step1);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [roadmapData, setRoadmapData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const GEMINI_API_URL = import.meta.env.VITE_GEMINI_API_URL;
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  const [inputs, setInputs] = useState({
    step1Ip: {
      cropType: "",
      plantingDate: "",
      area: "",
      modified: "",
    },
    step2Ip: {
      soilTest: "",
      nitrogen: "",
      phosphorus: "",
      potassium: "",
      pH: "",
      carbon: "",
      soilType: "",
    },
    step3Ip: {
      waterSource: "",
      irrigationType: "",
      wateringFreq: "",
    },
  });

  const Steps = {
    [Page.Step1]: Step1,
    [Page.Step2]: Step2,
    [Page.Step3]: Step3,
  };

  const Component = Steps[currentStep];
  const submitButtonText =
    Final_Step === currentStep ? "Create Roadmap" : "Next";

  async function generateRoadmapFromAI() {
    console.log("Generating roadmap with inputs:", inputs);
    setIsGenerating(true);

    // Create a detailed prompt for Gemini
    const prompt = `You are an expert agricultural advisor. Based on the following farming data, create a comprehensive cultivation roadmap from planting to harvest.

Farming Data:
- Crop Type: ${inputs.step1Ip.cropType}
- Planting Date: ${inputs.step1Ip.plantingDate}
- Area: ${inputs.step1Ip.area} acres
- Genetically Modified: ${inputs.step1Ip.modified ? 'Yes' : 'No'}
- Soil Test Available: ${inputs.step2Ip.soilTest ? 'Yes' : 'No'}
${inputs.step2Ip.soilTest ? `- Nitrogen (N): ${inputs.step2Ip.nitrogen}
- Phosphorus (P): ${inputs.step2Ip.phosphorus}
- Potassium (K): ${inputs.step2Ip.potassium}
- pH Level: ${inputs.step2Ip.pH}
- Organic Carbon: ${inputs.step2Ip.carbon}%
- Soil Type: ${inputs.step2Ip.soilType}` : ''}
- Water Source: ${inputs.step3Ip.waterSource}
- Irrigation Type: ${inputs.step3Ip.irrigationType}
- Watering Frequency: ${inputs.step3Ip.wateringFreq}

Provide a detailed roadmap in the following JSON format:
{
  "cropName": "crop name",
  "plantingDate": "date",
  "harvestDate": "calculated harvest date",
  "totalDuration": "X days",
  "currentPhase": "first phase name",
  "phases": [
    {
      "id": 1,
      "name": "Phase Name",
      "duration": "X-Y days",
      "startDay": 0,
      "endDay": number,
      "status": "in-progress",
      "tasks": [
        {
          "id": unique_id,
          "title": "Task title",
          "day": "Day X or Day X-Y",
          "completed": false,
          "description": "Detailed description",
          "category": "fertilizer" or "pest-control" or "disease-control" (optional),
          "recurring": true/false (optional)
        }
      ]
    }
  ]
}

Include phases like: Land Preparation, Sowing/Transplanting, Vegetative Growth, Flowering & Fruiting, and Harvesting. Each phase should have 4-8 detailed tasks with specific day numbers and actionable descriptions. Make it specific to the ${inputs.step1Ip.cropType} crop and consider the soil and water conditions provided. Return ONLY valid JSON, no markdown or additional text.`;

    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      systemInstruction: {
        role: "system",
        parts: [
          {
            text: "You are an agricultural expert AI that provides detailed, accurate farming roadmaps. Always respond with valid JSON only, no additional text or markdown formatting.",
          },
        ],
      },
    };

    try {
      console.log("Sending prompt to Gemini API:", prompt);
      const response = await axios.post(GEMINI_API_URL, payload, {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_API_KEY,
        },
      });

      const aiResponse = response.data.candidates[0].content.parts[0].text;
      
      // Clean the response to extract JSON
      let cleanedResponse = aiResponse.trim();
      
      // Remove markdown code blocks if present
      if (cleanedResponse.startsWith('```json')) {
        cleanedResponse = cleanedResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (cleanedResponse.startsWith('```')) {
        cleanedResponse = cleanedResponse.replace(/```\n?/g, '');
      }
      
      const parsedData = JSON.parse(cleanedResponse);
      setRoadmapData(parsedData);
      setShowRoadmap(true);
    } catch (error) {
      console.error("Error generating roadmap:", error);
      alert("Failed to generate roadmap. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  function handleNext() {
    if (currentStep === Page.Step1) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === Page.Step2) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - generate roadmap from AI
      console.log("Form submitted with data:", inputs);
      generateRoadmapFromAI();
    }
  }

  function handleBack() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  function handleIpChange({stepKey, value, inputKey}) {
    const oldIp = structuredClone(inputs);

    oldIp[stepKey][inputKey] = value;

    setInputs(oldIp);
  }

  // Show loading state while generating roadmap
  if (isGenerating) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="text-center">
            <SyncLoader color="#14b714" size={15} margin={5} />
            <h2 className="mt-6 text-2xl font-bold text-gray-800 dark:text-white">
              🌾 Generating Your Personalized Roadmap...
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Our AI is analyzing your farm data and creating a custom cultivation plan
            </p>
          </div>
        </div>
      </>
    );
  }

  // Show roadmap after form submission
  if (showRoadmap && roadmapData) {
    return <Roadmap formData={inputs} roadmapData={roadmapData} />;
  }

  return (
    <>
      <Header />
    <div
      className="relative flex size-full min-h-screen flex-col bg-white dark:bg-gray-900 group/design-root overflow-x-hidden transition-colors duration-200"
      style={{
        "--select-button-svg":
          "url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(120,136,99)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e')",
        fontFamily: 'Lexend, "Noto Sans", sans-serif',
      }}
    >
      <div className="layout-container flex h-full grow flex-col">

        {/* Content */}
        <div className="px-40 flex flex-1 justify-center py-5 bg-white dark:bg-gray-900 transition-colors duration-200">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#151811] dark:text-white tracking-light text-[32px] font-bold leading-tight transition-colors duration-200">
                  Field Data Wizard
                </p>
                <p className="text-[#788863] dark:text-gray-400 text-sm font-normal leading-normal transition-colors duration-200">
                  Follow these steps to input your crop and field data.
                </p>
              </div>
            </div>
            {/* Tabs */}
            <div className="pb-3">
              <div className="flex border-b border-[#e1e5dc] dark:border-gray-700 px-4 gap-8 transition-colors duration-200">
                <a onClick={() => setCurrentStep(Page.Step1)}
                  className={` flex flex-col items-center justify-center pb-[13px] pt-4 transition-colors duration-200
                  ${currentStep === Page.Step1 ? "border-b-[3px] border-b-[#151811] dark:border-b-white text-[#151811] dark:text-white" : "text-[#788863] dark:text-gray-400"}`}
                >
                  <p className="text-sm font-bold hover: cursor-pointer hover:text-[#151811] dark:hover:text-white transition-colors duration-200">Crop</p>
                </a>
                <a onClick={() => setCurrentStep(Page.Step2)}
                  className={` flex flex-col items-center justify-center pb-[13px] pt-4 transition-colors duration-200
                  ${currentStep === Page.Step2 ? "border-b-[3px] border-b-[#151811] dark:border-b-white text-[#151811] dark:text-white" : "text-[#788863] dark:text-gray-400"}`}
                >
                  <p className="hover: cursor-pointer text-sm font-bold hover:text-[#151811] dark:hover:text-white transition-colors duration-200">Soil</p>
                </a>
                <a onClick={() => setCurrentStep(Page.Step3)}
                  className={` flex flex-col items-center justify-center pb-[13px] pt-4 transition-colors duration-200
                  ${currentStep === Page.Step3 ? "border-b-[3px] border-b-[#151811] dark:border-b-white text-[#151811] dark:text-white" : "text-[#788863] dark:text-gray-400"}`}
                >
                  <p className="hover: cursor-pointer text-sm font-bold hover:text-[#151811] dark:hover:text-white transition-colors duration-200">Irrigation</p>
                </a>
              </div>
            </div>

            <Component stepKey={`step${currentStep}Ip`} onChange={handleIpChange} inputs={inputs[`step${currentStep}Ip`]}/>

            {/* Buttons */}
            <div className="flex justify-stretch">
              <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-between">
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    className="hover:bg-[#91e619b9] dark:hover:bg-green-600 hover: cursor-pointer flex min-w-[84px] items-center justify-center rounded-xl h-10 px-4 bg-[#f3f4f0] dark:bg-gray-700 font-bold text-gray-800 dark:text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="hover:bg-[#91e619b9] dark:hover:bg-green-600 hover: cursor-pointer flex min-w-[84px] items-center justify-center rounded-xl h-10 px-4 bg-[#91e619] dark:bg-green-600 font-bold text-gray-800 dark:text-white transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
                >
                  {submitButtonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default MultiStepForm;

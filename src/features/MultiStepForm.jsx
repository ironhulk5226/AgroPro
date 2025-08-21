import React, { useState } from "react";
import Header from "../components/Header.jsx";
import Step1 from "../components/formSteps/Step1.jsx";
import Step2 from "../components/formSteps/Step2.jsx";
import Step3 from "../components/formSteps/Step3.jsx";

const Page = {
  Step1: 1,
  Step2: 2,
  Step3: 3,
};
const Final_Step = Page.Step3;
const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(Page.Step1);

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

  function handleNext() {
    if (currentStep === Page.Step1) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === Page.Step2) {
      setCurrentStep(currentStep + 1);
    } else {
      alert("Form submitted");
      console.log(inputs)
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

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white dark:bg-gray-900 group/design-root overflow-x-hidden transition-colors duration-200"
      style={{
        "--select-button-svg":
          "url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(120,136,99)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e')",
        fontFamily: 'Lexend, "Noto Sans", sans-serif',
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Header />

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
  );
};

export default MultiStepForm;

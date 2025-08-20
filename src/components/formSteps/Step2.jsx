import React from "react";

const Step2 = ({inputs, onChange = () => {}, stepKey}) => {
  const { soilTest, nitrogen, phosphorus, potassium, pH, carbon, soilType } =
    inputs || {};

  function handleChange(inputKey, isCheckbox = false) {
  return (event) => {
    const value = isCheckbox ? event.target.checked : event.target.value;
    onChange({ value, stepKey, inputKey });
  };
}


  return (
    <div className="p-4 flex flex-col max-w-[960px] w-full">
      {/* Card */}
      <div className="p-4">
        <div className="flex flex-col items-stretch justify-start rounded-xl xl:flex-row xl:items-start">
          <div
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuASyH7Rld2PyIlN2K9Oj6t8aZE7devWU7i5X2CoX3HyjhbWA5WOWfNQU0QvMfcTk4b5ITGSMGOQEjFILvQm6gVTWMXrfB6JftbNRb2ZHqzLRQNwK9eatKqtBTBnuRBTUQzQH4_ai3VfuFQrrWR1h4Gz6ncBKilt_rWSkDf7zb3OlXAD82WrqTu7gnsb5kkn3z574aQpZJs_AWuc9GAv2_Cb2wJ6tJh2_g07CFWgkANbJFBUnjIfrcXSSvvKSZXkq1E4ioLYYbeI-ANG")',
            }}
          ></div>
          <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 xl:px-4">
            <p className="text-[#151811] text-lg font-bold leading-tight">
              Soil and Fertility Information
            </p>
            <div className="flex items-end gap-3 justify-between">
              <p className="text-[#788863] text-base">
                Enter details about the soil and fertility of your field.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Soil Test Availability */}
      <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
        <div className="flex flex-col justify-center">
          <p className="font-medium">Soil Test</p>
          <p className="text-[#788863] text-sm">
            Enable if soil test results are avaliable
          </p>
        </div>
        <label
          className={`relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full transition-colors duration-300 p-0.5 ${
            soilTest ? "bg-green-500" : "bg-[#f3f4f0]"
          }`}
        >
          {/* Hidden Checkbox */}
          <input
            type="checkbox"
            checked={soilTest}
            onChange={handleChange("soilTest", true)}
            className="hidden"
          />

          {/* Knob */}
          <div
            className={`h-[27px] w-[27px] rounded-full bg-white shadow transform transition-transform duration-300 ${
              soilTest ? "translate-x-5" : ""
            }`}
          ></div>
        </label>
      </div>

      {/* Soil Fields */}
      <div className={`
        ${soilTest === true ? "": "hidden"}`}>
        {[
        {
          label: "Nitrogen (N)",
          placeholder: "Enter Nitrogen level",
          value: nitrogen,
          key: "nitrogen"
        },
        {
          label: "Phosphorus (P)",
          placeholder: "Enter Phosphorus level",
          value: phosphorus,
          key: "phosphorus",
        },
        {
          label: "Potassium (K)",
          placeholder: "Enter Potassium level",
          value: potassium,
          key: "potassium",
        },
        { label: "Soil pH", 
        placeholder: "Enter Soil pH", 
        value: pH,
        key: "pH",
        },
        {
          label: "Organic Carbon %",
          placeholder: "Enter Organic Carbon %",
          value: carbon,
          key: "carbon",
        },
      ].map((field, index) => (
        <div key={index} className="flex max-w-[480px] gap-4 px-4 py-3">
          <label className="flex flex-col w-full">
            <p className="text-[#151811] text-base font-medium pb-2">
              {field.label}
            </p>
            <input
              placeholder={field.placeholder}
              value={field.value}
              onChange={handleChange(field.key)}
              className="form-input flex w-full rounded-xl text-[#151811] border-none bg-[#f3f4f0] h-14 placeholder:text-[#788863] p-4 text-base"
            />
          </label>
        </div>
      ))}
      </div>

      {/* Soil Type */}
      <div className="flex max-w-[480px] gap-4 px-4 py-3">
        <label className="flex flex-col w-full">
          <p className="text-[#151811] text-base font-medium pb-2">Soil Type</p>
          <select
            value={soilType}
            onChange={handleChange("soilType")}
            className="form-input w-full rounded-xl text-[#151811] border-none bg-[#f3f4f0] h-14 p-4 text-base"
          >
            <option hidden disabled value="">Select Soil Type</option>
            <option value="sandy">Sandy</option>
            <option value="clay">Clay</option>
            <option value="loamy">Loamy</option>
            <option value="rocky">Rocky</option>
          </select>
        </label>
      </div>

      {/* Fertilizers */}
      {/* <div className="flex gap-3 p-3 flex-wrap">
        {["Urea", "DAP", "MOP", "NPK", "Other"].map((fertilizer, i) => (
          <div
            key={i}
            className="flex h-8 items-center justify-center gap-x-2 rounded-xl bg-[#f3f4f0] px-4"
          >
            <p className="text-[#151811] text-sm font-medium">{fertilizer}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Step2;

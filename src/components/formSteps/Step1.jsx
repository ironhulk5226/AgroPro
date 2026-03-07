import React from "react";

const Step1 = ({ inputs, onChange = () => {}, stepKey }) => {
  const { cropType, plantingDate, area, modified } = inputs || {};

  function handleChange(inputKey, isCheckbox = false) {
  return (event) => {
    const value = isCheckbox ? event.target.checked : event.target.value;
    onChange({ value, stepKey, inputKey });
  };
}
  return (
    <div>
      {/* Card */}
      <div className="p-4">
        <div className="flex flex-col items-stretch justify-start rounded-xl xl:flex-row xl:items-start">
          <div
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDPJgC_yMjNsYIVL-ONZmgg_S5DXS9Ae4xIdVLtT518UJsUObIX7A-6m9FPquqzhlaKfHyYR7Lc9rHCxlfH_sEU2YRhW1dnZdseMWNJ6znWLJCBuuYq8MZxaIOOxsoGdrnVYjlrDDwd_O_LpneHgQPipeT4ucNeAH_-_WzhcrZz0F1P67Rojhb7MEs4jkVOWWru8KkkRq1w9vjhbBYu8YGcm0fvnT4XqZcLqraB0rBoybmxQ082mYCadRaU3LDccG6BSQW7Pc98KeSK")',
            }}
          ></div>
          <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 xl:px-4">
            <p className="text-[#151811] text-lg font-bold leading-tight">
              Crop Information
            </p>
            <div className="flex items-end gap-3 justify-between">
              <p className="text-[#788863] text-base">
                Enter details about the crop you are cultivating.
              </p>
              
            </div>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="pb-2 font-medium">Crop Type</p>
          <select
            value={cropType}
            onChange={handleChange("cropType")}
            className="form-input rounded-xl bg-[#f3f4f0] h-14 p-4"
          >
            <option hidden disabled value="" required>
              Select Crop
            </option>
            <option value="brinjal">Brinjal</option>
            <option value="chili">Chili</option>
            <option value="onion">Tomato</option>
          </select>
        </label>
      </div>

      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="pb-2 font-medium">Planting Date</p>
          <input
            type="date"
            value={plantingDate}
            onChange={handleChange("plantingDate")}
            placeholder="YYYY-MM-DD"
            className="form-input rounded-xl bg-[#f3f4f0] h-14 p-4"
            required
          />
        </label>
      </div>

      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="pb-2 font-medium">Area (acre)</p>
          <input
            value={area}
            onChange={handleChange("area")}
            placeholder="Enter area"
            className="form-input rounded-xl bg-[#f3f4f0] h-14 p-4"
            required
          />
        </label>
      </div>

      {/* Toggle */}
      <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between">
        <div className="flex flex-col justify-center">
          <p className="font-medium">Genetically Modified</p>
          <p className="text-[#788863] text-sm">
            Enable if the crop is genetically modified
          </p>
        </div>
        <label
          className={`relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full transition-colors duration-300 p-0.5 ${
            modified ? "bg-green-500" : "bg-[#daf0da]"
          }`}
        >
          {/* Hidden Checkbox */}
          <input
            type="checkbox"
            checked={modified}
            onChange={handleChange("modified", true)}
            className="hidden"
          />

          {/* Knob */}
          <div
            className={`h-[27px] w-[27px] rounded-full bg-white shadow transform transition-transform duration-300 ${
              modified ? "translate-x-5" : ""
            }`}
          ></div>
        </label>
      </div>
    </div>
  );
};

export default Step1;

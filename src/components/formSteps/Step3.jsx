import React from "react";

const Step3 = ({inputs, onChange = () => {}, stepKey}) => {
  const { waterSource, irrigationType, wateringFreq } = inputs || {};

  function handleChange(inputKey) {
    return (event) => {
      onChange({ value: event.target.value, stepKey, inputKey });
    };
  }

  return (
    <div className="p-4 @container">
      <div className="flex flex-col items-stretch justify-start rounded-xl @xl:flex-row @xl:items-start">
        <div
          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAzrwEuaYuPJdaSq0O9xW-O71pka4SJ_3Yfvhx8cQoyw3Zg8Cpq_5m1fcGynlmCRAJEahIIPGJMxJmTjorye9UQAhI-d1eVigDhIrMibP0sdg8XkF2F9clC5KkSmDVto57hOB8kNdvLAAsJhzbngKs5n-qa7UnvTnY0KAAMf9SUSAULlX8VCPPrVrjpLn0xQ7wweDo99S0NIQMxOYEzrQll2FBkigxtWqPSLSFjBGvPII0vDKYDsDmCf8F-gpcQuYEWZaGBwWRTVXkC')",
          }}
        ></div>
        <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-4">
          <p className="text-[#151811] text-lg font-bold leading-tight tracking-[-0.015em]">
            Irrigation Information
          </p>
          <div className="flex items-end gap-3 justify-between">
            <p className="text-[#788863] text-base font-normal leading-normal">
              Enter details about the irrigation of your field.
            </p>
          </div>
        </div>
      </div>

      {/* Water Source */}
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#151811] text-base font-medium leading-normal pb-2">
            Water Source
          </p>
          <select
            value={waterSource}
            onChange={handleChange("waterSource")}
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#151811] focus:outline-0 focus:ring-0 border-none bg-[#f3f4f0] h-14 placeholder:text-[#788863] p-4 text-base font-normal leading-normal"
          >
            <option hidden disabled value="">Select Water Source</option>
            <option value="borewell">Borewell</option>
            <option value="river">River</option>
            <option value="well">Well</option>
            <option value="rain water">Rain water</option>
          </select>
        </label>
      </div>

      {/* Irrigation Type */}
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#151811] text-base font-medium leading-normal pb-2">
            Irrigation Type
          </p>
          <select
            value={irrigationType}
            onChange={handleChange("irrigationType")}
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#151811] focus:outline-0 focus:ring-0 border-none bg-[#f3f4f0] h-14 placeholder:text-[#788863] p-4 text-base font-normal leading-normal"
          >
            <option  hidden disabled value="">Select Irrigation Type</option>
            <option value="sprinkler">Sprinkler</option>
            <option value="drip">Drip</option>
            <option value="canal">Canal</option>
            <option value="rain">Rain</option>
          </select>
        </label>
      </div>

      {/* Frequency of Watering */}
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#151811] text-base font-medium leading-normal pb-2">
            Frequency of Watering
          </p>
          <select
            value={wateringFreq}
            onChange={handleChange("wateringFreq")}
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#151811] focus:outline-0 focus:ring-0 border-none bg-[#f3f4f0] h-14 placeholder:text-[#788863] p-4 text-base font-normal leading-normal"
          >
            <option  hidden disabled value="">Select Frequency of Watering</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-weekly</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Step3;

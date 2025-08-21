import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const GrowSmart = () => {
  const [plantingMethod, setPlantingMethod] = useState("Square Grid Planting");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [border, setBorder] = useState("");
  const [unit, setUnit] = useState("Centimeter (cm)");
  const [spacing, setSpacing] = useState("");
  const [distanceUnit, setDistanceUnit] = useState("Centimeter (cm)");
  const [result, setResult] = useState(null);
  const [showExample, setShowExample] = useState(false);

  const unitToMeters = {
    "Centimeter (cm)": 0.01,
    "Meter (m)": 1,
    "Feet (ft)": 0.3048,
    Acres: 63.61, // For square plot (sqrt of 4046.86)
  };

  const imageMap = {
    "Square Grid Planting": "planting-methods/square-grid.png",
    "Rectangle Grid Planting": "planting-methods/rectangle-grid.png",
    "Triangle Planting": "planting-methods/triangle-planting.png",
    "Paired Row Planting": "planting-methods/paired-row.png",
  };

  const exampleMap = {
    "Square Grid Planting": (
      <>
        <p>📝 Note : For Square Grid Planting length = breadth </p>
        <p>
          📐 <strong>Area</strong> = Length × Width = 10 × 10 = 100 m²
        </p>
        <p>
          🌿 <strong>Plants per Row</strong> = Length / Spacing = 10 / 1 = 10
        </p>
        <p>
          🌿 <strong>Plants per Column</strong> = Width / Spacing = 10 / 1 = 10
        </p>
        <p>
          ✅ <strong>Total Plants</strong> = 10 × 10 = 100
        </p>
      </>
    ),
    "Rectangle Grid Planting": (
      <>
        <p>
          📐 <strong>Area</strong> = Length × Width = 20 × 10 = 200 m²
        </p>
        <p>
          🌿 <strong>Plants per Row</strong> = Length / Spacing = 20 / 1 = 20
        </p>
        <p>
          🌿 <strong>Plants per Column</strong> = Width / Spacing = 10 / 1 = 10
        </p>
        <p>
          ✅ <strong>Total Plants</strong> = 20 × 10 = 200
        </p>
      </>
    ),
    "Triangle Planting": (
      <>
        <p>
          📐 <strong>Area</strong> = Length × Width = 10 × 10 = 100 m²
        </p>
        <p>
          🔺 <strong>Spacing Factor</strong> ≈ 0.866
        </p>
        <p>
          🌿 <strong>Total Plants</strong> = (Area / (Spacing² × 0.866)) = 100 /
          (1 × 0.866) ≈ 115
        </p>
      </>
    ),
    "Paired Row Planting": (
      <>
        <p>
          📐 <strong>Area</strong> = Length × Width = 20 × 10 = 200 m²
        </p>
        <p>
          🌿 <strong>Between Rows</strong> = 1m, <strong>Within Pair</strong> =
          0.5m
        </p>
        <p>
          🌿 <strong>Plants per Row</strong> = 20 / 1 = 20
        </p>
        <p>
          🌿 <strong>Pairs</strong> = 10 / (1 + 0.5) = 6.66 ≈ 6
        </p>
        <p>
          ✅ <strong>Total Plants</strong> = 20 × 6 = 120
        </p>
      </>
    ),
  };

  const calculatePlants = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const b = parseFloat(border);
    const s = parseFloat(spacing);

    if (isNaN(l) || isNaN(w) || isNaN(b) || isNaN(s) || s <= 0) {
      setResult("Please fill all fields with valid numbers.");
      return;
    }

    if (b >= l / 2 || b >= w / 2) {
      setResult("Border value must be less than half of length and width.");
      return;
    }

    if (plantingMethod === "Square Grid Planting" && l !== w) {
      setResult("In Square Grid Planting, length and width must be equal.");
      return;
    }

    const unitFactor = unitToMeters[unit] || 1;
    const spacingFactor = unitToMeters[distanceUnit] || 1;

    const usableLength = (l - 2 * b) * unitFactor;
    const usableWidth = (w - 2 * b) * unitFactor;
    const spacingMeters = s * spacingFactor;

    const area = usableLength * usableWidth;
    let totalPlants = 0;

    if (plantingMethod === "Triangle Planting") {
      totalPlants = Math.floor(area / (spacingMeters * spacingMeters * 0.866));
    } else if (plantingMethod === "Paired Row Planting") {
      const rows = Math.floor(usableLength / spacingMeters);
      const pairs = Math.floor(usableWidth / (spacingMeters * 1.5));
      totalPlants = rows * pairs;
    } else {
      const rows = Math.floor(usableWidth / spacingMeters);
      const columns = Math.floor(usableLength / spacingMeters);
      totalPlants = rows * columns;
    }

    const spacingInCm = spacingMeters * 100;
    const areaInCm = area * 10000;

    setResult(
      <div className="mt-8 p-6 pl-2.5 bg-green-100 dark:bg-gray-700 border border-green-300 dark:border-gray-600 rounded-2xl shadow-md transition-colors duration-200">
        <h2 className="text-xl font-semibold text-green-800 dark:text-green-400 mb-2 transition-colors duration-200">
           <strong>Calculation Results:</strong>
        </h2>
        <p className="text-base text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200">
          📐 <strong>Total Area:</strong> {areaInCm.toFixed(2)} cm²
        </p>
        <p className="text-base text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-200">
          🌿 <strong>Spacing Between Plants:</strong> {spacingInCm.toFixed(0)}{" "}
          cm
        </p>
        <p className="text-base text-gray-700 dark:text-gray-300 transition-colors duration-200">
          ✅ <strong>Number of Plants:</strong> {totalPlants}
        </p>
      </div>
    );
    setShowExample(false);
  };

  const handleShowExample = () => {
    setResult(null);
    setShowExample(true);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-6 transition-colors duration-200">
        <div className="max-w-3xl mx-auto bg-green-100 dark:bg-gray-800 rounded-xl shadow-xl p-8 transition-colors duration-200">
          <h2 className="text-3xl font-bold text-[#111811] dark:text-white text-center mb-6 transition-colors duration-200">
            🌱 Grow Smart: Crop Cultivation Calculator
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200 transition-colors duration-200">
                Planting Method:
              </label>
              <select
                className="w-full p-2 border border-green-400 dark:border-green-500 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 hover:border-green-500 dark:hover:border-green-400 hover:shadow-md"
                value={plantingMethod}
                onChange={(e) => setPlantingMethod(e.target.value)}
              >
                {Object.keys(imageMap).map((method) => (
                  <option key={method}>{method}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <img
                src={imageMap[plantingMethod]}
                alt={`${plantingMethod} Diagram`}
                className="w-100 h-auto my-4 border border-green-700 rounded"
              />
            </div>

            {["Length of Land", "Width of Land", "Border"].map((label, i) => (
              <div key={label}>
                <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200 transition-colors duration-200">{label}:</label>
                <input
                  type="number"
                  value={i === 0 ? length : i === 1 ? width : border}
                  onChange={(e) =>
                    i === 0
                      ? setLength(e.target.value)
                      : i === 1
                      ? setWidth(e.target.value)
                      : setBorder(e.target.value)
                  }
                  className="w-full p-2 border border-green-400 dark:border-green-500 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all duration-200 hover:border-green-500 dark:hover:border-green-400 hover:shadow-md"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}

            <div>
              <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200 transition-colors duration-200">Land Unit:</label>
              <select
                className="w-full p-2 border border-green-400 dark:border-green-500 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 hover:border-green-500 dark:hover:border-green-400 hover:shadow-md"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                {Object.keys(unitToMeters).map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200 transition-colors duration-200">
                Spacing Between Plants (Plant to Plant Distance):
              </label>
              <input
                type="number"
                value={spacing}
                onChange={(e) => setSpacing(e.target.value)}
                className="w-full p-2 border border-green-400 dark:border-green-500 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all duration-200 hover:border-green-500 dark:hover:border-green-400 hover:shadow-md"
                placeholder="Enter spacing"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200 transition-colors duration-200">Distance Unit:</label>
              <select
                className="w-full p-2 border border-green-400 dark:border-green-500 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-200 hover:border-green-500 dark:hover:border-green-400 hover:shadow-md"
                value={distanceUnit}
                onChange={(e) => setDistanceUnit(e.target.value)}
              >
                <option>Centimeter (cm)</option>
                <option>Meter (m)</option>
                <option>Feet (ft)</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center">
              <button
                className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
                onClick={calculatePlants}
              >
                Calculate
              </button>
              <button
                className="bg-white dark:bg-gray-700 border border-green-500 dark:border-green-400 text-green-700 dark:text-green-400 font-semibold py-2 px-6 rounded-lg hover:bg-green-300 dark:hover:bg-gray-600 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
                onClick={handleShowExample}
              >
                Show Example
              </button>
            </div>

            {result && (
              <div className="mt-6 text-center font-medium text-green-900 dark:text-green-400 text-xl transition-colors duration-200">
                {result}
              </div>
            )}

            {showExample && (
              <div className="mt-6 bg-white dark:bg-gray-700 border border-green-300 dark:border-gray-600 rounded p-4 text-green-800 dark:text-green-400 font-medium space-y-2 transition-colors duration-200">
                {exampleMap[plantingMethod]}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GrowSmart;

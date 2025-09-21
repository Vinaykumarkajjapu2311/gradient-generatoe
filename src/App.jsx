import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [num, setNum] = useState(12);
  const [type, setType] = useState("linear");
  const [gradients, setGradients] = useState([]);
  const [inputValue, setInputValue] = useState("12");

  const getHexColorCode = () => {
    // Generate darker colors for dark theme
    const maxValue = 200; // Limit to darker colors
    const r = Math.floor(Math.random() * maxValue)
      .toString(16)
      .padStart(2, "0");
    const g = Math.floor(Math.random() * maxValue)
      .toString(16)
      .padStart(2, "0");
    const b = Math.floor(Math.random() * maxValue)
      .toString(16)
      .padStart(2, "0");
    return `#${r}${g}${b}`;
  };

  const generateGradient = () => {
    const colors = [];
    const count = num > 0 ? num : 12; // Fallback to 12 if invalid

    for (let i = 0; i < count; i++) {
      const color1 = getHexColorCode();
      const color2 = getHexColorCode();
      const degree = Math.floor(Math.random() * 360);
      const degreeString = `${degree}deg`;

      if (type === "linear") {
        colors.push({
          gradient: `linear-gradient(${degreeString}, ${color1}, ${color2})`,
          css: `background: linear-gradient(${degreeString}, ${color1}, ${color2});`,
        });
      } else {
        colors.push({
          gradient: `radial-gradient(circle, ${color1}, ${color2})`,
          css: `background: radial-gradient(circle, ${color1}, ${color2});`,
        });
      }
    }

    setGradients(colors);
  };

  const handleNumChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value === "") {
      setNum(12);
    } else {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue) && numValue > 0 && numValue <= 50) {
        setNum(numValue);
      }
    }
  };

  const onCopy = (css) => {
    navigator.clipboard.writeText(css);
    toast.success("Gradient code copied!", { position: "top-center" });
  };

  useEffect(() => {
    generateGradient();
  }, [num, type]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 py-12">
      <div className="w-11/12 lg:w-9/12 mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center p-6 rounded-xl bg-gray-800 shadow-lg">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">
            🎨 Gradient Generator - {type}
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <label className="text-sm">Count:</label>
              <input
                value={inputValue}
                className="border border-gray-600 bg-gray-700 text-white rounded-lg w-16 p-2"
                placeholder="12"
                onChange={handleNumChange}
                min="1"
                max="50"
                type="number"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm">Type:</label>
              <select
                value={type}
                className="border border-gray-600 bg-gray-700 text-white rounded-lg w-28 p-2"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
              </select>
            </div>
            <button
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-medium transition-colors"
              onClick={generateGradient}
            >
              Generate
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gradients.map((item, index) => (
            <div
              key={index}
              className="h-44 rounded-xl relative overflow-hidden group"
              style={{
                background: item.gradient,
              }}
            >
              <button
                onClick={() => onCopy(item.css)}
                className="bg-black/90 hover:bg-black/100 text-white rounded absolute bottom-3 right-3 text-xs py-1 px-3 transition-opacity opacity-0 group-hover:opacity-100"
              >
                COPY
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer
        toastStyle={{ backgroundColor: "#1f2937", color: "#f3f4f6" }}
      />
    </div>
  );
};

export default App;

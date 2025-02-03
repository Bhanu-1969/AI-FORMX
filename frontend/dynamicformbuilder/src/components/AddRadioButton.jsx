import React, { useState } from "react";

const AddRadioButton = ({ addField }) => {
  const [label, setLabel] = useState("");
  const [options, setOptions] = useState([""]);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (label.trim() && options.some((opt) => opt.trim())) {
      addField(label, "radio", options.filter((opt) => opt.trim()));
      setLabel("");
      setOptions([""]);
    }
  };

  return (
    <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-3">Add Multiple Choice</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Question Input */}
        <div>
          <input
            type="text"
            value={label}
            placeholder="Enter the question"
            onChange={handleLabelChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Options */}
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-3">
            <input
              type="radio"
              disabled
              className="cursor-pointer"
            />
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        {/* Add option button */}
        <button
          type="button"
          onClick={addOption}
          className="py-2 px-4 text-sm text-blue-500 hover:text-blue-600 focus:outline-none transition"
        >
          Add Option
        </button>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Add Multiple Choice
        </button>
      </form>
    </div>
  );
};

export default AddRadioButton;

import React, { useState } from "react";

const AddTextField = ({ addField }) => {
  const [text, setText] = useState("");

  const handleLabelChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.trim()) {
      addField(text, "text");
      setText(""); // Clear input field after adding
    }
  };

  return (
    <div className="mb-4 p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-3">Add Text Field</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input for Question */}
        <div>
          <input
            type="text"
            placeholder="Enter your question here"
            value={text}
            onChange={handleLabelChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Add Text Field
        </button>
      </form>
    </div>
  );
};

export default AddTextField;

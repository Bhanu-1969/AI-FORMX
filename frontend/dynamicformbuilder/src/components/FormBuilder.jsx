import React, { useState } from "react";
import AddTextField from "./AddTextField";
import AddCheckBox from "./AddCheckBox";
import AddRadioButton from "./AddRadioButton";
import NavbarDark from "./NavbarDark";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormBuilder = ({ userid }) => {
  const [formFields, setFormFields] = useState([]);
  const [fieldType, setFieldType] = useState(null);
  const [formName, setFormName] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  const addField = (label, type, options = []) => {
    const newFormFields = [...formFields, { label, type, options }];
    setFormFields(newFormFields);
    setFieldType(null);
    seterror("");
  };

  const handleDelete = (fieldIndex) => {
    const newFormFields = formFields.filter((_, index) => index !== fieldIndex);
    setFormFields(newFormFields);
  };

  const handleFormName = (event) => {
    setFormName(event.target.value);
    seterror("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formName) {
      seterror("Form name is required");
      return;
    }
    if (formFields.length === 0) {
      seterror("Add Atleast one field to your form");
      return;
    }
    if (!userid) {
      console.error("User ID is missing!");
      return;
    }
    try {
      const res = await axios.post(`https://ai-formx-backend.onrender.com/api/forms/${userid}`, {
        userid,
        formname: formName,
        formfield: formFields,
      });
      alert("Form submitted successfully!");
      setFormFields([]);
      seterror("");
      navigate("/home");

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
    <NavbarDark/>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h2 className="text-3xl font-semibold mb-4">Create Your Form</h2>

      {/* Form Name Input */}
      <div className="w-full max-w-lg mb-4">
          <input
            type="text"
            placeholder="Enter the form name"
            className="w-full px-3 py-2 border rounded-lg"
            onChange={handleFormName}
            value={formName}
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>

      {/* Buttons to Add Fields */}
      <div className="flex space-x-3 mb-4">
        <button
          onClick={() => setFieldType("text")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Add Text Field
        </button>
        <button
          onClick={() => setFieldType("radio")}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Add Multiple Choice
        </button>
        <button
          onClick={() => setFieldType("checkbox")}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
        >
          Add Checkbox
        </button>
      </div>

      {/* Conditional Rendering of Field Components */}
      {fieldType === "text" && <AddTextField addField={addField} />}
      {fieldType === "radio" && <AddRadioButton addField={addField} />}
      {fieldType === "checkbox" && <AddCheckBox addField={addField} />}
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      {/* Form Fields Display */}
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        {formFields.map((field, fieldIndex) => (
          <div key={fieldIndex} className="mb-4 p-3 border rounded-lg bg-gray-50">
            <label className="block font-semibold">{field.label}</label>
            <br />
            {field.type === "text" && <input type="text" className="border px-2 py-1 w-full mt-1" placeholder="Enter answer" />}
            {field.type === "checkbox" &&
              field.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <label>{option}</label>
                </div>
              ))}
            {field.type === "radio" &&
              field.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input type="radio" name={`radio-${fieldIndex}`} />
                  <label>{option}</label>
                </div>
              ))}
            <button
              type="button"
              onClick={() => handleDelete(fieldIndex)}
              className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}

        {/* Submit Button */}
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Submit Form
        </button>
      </form>
    </div>
    </div>
  );
};

export default FormBuilder;

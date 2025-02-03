import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavbarDark1 from "./NavbarDark1";

const UserForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleUserForm = async () => {
      try {
        const res = await axios.get(`https://ai-formx-backend.onrender.com/api/forms/fill/${id}`);
        setFormData(res.data);
        setAnswers(new Array(res.data.fields.length).fill(null));
      } catch (err) {
        console.log(err);
      }
    };
    handleUserForm();
  }, [id]);

  const handleChange = (index, value) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      if (value.trim() === "") {
        newAnswers[index] = null;
      } else if (typeof value === "boolean") {
        newAnswers[index] = value ? "selected" : null;
      } else {
        newAnswers[index] = value;
      }
      return newAnswers;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://ai-formx-backend.onrender.com/api/forms/submit/${id}`, answers);
      navigate('/thankyou');
    } catch (err) {
      console.log(err);
    }
  };

  if (!formData) {
    return <p className="text-center text-xl text-gray-500">Loading form...</p>;
  }

  return (
    <>
    <NavbarDark1/>
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">{formData.formname}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {formData.fields.map((field, fieldIndex) => {
            return (
              <div key={fieldIndex} className="space-y-3">
                <label className="block text-lg font-medium">{field.label}</label>
                <div className="space-y-2">
                  {field.type === "text" && (
                    <input
                      type="text"
                      placeholder="Enter your answer"
                      onChange={(e) => handleChange(fieldIndex, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}

                  {field.type === "checkbox" &&
                    field.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          onChange={(e) => handleChange(fieldIndex, e.target.checked ? option : "")}
                          className="cursor-pointer"
                        />
                        <label className="text-lg">{option}</label>
                      </div>
                    ))}

                  {field.type === "radio" &&
                    field.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name={`radio-${fieldIndex}`}
                          onChange={(e) => handleChange(fieldIndex, option)}
                          className="cursor-pointer"
                        />
                        <label className="text-lg">{option}</label>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UserForm;

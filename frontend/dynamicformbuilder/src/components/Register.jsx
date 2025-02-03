import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = ({ setAuth }) => {
    const [form, setform] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleChange = (event) => {
        setform({ ...form, [event.target.name]: event.target.value });
    };

    const handleSumbit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('https://ai-formx-backend.onrender.com/api/forms/register', form);
            localStorage.setItem("token", res.data.token);
            setAuth(true);
            navigate('/login');
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || "Server Error");
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
            <h1 className="text-2xl  text-center mb-6 font-bold text-fuchsia-600">AI FORMX</h1>
                <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSumbit} className="flex flex-col space-y-4">
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Enter your name" 
                        onChange={handleChange} 
                        required 
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Enter your password" 
                        onChange={handleChange} 
                        required 
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;

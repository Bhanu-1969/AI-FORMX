import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setAuth, setuserid }) => {
    const [form, setform] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const handleChange = (event) => {
        setform({ ...form, [event.target.name]: event.target.value });
    };
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const res = await axios.post("http://localhost:3000/api/forms/login", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userid", res.data.user.id);
            setuserid(res.data.user.id);
            setAuth(true);
            navigate('/home');
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
                <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Enter your name" 
                        onChange={handleChange} 
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Enter your password" 
                        onChange={handleChange} 
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate('/register')} 
                        className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 transition"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDark from "./NavbarDark";
const Home = ({ userid }) => {
    const navigate = useNavigate();
    const [disforms, setdisforms] = useState([]);

    useEffect(() => {
        const fetchform = async () => {
            try {
                const res = await axios.get(`https://ai-formx-backend.onrender.com/api/forms/${userid}`);
                setdisforms(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        if (userid) {
            fetchform();
        }
    }, [userid]);

    const createForm = () => {
        navigate('/createform');
    };

    const handleLink = (formid) => {
        navigate(`/userform/${formid}`);
    };

    const handleExcel = async (formid) => {
        try {
            const res = await axios.get(`https://ai-formx-backend.onrender.com/api/forms/download/${formid}`, {
                responseType: 'arraybuffer',
            });
            const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
            window.open(url, '_blank');
        } catch (err) {
            console.log("Error downloading the file", err);
        }
    };

    return (
        <>
        <NavbarDark/>
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h2 className="text-3xl font-semibold mb-6">Your Forms</h2>
            
            <button 
                type="button" 
                onClick={createForm} 
                className="mb-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
            >
                + Create New Form
            </button>

            {disforms.length === 0 ? (
                <p className="text-gray-500 text-lg">No forms created yet.</p>
            ) : (
                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="p-3 text-left">#</th>
                                <th className="p-3 text-left">Form Name</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {disforms.map((form, index) => (
                                <tr key={form._id} className="border-b hover:bg-gray-100">
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3">{form.formname}</td>
                                    <td className="p-3 flex justify-center space-x-4">
                                        <button 
                                            type="button" 
                                            onClick={() => handleLink(form._id)}
                                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                                        >
                                            Open
                                        </button>
                                        <button 
                                            type="button" 
                                            onClick={() => handleExcel(form._id)}
                                            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                                        >
                                            Download
                                        </button>
                                        <button 
    type="button" 
    onClick={() => navigate(`/analyze/${form._id}`)}
    className="px-4 py-2 flex items-center bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition transform hover:scale-105"
>
    🤖 Analyze With AI
</button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
        </>

    );
};

export default Home;

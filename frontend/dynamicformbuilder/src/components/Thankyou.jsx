import React from "react";
import NavbarDark1 from "./NavbarDark1";
const Thankyou = () => {
  return (
    <>
    <NavbarDark1/>
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-lg">
        <h1 className="text-3xl font-semibold text-green-600 mb-4">Thank You!</h1>
        <p className="text-lg text-gray-700 mb-6">Your submission has been received successfully.</p>
        
      </div>
    </div>
    </>
  );
};

export default Thankyou;

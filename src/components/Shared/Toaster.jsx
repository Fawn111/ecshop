import React from 'react';

const Toaster = ({ message, type }) => {
  const bgColor = type === "success" ? "bg-brandGreen" : "bg-primary";

  return (
    <div className={`fixed bottom-4 animate-bounce right-4 ${bgColor} text-white px-4 font-semibold text-xl py-2 rounded-lg shadow-md z-[9999]`}>
      {message}
    </div>
  );
};

export default Toaster;

import React from 'react';

function Button({ children, onClick, className = "", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-black text-white px-6 py-2 rounded-xl font-semibold 
                  transition-all duration-300 ease-in-out 
                  hover:bg-red-600 hover:scale-105 
                  shadow-md hover:shadow-lg ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
import React from 'react';
import { Link } from 'react-router-dom';

const OrderRecieved = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Order Received</h1>
        <p className="text-gray-600 mb-6">Thank you for your order! Your order has been successfully placed.</p>
        <Link to="/" className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-300">Return To Homepage</Link>
      </div>
    </div>
  );
};

export default OrderRecieved;

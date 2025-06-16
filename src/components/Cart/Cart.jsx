import React from 'react';
import { IoMdClose } from "react-icons/io";

const Cart = ({ isCartOpen, toggleCart }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <IoMdClose
          onClick={toggleCart}
          className="text-2xl cursor-pointer hover:text-primary"
        />
      </div>

      <div className="p-6 space-y-4">
       Cart Is Empty
      </div>
    </div>
  );
};

export default Cart;

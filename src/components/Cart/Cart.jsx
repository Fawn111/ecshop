import React, { use, useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Cart = ({ isCartOpen, toggleCart, cart , setCart, size }) => {

    const handlePlus = (id) => {
  const updatedCart = cart.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  );
  setCart(updatedCart);
};

const handleMinus = (id) => {
  const updatedCart = cart.map((item) =>
    item.id === id && item.quantity > 1
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
  setCart(updatedCart);
};


    const [price, setPrice] = useState();


    const handleRemove = (id) => {
        const arr = cart.filter((item) => item.id !== id);
        setCart(arr);
    }
    
    const handleprice = () => {
        let ans = 0;
        cart.forEach((item) => {
        ans += item.price * item.quantity;
  });
  setPrice(ans);
};


   useEffect(() => {
        handleprice();
    }, [cart]);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white shadow-lg z-50 transform transition-transform duration-300 overflow-hidden ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 bg-brandGreen">
        <h2 className="text-2xl font-bold text-white">Your Cart {size}</h2>
        <IoMdClose
          onClick={toggleCart}
          className="text-2xl cursor-pointer hover:scale-105 text-white"
        />
      </div>

   <div className="flex flex-col h-[calc(100vh-80px)]"> {/* Adjust height as needed */}
  {/* Scrollable cart items */}
  <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
    {cart?.map((item) => (
      <div key={item.id} className="border-b pb-2 flex gap-4">
        <img src={item.img} className="h-[100px] w-[160px] object-cover rounded-md" />
        <div className="ml-10">
          <p className="font-bold text-xl">" {item.title} "</p>
          <p className="text-lg text-gray-500">${item.price}</p>
          <div className="flex gap-2">
            <button className="text-xl hover:text-primary cursor-pointer" onClick={() => handlePlus(item.id)}>
              <FaPlusCircle />
            </button>
            <h2>{item.quantity}</h2>
            <button className="text-xl hover:text-primary cursor-pointer" onClick={() => handleMinus(item.id)}>
              <FaMinusCircle />
            </button>
            <button className="sm:ml-30 ml-20 text-3xl hover:text-primary cursor-pointer" onClick={() => handleRemove(item.id)}>
              <MdDelete />
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Total Section */}
  <div className="bg-white flex justify-end p-4">
    <div className='flex flex-col'>
    <div className="px-6 py-4 border-t bg-white">
  <div className="flex justify-between items-center mb-2">
    <span className="text-gray-600 text-lg font-medium">Tax (25%)</span>
    <span className="text-gray-900 text-lg font-semibold">${(0.25 * price).toFixed(2)}</span>
  </div>
  <div className="flex justify-between items-center">
    <span className="text-gray-700 text-2xl font-bold">Total:</span>
    <span className="text-brandGreen text-2xl font-bold ml-2">${(price + price * 0.25).toFixed(2)}</span>
  </div>
</div>

    </div>
  </div>
</div>

    </div>
  );
};

export default Cart;

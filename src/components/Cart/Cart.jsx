import React, { use, useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Cart = ({ isCartOpen, toggleCart, cart , setCart }) => {

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
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <IoMdClose
          onClick={toggleCart}
          className="text-2xl cursor-pointer hover:text-primary"
        />
      </div>

    <div className="p-6 space-y-4">
      {
             cart?.map((item) => (
            <>
            <div key={item.id} className="border-b pb-2 flex gap-4">
                <img src={item.img} className='h-[100px] w-[160px] object-cover rounded-md'/>
                <div className='ml-10'>
                    <p className="font-bold text-xl">" {item.title} "</p>
                    <p className="text-lg text-gray-500">${item.price}</p>
                    <div className="flex gap-2">
                        <button className='text-xl hover:text-primary cursor-pointer'  onClick={() => handlePlus(item.id)}><FaPlusCircle /></button>
                        <h2>{item.quantity}</h2>
                        <button className='text-xl hover:text-primary cursor-pointer'  onClick={() => handleMinus(item.id)}><FaMinusCircle /></button>
                         <button className='ml-30 text-3xl hover:text-primary cursor-pointer' onClick={() => handleRemove(item.id)}>
                            <MdDelete />
                        </button>
                    </div>
                </div>
            </div>
            </>
             ))
      }
    <div className='bottom-0 h-[50px] border-t flex gap-1 flex-col'>
        <h2 className='font-bold text-xl'>Tax = {0.25 * price}</h2>
        <h2 className='font-bold text-3xl'>Total = <span className='text-3xl font-normal'>{(price) + price * 0.25}</span> </h2>
    </div>
      </div>
    </div>
  );
};

export default Cart;

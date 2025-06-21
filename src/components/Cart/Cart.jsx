import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const Cart = ({ isCartOpen, toggleCart, cart, setCart, size }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

const updateCart = (updatedCart) => {
  console.log("Updating cart:", updatedCart);
  setCart(updatedCart);
  localStorage.setItem("cartItems", JSON.stringify(updatedCart));
};


  const handlePlus = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const handleMinus = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(updatedCart);
  };

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [isCartOpen]);

  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isCartOpen]);

  const [price, setPrice] = useState(0);

  const handlePrice = () => {
    let ans = 0;
    cart.forEach((item) => {
      ans += item.price * item.quantity;
    });
    setPrice(ans);
  };

  useEffect(() => {
    handlePrice();
  }, [cart]);

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-5/6 w-full sm:w-[450px] bg-white shadow-lg z-50 transform transition-transform duration-300 overflow-hidden ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-5 py-5 bg-white">
          <h2 className="text-xl font-semibold text-black font-primary tracking-wide">Shopping Cart ({size})</h2>
          <IoMdClose
            onClick={toggleCart}
            className="text-2xl cursor-pointer hover:scale-105 text-black"
          />
        </div>

        <div className='border-b border-t text-center py-2 bg-brandGreen/10 border-green-700'>
          <h2 className='text-green-700 font-sans tracking-wide'>Just ONE step away from completing your order.</h2>
        </div>

        <div className="flex flex-col h-[calc(100vh-100px)]">
          {size === 0 ? (
            <div className="flex items-center justify-center h-full">
              <h2 className="text-2xl font-semibold text-gray-500">Your cart is empty</h2>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cart?.map((item) => (
                <div key={item.id} className="border-b pb-2 px-5 flex gap-4">
                  <img src={item.img} className="h-[150px] w-[130px] object-cover rounded-md" />
                  <div className="flex flex-col w-full justify-between">
                    <div>
                      <p className="text-[16px] font-bold font-primary tracking-widest">{item.title}</p>
                      <p className="text-gray-500 text-[16px] font-medium font-primary tracking-widest">PKR {item.price.toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2 text-center items-center">
                      <div className='flex items-center gap-3 border border-black px-3 py-1 justify-center'>
                        <button className="text-xl hover:text-primary cursor-pointer" onClick={() => handleMinus(item.id)}>
                          -
                        </button>
                        <h2>{item.quantity}</h2>
                        <button className="text-xl hover:text-primary cursor-pointer" onClick={() => handlePlus(item.id)}>
                          +
                        </button>
                      </div>
                      <div>
                        <button className="text-2xl hover:text-primary cursor-pointer" onClick={() => handleRemove(item.id)}>
                          <MdDeleteOutline />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="bg-white flex justify-center p-4 border-t border-b border-gray-300">
            <input type="text" placeholder="Enter Coupon Code" className="border border-gray-300 px-3 py-2 sm:w-[250px] w-[200]" />
            <button className="bg-black text-white px-4 py-2 font-semibold cursor-pointer hover:bg-brandGreen text-[14px] transition duration-300">Apply Coupon</button>
          </div>

          <div className="p-7">
            <h2 className="text-xl font-semibold mb-4 font-sans tracking-widest">Order Summary</h2>
            <div className="flex justify-between mb-1">
              <span className="font-semibold tracking-widest font-sans text-lg">Total Items:</span>
              <span className="font-medium text-lg font-sans">{size}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-semibold text-lg tracking-widest font-sans">Total Price:</span>
              <span className="font-medium text-lg font-sans">PKR {(price + price * 0.25).toFixed(0)}</span>
            </div>
            {isLoggedIn ? (
              <Link to='/checkout' settimeout={3000} onClick={toggleCart}>
                <button className="bg-black text-white px-6 py-2 rounded-md font-semibold hover:bg-brandGreen cursor-pointer transition duration-300 w-full">
                  Proceed to Checkout
                </button>
              </Link>
            ) : (
              <Link to='/login' settimeout={500} onClick={toggleCart}>
                <button className="bg-black text-white px-6 py-2 rounded-md font-semibold cursor-pointer hover:bg-brandGreen transition duration-300 w-full">
                  Please Login to Checkout
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

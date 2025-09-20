import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const Cart = ({ isCartOpen, toggleCart, cart, setCart, size }) => {
  const [price, setPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [deals, setDeals] = useState([]);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    fetch("http://localhost:3000/api/deals")
      .then((res) => res.json())
      .then((data) => {
        setDeals(data);
      });
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const handlePlus = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const handleMinus = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(updatedCart);
  };

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    updateCart(updatedCart);
  };

  const calculatePrice = () => {
    let total = 0;
    let discount = 0;

    cart.forEach((item) => {
      let itemPrice = item.price;
      let discountAmount = 0;

      const matchingDeal = deals.find((deal) => {
        return (
          deal.product?._id === item._id ||
          deal.category === item.category ||
          deal.brand === item.brand
        );
      });

      if (matchingDeal) {
        if (matchingDeal.type === "percentage") {
          discountAmount = (itemPrice * matchingDeal.discountValue) / 100;
        } else if (matchingDeal.type === "fixed") {
          discountAmount = matchingDeal.discountValue;
        }

        discountAmount = Math.min(discountAmount, itemPrice);
        itemPrice -= discountAmount;
        discount += discountAmount * item.quantity;
      }

      total += itemPrice * item.quantity;
    });

    setPrice(total);
    setTotalDiscount(discount);
  };

  useEffect(() => {
    calculatePrice();
  }, [cart, deals]);

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

return (
  <div className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-hidden ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
    <div className="flex items-center justify-between px-5 py-4 bg-black text-white shadow-md">
      <h2 className="text-xl font-bold font-sans tracking-wide">🛒 Shopping Cart ({size})</h2>
      <IoMdClose onClick={toggleCart} className="text-2xl cursor-pointer hover:scale-110 transition" />
    </div>

    <div className='border-b border-t text-center py-2 bg-brandGreen/10 border-green-700'>
      <h2 className='text-green-700 font-semibold tracking-wide'>🎉 Just ONE step away from your order!</h2>
    </div>

    <div className="flex flex-col h-[calc(100vh-100px)]">
      {size === 0 ? (
        <div className="flex items-center justify-center h-full">
          <h2 className="text-2xl font-semibold text-gray-500">🛍️ Your cart is empty</h2>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto py-4 space-y-4 px-3">
          {cart?.map((item) => {
            const matchingDeal = deals.find((deal) =>
              deal.product?._id === item._id ||
              deal.category === item.category ||
              deal.brand === item.brand
            );

            let discountAmount = 0;

            if (matchingDeal) {
              if (matchingDeal.type === "percentage") {
                discountAmount = (item.price * matchingDeal.discountValue) / 100;
              } else if (matchingDeal.type === "fixed") {
                discountAmount = matchingDeal.discountValue;
              }

              discountAmount = Math.min(discountAmount, item.price);
            }

            const discountedPrice = item.price - discountAmount;

            return (
              <div key={item._id} className="border rounded-lg shadow-sm p-4 flex gap-4 bg-white hover:shadow-md transition">
                <img src={item.img} className="h-[120px] w-[100px] object-cover rounded-lg" />
                <div className="flex flex-col w-full justify-between">
                  <div>
                    <p className="text-lg font-bold font-primary tracking-wide">{item.name}</p>
                    {matchingDeal ? (
                      <div className="space-y-1 mt-1">
                        <p className="text-sm font-medium text-red-500">💸 Discount Applied</p>
                        <p className="line-through text-gray-400 text-sm">PKR {item.price.toLocaleString()}</p>
                        <p className="text-green-600 font-bold text-md">PKR {discountedPrice.toLocaleString()}</p>
                      </div>
                    ) : (
                      <p className="text-gray-800 text-md font-medium mt-1">PKR {item.price.toLocaleString()}</p>
                    )}
                  </div>

                  <div className="flex gap-2 items-center mt-3">
                    <div className='flex items-center gap-3 border border-gray-300 rounded-lg px-3 py-1'>
                      <button className="text-xl text-gray-700 hover:text-green-600" onClick={() => handleMinus(item._id)}>-</button>
                      <h2 className="font-medium">{item.quantity}</h2>
                      <button className="text-xl text-gray-700 hover:text-green-600" onClick={() => handlePlus(item._id)}>+</button>
                    </div>
                    <button className="text-2xl text-red-600 hover:text-red-800" onClick={() => handleRemove(item._id)}>
                      <MdDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="p-7 border-t bg-white">
        <h2 className="text-xl font-bold mb-4 font-sans tracking-widest text-black">📦 Order Summary</h2>

        <div className="flex justify-between mb-2 text-md font-medium text-gray-700">
          <span>Total Items:</span>
          <span>{size}</span>
        </div>

        <div className="flex justify-between mb-2 text-md font-medium text-green-700">
          <span>Total Discount:</span>
          <span>-PKR {totalDiscount.toLocaleString()}</span>
        </div>

        <div className="flex justify-between mb-2 text-md font-medium text-gray-700">
          <span>Subtotal:</span>
          <span>PKR {price.toLocaleString()}</span>
        </div>


        <div className="flex justify-between mb-4 text-lg font-bold text-black border-t pt-2">
          <span>Total:</span>
          <span>PKR {(price).toFixed(0)}</span>
        </div>

        {isLoggedIn ? (
          <Link to='/checkout' onClick={toggleCart}>
            <button className="bg-black hover:bg-brandGreen text-white px-6 py-3 rounded-lg font-semibold tracking-wide w-full transition duration-300">
              Proceed to Checkout
            </button>
          </Link>
        ) : (
          <Link to='/login' onClick={toggleCart}>
            <button className="bg-black hover:bg-brandGreen text-white px-6 py-3 rounded-lg font-semibold tracking-wide w-full transition duration-300">
              🔒 Please Login to Checkout
            </button>
          </Link>
        )}
      </div>
    </div>
  </div>
);
}

export default Cart;

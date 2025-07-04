import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navigate } from "react-router-dom";

const CheckoutPage = ({ setCart1 }) => {
  const [cart, setCart] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCart(savedCart);
  }, []);

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    const newOrder = {
      cart,
      shippingInfo,
      subtotal,
      tax,
      total,
      timestamp: new Date().toISOString(),
    };

    const previousOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = [newOrder, ...previousOrders];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    localStorage.removeItem("cartItems");
    setCart([]);
    window.location.href = "/order-received";
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 py-16 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8 grid grid-cols-1 lg:grid-cols-2 gap-10 mt-30"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
          <input
            name="name"
            value={shippingInfo.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
          <input
            name="address"
            value={shippingInfo.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
          <input
            name="phone"
            value={shippingInfo.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-3 border border-gray-300 rounded mb-4"
          />
        </motion.div>

        <motion.div
          className="bg-gray-50 rounded-lg p-6 shadow-inner"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={item._id}
                  className="flex items-center justify-between border-b pb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex gap-3 items-center">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-16 w-16 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="font-semibold">
                    PKR {item.price * item.quantity}
                  </div>
                </motion.div>
              ))}

              <div className="pt-4 border-t text-gray-700 space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>
                    PKR {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (15%):</span>
                  <span>
                    PKR{" "}
                    {Math.round(
                      cart.reduce((sum, item) => sum + item.price * item.quantity, 0) *
                        0.15
                    )}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>
                    PKR{" "}
                    {Math.round(
                      cart.reduce((sum, item) => sum + item.price * item.quantity, 0) *
                        1.15
                    )}
                  </span>
                </div>
              </div>

              <motion.button
                onClick={handlePlaceOrder}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Place Order
              </motion.button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CheckoutPage;

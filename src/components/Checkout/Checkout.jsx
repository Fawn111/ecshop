import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdDeleteOutline } from "react-icons/md";

const CheckoutPage = ({ setCart1 }) => {
  const [cart, setCart] = useState([]);
  const [coupons, setCoupon] = useState([]);
  const [error, setError] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [enteredCode, setEnteredCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [tax, setTax] = useState(0); // default to 0

  const fetchTax = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/tax/");
      if (!res.ok) throw new Error("No tax found");
      const data = await res.json();
      setTax(data.taxValue);
    } catch (err) {
      setTax(0);
    }
  };

  const fetchCoupons = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/coupon/");
      if (!res.ok) throw new Error("Failed to fetch Coupons");
      const data = await res.json();
      setCoupon(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCoupons();
    fetchTax();
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCart(savedCart);
  }, []);

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const isCouponValid = (coupon) => {
    const now = new Date();
    return new Date(coupon.expiryDate) > now;
  };

  const handleCouponApply = () => {
    const found = coupons.find(
      (c) => c.code.toLowerCase() === enteredCode.trim().toLowerCase()
    );
    if (found && isCouponValid(found)) {
      setAppliedCoupon(found);
      setEnteredCode(found.code);
      alert(`Coupon "${found.code}" applied!`);
    } else if (found) {
      alert("Coupon expired");
      setAppliedCoupon(null);
    } else {
      alert("Invalid coupon code");
      setAppliedCoupon(null);
    }
  };

  const calculateDiscountAmount = (subtotal) => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discountType === "percentage") {
      return (subtotal * appliedCoupon.value) / 100;
    } else if (appliedCoupon.discountType === "value") {
      return appliedCoupon.value;
    }
    return 0;
  };

  const handlePlaceOrder = () => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const discount = calculateDiscountAmount(subtotal);
    const calculatedTax = subtotal * (tax / 100);
    const total = subtotal + calculatedTax - discount;

    const newOrder = {
      cart,
      shippingInfo,
      subtotal,
      tax: calculatedTax,
      discount,
      total,
      appliedCoupon,
      timestamp: new Date().toISOString(),
    };

    const previousOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = [newOrder, ...previousOrders];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    localStorage.removeItem("cartItems");
    setCart([]);
    window.location.href = "/order-received";
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxi = subtotal * (tax / 100);
  const discount = calculateDiscountAmount(subtotal);
  const total = subtotal + taxi - discount;

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
        {/* Left: Shipping Info */}
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

        {/* Right: Order Summary */}
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
              <div className="bg-white flex justify-center p-4 border-t border-b border-gray-300 mb-4 gap-3">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value)}
                  className="border border-gray-300 px-3 py-2 sm:w-[250px] w-[200px] rounded"
                />
                <button
                  onClick={handleCouponApply}
                  className="bg-black text-white px-4 py-2 font-semibold cursor-pointer hover:bg-brandGreen text-[14px] transition duration-300 rounded"
                >
                  Apply Coupon
                </button>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-green-600 font-semibold mb-2">
                  <span>
                    Discount ({appliedCoupon.code}):{" "}
                    {appliedCoupon.discountType === "percentage"
                      ? `${appliedCoupon.value}%`
                      : `PKR ${appliedCoupon.value}`}
                  </span>
                  <span>- PKR {discount.toFixed(2)}</span>
                </div>
              )}

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
                  <div className="font-semibold">PKR {item.price * item.quantity}</div>
                </motion.div>
              ))}

              <div className="pt-4 border-t text-gray-700 space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>PKR {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax ({tax}%):</span>
                  <span>PKR {taxi.toFixed(2)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex flex-col gap-2 text-green-600 font-semibold mb-2">
                    <div className="flex justify-between items-center">
                      <span className="flex text-center items-center">
                        <MdDeleteOutline
                          onClick={() => {
                            setAppliedCoupon(null);
                            setEnteredCode("");
                            alert("Coupon removed");
                          }}
                          className="text-lg text-red-500 hover:rotate-12 cursor-pointer hover:scale-110"
                        />
                        Discount ({appliedCoupon.code}):{" "}
                        {appliedCoupon.discountType === "percentage"
                          ? `${appliedCoupon.value}%`
                          : `PKR ${appliedCoupon.value}`}
                      </span>
                      <span>- PKR {discount.toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>PKR {total.toFixed(2)}</span>
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

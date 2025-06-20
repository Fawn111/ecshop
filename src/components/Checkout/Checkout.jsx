import React, { useEffect, useState } from "react";

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });

useEffect(() => {
  const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
  console.log("Cart on checkout load:", savedCart); // 👀 Check this
  setCart(savedCart);
}, []);


  
  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 max-w-xl mx-auto mt-32">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="mb-4">
        <input
          name="name"
          value={shippingInfo.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          name="address"
          value={shippingInfo.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          name="phone"
          value={shippingInfo.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="bg-gray-100 p-4 rounded mb-4">
        <h3 className="font-semibold mb-2">Order Summary</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3 mb-1">
                <img src={item.img} alt="" className="h-[100px] w-[120px]"/>
                <span>{item.title} x {item.quantity}</span>
                <span className="font-semibold">PKR {item.price * item.quantity}</span>
              </div>
            ))}
            <div className="font-bold mt-2">
              Total: PKR {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
            </div>
          </>
        )}
      </div>

      <button className="bg-red-500 text-white px-4 py-2 rounded">
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;

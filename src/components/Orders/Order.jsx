import React, { useEffect, useState } from "react";
import Button from "../Shared/Button";
import Toaster from "../Shared/Toaster";    

const OrderPanel = () => {
  const [orders, setOrders] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [warning, setWarning] = useState(false);

const ADMIN_PASSWORD = "admin123";

  useEffect(() => {
    if (authenticated) {
      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(savedOrders);
    }
  }, [authenticated]);

  const handleLogin = () => {
    if (inputPassword === ADMIN_PASSWORD) {
      setAuthenticated(true);
        setInputPassword("");
    } else {

      setWarning(true);
      setTimeout(() => setWarning(false), 2000);}
  };

  if (!authenticated) {
    return (
        <>
             {warning && (<Toaster message="Incorrect Password!" type="error" />)}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
          <h2 className="text-xl font-bold mb-4">Admin Login</h2>
          <input type="password" placeholder="Enter admin password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} className="w-full p-2 border rounded mb-4"/>
          <button onClick={handleLogin} setTimeout={2000} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
            Access Order Panel
          </button>
        </div>
      </div>
        </>
    
    );
  }

  return (
    <>
     {warning && (<Toaster message="Incorrect Password!" type="error" />)}
    <div className="min-h-screen bg-gray-100 p-6">
        <div className=" ml-4 flex justify-center-safe">
          <button className="mt-22 w-23 bg-red-500 text-white cursor-pointer py-2 rounded hover:bg-red-600 transition" onClick={() => setAuthenticated(false)}>Log Out</button>
        </div>
      <h2 className="text-2xl font-bold mb-4 text-center mt-2">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No previous orders found.</p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {orders.map((order, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
              <div className="mb-2 text-sm text-gray-500">
                <strong>Placed On:</strong>{" "}
                {new Date(order.timestamp).toLocaleString()}
              </div>

              <div className="mb-2">
                <strong>Shipping Info:</strong>
                <div>{order.shippingInfo.name}</div>
                <div>{order.shippingInfo.address}</div>
                <div>{order.shippingInfo.phone}</div>
              </div>

              <div className="mb-2">
                <strong>Items:</strong>
                {order.cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm py-1">
                    <span>
                      {item.title} x {item.quantity}
                    </span>
                    <span>PKR {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>PKR {order.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>PKR {order.tax}</span>
                </div>
                <div className="flex justify-between font-bold text-base">
                  <span>Total:</span>
                  <span>PKR {order.total}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
    
  );
};

export default OrderPanel;

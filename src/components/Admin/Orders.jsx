import React, { useEffect, useState } from "react";
import Button from "../Shared/Button";
import Toaster from "../Shared/Toaster";    

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
      const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(savedOrders);
  }, []);

  return (
    <>
    <div className="min-h-screen bg-gray-100 p-6">
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

export default Orders;

// import React from "react";

// const Orders = () => {
//   const orders = [
//     { id: "ORD123", customer: "Ali Raza", date: "21 Jun 2025", status: "Pending", total: "$120.00" },
//     { id: "ORD124", customer: "Sara Khan", date: "20 Jun 2025", status: "Delivered", total: "$89.99" },
//     { id: "ORD125", customer: "John Doe", date: "19 Jun 2025", status: "Cancelled", total: "$45.00" },
//   ];

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-semibold">Orders</h2>
//       </div>

//       <input
//         type="text"
//         placeholder="Search orders..."
//         className="mb-4 p-2 border rounded w-full md:w-1/3"
//       />

//       <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2">Order ID</th>
//               <th className="px-4 py-2">Customer</th>
//               <th className="px-4 py-2">Date</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Total</th>
//               <th className="px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order, i) => (
//               <tr key={i} className="border-t hover:bg-gray-50">
//                 <td className="px-4 py-2">{order.id}</td>
//                 <td className="px-4 py-2">{order.customer}</td>
//                 <td className="px-4 py-2">{order.date}</td>
//                 <td className="px-4 py-2">{order.status}</td>
//                 <td className="px-4 py-2">{order.total}</td>
//                 <td className="px-4 py-2 space-x-2">
//                   <button className="text-blue-600 hover:underline">View</button>
//                   <button className="text-red-600 hover:underline">Cancel</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Orders;


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

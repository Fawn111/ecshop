import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  // Delete order by index
  const handleDelete = (indexToDelete) => {
    const updatedOrders = orders.filter((_, idx) => idx !== indexToDelete);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  // Safe helper to format date or fallback string
  const formatDate = (timestamp) => {
    if (!timestamp) return "No timestamp";
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleString();
  };

  // Safe helper for dateTime attribute
  const formatDateTimeAttr = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? "" : date.toISOString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900 tracking-tight">
        Your Orders
      </h2>
      <input
        type="text"
        placeholder="Search Orders.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brandGreen"
      />

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-12">
          No previous orders found.
        </p>
      ) : (
        <div className="space-y-8 max-w-4xl mx-auto">
          {orders
            .filter((order) => {
              if (!order?.shippingInfo?.name) return false;
              return search.trim() === ""
                ? true
                : order.shippingInfo.name
                    .toLowerCase()
                    .includes(search.toLowerCase());
            })
            .map((order, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300 relative"
              >
                <div className="mb-3 text-sm text-gray-500 uppercase tracking-wide font-semibold">
                  Placed On:{" "}
                  <time dateTime={formatDateTimeAttr(order.timestamp)}>
                    {formatDate(order.timestamp)}
                  </time>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold text-gray-700 mb-1">
                    Shipping Info
                  </h3>
                  <p className="text-gray-600">
                    {order.shippingInfo?.name || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    {order.shippingInfo?.address || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    {order.shippingInfo?.phone || "N/A"}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">Items</h3>
                  <div className="divide-y divide-gray-200">
                    {Array.isArray(order.cart) && order.cart.length > 0 ? (
                      order.cart.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between text-gray-700 py-2 text-sm"
                        >
                          <span>
                            {item.title || "Untitled"}{" "}
                            <span className="text-gray-500">
                              x {item.quantity || 1}
                            </span>
                          </span>
                          <span className="font-medium">
                            PKR{" "}
                            {(
                              (item.price || 0) * (item.quantity || 1)
                            ).toLocaleString()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No items found</p>
                    )}
                  </div>
                </div>

                <div className="border-t pt-4 text-gray-800 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>
                      PKR{" "}
                      {(order.subtotal ?? 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>
                      PKR{" "}
                      {(order.tax ?? 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-indigo-700">
                    <span>Total:</span>
                    <span>
                      PKR{" "}
                      {(order.total ?? 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(index)}
                  className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

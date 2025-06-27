import React from "react";
import { useState, useEffect } from "react";

const Dashboard = () => {

      const [orders, setOrders] = useState([]);
      const [products, setProducts] = useState([]);   
      const [users, setUsers] = useState([])
    
     useEffect(() => {
          const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
          setOrders(savedOrders);
      }, []);

      useEffect(() => {
        const totaluser = JSON.parse(localStorage.getItem("user")) || [];
        setUsers(totaluser)
      })

        useEffect(() => {
          fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((data) => {
              setProducts(data);
            })
            .catch((error) => {
              console.error("Error fetching products:", error);
            });
        }, []);


  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-3xl font-bold font-secondary text-black">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-medium text-gray-600">Total Orders</h2>
          <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-medium text-gray-600">Total Products</h2>
          <p className="text-2xl font-bold text-gray-800">{products.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-medium text-gray-600">Registered Users</h2>
          <p className="text-2xl font-bold text-gray-800">{users.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
        <ul className="text-gray-600 space-y-2">
          <li>✅ New order placed by Sarah</li>
          <li>🛒 Product "iPhone 14" added</li>
          <li>👥 User "moiz123" signed up</li>
          <li>🚚 Order #1123 marked as shipped</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

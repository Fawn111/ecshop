import React, { useState } from "react";


const AddProductModal = ({ onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product added:");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-50">
  <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative animate-fade-in">
    <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Product</h3>
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"/>
      <input
        type="number"
        placeholder="Price"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"/>
      <input
        type="text"
        placeholder="Category"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"/>
      <input
        type="text"
        placeholder="Brand"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"/>
      <input
        type="text"
        placeholder="Stock"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"/>

      <div className="flex justify-end gap-4 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition cursor-pointer">
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition cursor-pointer">
          Save
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

const Products = () => {
  const [showModal, setShowModal] = useState(false);

  const products = [
    { id: 1, name: "Test Product 1", price: 24928, stock: 8, category: "GYM", brand: "Gucci" },
    { id: 2, name: "Test Product 2", price: 4857, stock: 4, category: "Cotton", brand: "Gucci" },
    { id: 3, name: "Test Product 3", price: 475, stock: 4, category: "Gucci", brand: "Gucci" },
    { id: 4, name: "Test Product 4", price: 475, stock: 4, category: "Gucci", brand: "Gucci" },
    { id: 5, name: "Test Product 5", price: 475, stock: 4, category: "Gucci", brand: "Gucci" },
    { id: 6, name: "Test Product 6", price: 475, stock: 4, category: "Gucci", brand: "Gucci" },
    { id: 7, name: "Test Product 7", price: 475, stock: 4, category: "Gucci", brand: "Gucci" },
    { id: 8, name: "Test Product 8", price: 475, stock: 4, category: "Gucci", brand: "Gucci" },

  ];

  return (
     <div className="relative p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Products</h2>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-brandGreen cursor-pointer transition-all duration-200">
  <span className="text-lg">+</span>
  <span className="font-semibold">Add Product</span>
</button>

      </div>

      <input
        type="text"
        placeholder="Search products..."
        className="mb-6 p-3 border border-gray-300 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-brandGreen"
      />

    <div className="overflow-x-auto bg-white shadow-xl rounded-xl p-4">
  <table className="min-w-full text-sm text-left border-separate border-spacing-y-3">
    <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
      <tr>
        <th className="px-6 py-3 rounded-tl-lg">Product</th>
        <th className="px-6 py-3">Price</th>
        <th className="px-6 py-3">Stock</th>
        <th className="px-6 py-3">Category</th>
        <th className="px-6 py-3">Brand</th>
        <th className="px-6 py-3 rounded-tr-lg">Actions</th>
      </tr>
    </thead>
    <tbody>
      {products.map((p) => (
        <tr
          key={p.id}
          className="bg-white hover:bg-indigo-50 transition-transform duration-300 shadow-md rounded-lg hover:shadow-lg transform hover:scale-[1.02]"
        >
          <td className="px-6 py-4 font-semibold rounded-l-lg">{p.name}</td>
          <td className="px-6 py-4 text-indigo-700 font-medium">{`$${p.price.toLocaleString()}`}</td>
          <td className="px-6 py-4">{p.stock}</td>
          <td className="px-6 py-4">{p.category}</td>
          <td className="px-6 py-4">{p.brand}</td>
          <td className="px-6 py-4 flex gap-3 rounded-r-lg">
            <button className="bg-blue-600 text-white px-4 py-1 rounded-lg shadow-sm hover:bg-blue-700 transition duration-300 font-semibold">
              Edit
            </button>
            <button className="bg-red-600 text-white px-4 py-1 rounded-lg shadow-sm hover:bg-red-700 transition duration-300 font-semibold">
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>



      {showModal && <AddProductModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Products;

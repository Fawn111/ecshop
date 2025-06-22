import React from "react";

const Products = () => {
  const products = [
    { name: "T-Shirt", price: "$25.00", stock: 30, category: "Clothing", featured: true },
    { name: "Smartphone", price: "$499.99", stock: 12, category: "Electronics", featured: false },
    { name: "Shoes", price: "$60.00", stock: 20, category: "Footwear", featured: true },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Products</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">+ Add Product</button>
      </div>

      <input
        type="text"
        placeholder="Search products..."
        className="mb-4 p-2 border rounded w-full md:w-1/3"
      />

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Featured</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.price}</td>
                <td className="px-4 py-2">{p.stock}</td>
                <td className="px-4 py-2">{p.category}</td>
                <td className="px-4 py-2 text-center">{p.featured ? "✔️" : "❌"}</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="text-blue-600 hover:underline">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;

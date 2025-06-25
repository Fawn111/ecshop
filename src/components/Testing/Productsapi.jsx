import React, { useEffect, useState } from 'react';

const Productsapi = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading products...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6 mt-28">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-xl shadow p-4 flex flex-col">
          <img src={product.image} alt={product.title} className="h-40 object-contain mb-4" />
          <h2 className="font-semibold text-sm">{product.title}</h2>
          <p className="text-gray-700 mt-2">${product.price}</p>
          <button className="mt-auto bg-black text-white px-4 py-2 rounded-md">Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Productsapi;

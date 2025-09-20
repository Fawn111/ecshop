import React, { useEffect, useState } from 'react';
import ProductCard from '../Products/ProductCard';
import ProductModal from '../Products/ProductModal';
import Heading from '../Shared/Heading';

const Productsapi = ({ handlecart, handlewish, wish, cart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:3000/api/products/');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading products...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">Error: {error}</p>;

  return (
    <div className="mt-28 max-w-8xl mx-auto px-4">
      <Heading title="All Products" />
      <ProductCard
        data={products}
        handlecart={handlecart}
        handlewish={handlewish}
        wish={wish}
        cart={cart}
        onOpenModal={openModal}
      />

      {/* Show modal when a product is selected */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={closeModal}
          handlecart={handlecart}
          handlewish={handlewish}
          wish={wish}
          cart={cart}
        />
      )}
    </div>
  );
};

export default Productsapi;

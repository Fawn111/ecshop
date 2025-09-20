import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../Products/ProductCard'; // Import your reusable ProductCard
import ProductModal from '../Products/ProductModal'; // Import modal if needed

const BrandProductPage = ({ handlecart, handlewish, wish, cart }) => {
  const { id } = useParams(); // id is the brand name
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  useEffect(() => {
    const fetchBrandProducts = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/products/brand/${id}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching brand products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBrandProducts();
  }, [id]);

  if (loading) return <p className="text-center mt-40 mb-20">Loading Products...</p>;

  return (
    <div className="mt-40 max-w-7xl mx-auto px-4 mb-20">
      <h2 className="text-3xl font-bold mb-6">Products from "{id}"</h2>

      {products.length === 0 ? (
        <p>No products found for this brand.</p>
      ) : (
        <ProductCard
          data={products}
          handlecart={handlecart}
          handlewish={handlewish}
          wish={wish}
          cart={cart}
          onOpenModal={openModal}
        />
      )}

      {/* Show modal when product is selected */}
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

export default BrandProductPage;

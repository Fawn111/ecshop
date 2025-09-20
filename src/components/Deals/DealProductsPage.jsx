import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../Products/ProductCard';
import ProductModal from '../Products/ProductModal';

const DealProductsPage = ({ handlecart, handlewish, wish, cart }) => {
  const { id } = useParams();
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  console.log("Products in state:", products);

  const openModal = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/deals/${id}`);
        const data = await res.json();
        setDeal(data);

      if(data.type === 'product'){
        setProducts(data.products || []);
      }
      else if(data.type === 'category' && data.category){
        const catRes = await fetch(`http://localhost:3000/api/products/category/${data.category.category}`);
        const catData = await catRes.json();
        setProducts(catData || []); }
      else if(data.type === 'brand' && data.brand){
        const brandRes = await fetch(`http://localhost:3000/api/products/brand/${data.brand.brand}`);
        const brandData = await brandRes.json();
        setProducts(brandData || []); }
      } catch (err) {
        console.error('Failed to fetch deal:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeal();
  }, [id]);

  if (loading) return <p className="text-center mt-40">Loading deal...</p>;
  if (!deal) return <p className="text-center mt-40">Deal not found.</p>;

  return (
    <div className="mt-40 max-w-7xl mx-auto px-4 mb-20">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
        {deal.name}
      </h2>
      <p className="text-center mb-6 text-gray-600">{deal.description}</p>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available for this deal.</p>
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

export default DealProductsPage;

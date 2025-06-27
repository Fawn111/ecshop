import React, { useEffect, useState } from 'react';
import ProductCard from '../Products/ProductCard';
import Heading from '../Shared/Heading';

const Productsapi = ({ handlecart, handlewish, wish , cart}) => {
 const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:3000/api/products/all');
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

  if (loading) return <p className="text-center">Loading products...</p>;

  return (
    <div className="mt-28">
      <Heading title="All Products" />
      <ProductCard data={products} handlecart={handlecart} handlewish={handlewish}wish={wish} cart={cart}/>
    </div>
    
  );
};

export default Productsapi;

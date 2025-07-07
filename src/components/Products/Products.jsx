import React from 'react'
import Heading from '../Shared/Heading'
import ProductCard from './ProductCard'
import { useEffect, useState } from 'react'
import { data } from 'react-router-dom'


const Products = ({ handlecart, handlewish, wish , cart}) => {
 const [products, setProducts] = useState([]);
 const [products2, setProducts2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const fetchNewArrivals = async () => {
  setLoading(true);
  setError(null);
  try {
    const res = await fetch('http://localhost:3000/api/products/newarrivals');
    if (!res.ok) throw new Error('Failed to fetch new arrivals');
    const data = await res.json();
    setProducts(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
    fetchNewArrivals();
  }, []); 

  const fetchHotProducts = async () => {
  setLoading(true);
  setError(null);
  try {
    const res = await fetch('http://localhost:3000/api/products/hotselling');
    if (!res.ok) throw new Error('Failed to fetch new arrivals');
    const data = await res.json();
    setProducts2(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
    fetchHotProducts();
  }, []); 

  return (
    <div className=''>
        <div className='p-3 sm:p-6 m-4 overflow-x-hidde'>
            <Heading title="NEW ARRIVALS"/>
            <ProductCard data={products} handlecart={handlecart} handlewish={handlewish} wish={wish} cart={cart}/>
        </div>
         <div className='p-4 sm:p-6 m-4 overflow-x-hidde border-t-2 border-gray-100'>
            <Heading title="top selling"/>
            <ProductCard data={products2} handlecart={handlecart} handlewish={handlewish}wish={wish} cart={cart}/>
        </div> 
    </div>
  )
}

export default Products;

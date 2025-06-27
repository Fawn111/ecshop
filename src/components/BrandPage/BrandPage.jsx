import React from "react";
import { Link } from "react-router-dom";
import Heading from "../Shared/Heading";
import { useState, useEffect } from "react";

const BrandPage = () => {

    const [brands, setBrand] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
  
    const fetchBrands = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:3000/brands/all');
        if(!res.ok) throw new Error('Failed To Fetch Brands');
        const data = await res.json();
        setBrand(data)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  
    useEffect(() => {
        fetchBrands();
      }, []);
  
  if (loading) return <p className="mt-40 text-center w-full mb-20">Loading Brands...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <div className="mt-40 mb-26 max-w-3xl mx-auto px-4">
      <Heading title="Brands"/>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {brands.map((brand) => (
          <li key={brand} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <Link
              to={`/brands/${brand.brand}`}
              className="block p-6 text-center text-lg font-semibold text-gray-800"
            >
              <img src={brand.img} alt="" />
              {brand.brand}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandPage;

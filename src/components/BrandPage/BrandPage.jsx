import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Heading from "../Shared/Heading";

const BrandPage = () => {
  const [brands, setBrands] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBrands = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/api/brands/");
      if (!res.ok) throw new Error("Failed To Fetch Brands");
      const data = await res.json();

      // Create a Map keyed by brand name to remove duplicates
      const uniqueBrandsMap = new Map(data.map(item => [item.brand, item]));
      setBrands(uniqueBrandsMap);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  if (loading) return <p className="mt-40 text-center w-full mb-20">Loading Brands...</p>;
  if (error) return <p className="text-red-500 text-center mt-40">{error}</p>;

  return (
    <div className="mt-40 mb-24 max-w-7xl mx-auto px-6">
      <Heading title="Explore Top Brands" />
      <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
        {Array.from(brands.values()).map((brand) => (
          <li key={brand._id}>
            <Link
              to={`/brands/${brand.brand}`}
              className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:scale-[1.03]"
            >
              <div className="w-full h-48 flex items-center justify-center bg-white overflow-hidden">
                <img
                  src={brand.img}
                  alt={brand.brand}
                  className="h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="p-4 text-center">
                <p className="text-base font-semibold text-gray-800 capitalize">
                  {brand.brand}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandPage;

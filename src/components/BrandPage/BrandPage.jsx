import React from "react";
import { Link } from "react-router-dom";
import Heading from "../Shared/Heading";

const brands = [
  "Gucci",
  "Versace",
  "Zara",
  "Calvin Klein",
  "Prada",
];

const BrandPage = () => {
  return (
    <div className="mt-40 mb-26 max-w-3xl mx-auto px-4">
      <Heading title="Brands"/>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {brands.map((brand) => (
          <li key={brand} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <Link
              to={`/brands/}`}
              className="block p-6 text-center text-lg font-semibold text-gray-800"
            >
              {brand}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandPage;

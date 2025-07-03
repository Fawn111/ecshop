import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function DealsPage({ handlecart }) {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/deals')
      .then(res => res.json())
      .then(data => setDeals(data))
      .catch(err => console.error('Failed to fetch deals:', err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-40 mb-20 px-4">
      <h2 className="text-3xl font-bold mb-6">Special Deals</h2>
      {deals.length === 0 ? (
        <p>No deals available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <div key={deal._id} className="bg-white shadow rounded-lg p-4 w-fit">
              <img
                src={deal.product?.img || '/placeholder.jpg'}
                alt={deal.product?.name || deal.category || deal.brand}
                className="h-[328px] w-[295px] object-cover rounded-md"
              />

              <h3 className="text-xl font-semibold mt-2">
                {deal.name || deal.product?.name}
              </h3>

              <p className="text-gray-500">{deal.description}</p>

              <p className="mt-2 text-green-600 font-bold">
                {deal.type === 'percentage'
                  ? `${deal.discountValue}% OFF`
                  : `$${deal.discountValue} OFF`}
              </p>

              {/* Deal info */}
              {deal.product && (
                <p className="text-gray-800">Product: {deal.product.name}</p>
              )}
              {deal.category && (
                <p className="text-gray-500 text-sm">Category: {deal.category}</p>
              )}
              {deal.brand && (
                <p className="text-gray-500 text-sm">Brand: {deal.brand}</p>
              )}

              {/* Action Buttons */}
              <div className="mt-4">
                {deal.product ? (
                  <button
                    onClick={() => handlecart(deal.product)}
                    className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
                  >
                    Add to Cart
                  </button>
                ) : deal.category ? (
                  <Link to={`/category/${deal.category}`}>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800">
                      View Category
                    </button>
                  </Link>
                ) : deal.brand ? (
                  <Link to={`/brands/${deal.brand}`}>
                    <button className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-800">
                      View Brand
                    </button>
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DealsPage;

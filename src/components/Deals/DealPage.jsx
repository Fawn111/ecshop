import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function DealsPage() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/deals/')
      .then(res => res.json())
      .then(data => setDeals(data))
      .catch(err => console.error('Failed to fetch deals:', err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-40 mb-20">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        🔥 Trending Deals
      </h2>

      {deals.length === 0 ? (
        <p className="text-center text-gray-500">No deals available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {deals.map((deal) => {
            const title = deal.name;
            const imageUrl =
              deal.img || deal.brand?.img || deal.category?.img || "/placeholder.jpg";

            return (
              <Link
                to={`/deal-products/${deal._id}`}
                key={deal._id}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-100"
              >
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-100"
                />

                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="text-sm">
                    {deal.discountType === 'percentage'
                      ? `${deal.discountValue}% OFF`
                      : `$${deal.discountValue} OFF`}
                  </p>
                </div>

                <div className="absolute top-2 left-2 bg-red-600 text-white text-[14px] font-bold px-2 py-1 rounded-full shadow">
                  Sale On {deal.type}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DealsPage;

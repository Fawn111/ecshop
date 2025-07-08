import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';

function DealsPage({ handlecart }) {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/deals/')
      .then(res => res.json())
      .then(data => {
        console.log("Deals fetched:", data);
        setDeals(data);
      })
      .catch(err => console.error('Failed to fetch deals:', err));
  }, []);

  const renderStars = (rating = 4) => {
    const fullStars = Math.floor(rating);
    const totalStars = 5;

    return (
      <div className="flex items-center space-x-1 mt-1">
        {Array.from({ length: totalStars }, (_, i) =>
          i < fullStars ? (
            <AiFillStar key={i} className="text-yellow-500" />
          ) : (
            <AiOutlineStar key={i} className="text-yellow-400" />
          )
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto mt-40 mb-20 px-4">
      <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
        💥 Limited Time Special Deals
      </h2>

      {deals.length === 0 ? (
        <p className="text-center text-gray-500">No deals available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <div
              key={deal._id}
              className="relative bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl"
            >
              {/* Discount Badge */}
              <div className="absolute top-0 left-0 z-10">
                <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rotate-[-45deg] translate-x-[-28%] translate-y-[-40%] w-32 text-center shadow-md">
                  {deal.type === 'percentage'
                    ? `${deal.discountValue}% OFF`
                    : `$${deal.discountValue} OFF`}
                </div>
              </div>

              <div className="w-full h-[300px] bg-white flex items-center justify-center overflow-hidden">
                <img
                  src={deal.product?.img || '/placeholder.jpg'}
                  alt={deal.product?.name || deal.category || deal.brand}
                  className="object-contain w-full h-full"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800">
                  {deal.name || deal.product?.name}
                </h3>

                {/* Star Rating */}
                {renderStars(deal.product?.rating || 4)}

                {deal.description && (
                  <p className="text-sm text-gray-600 mt-2">{deal.description}</p>
                )}

                <div className="text-sm text-gray-500 space-y-1 mt-2">
                  {deal.product && <p>Product: {deal.product.name}</p>}
                  {deal.category && <p>Category: {deal.category}</p>}
                  {deal.brand && <p>Brand: {deal.brand}</p>}
                </div>

                {/* Action Button */}
                <div className="mt-4">
                  {deal.product ? (
                    <button
                      onClick={() => {
                        if (deal.product?.price !== undefined) {
                          handlecart({ ...deal.product, quantity: 1 });
                        } else {
                          alert("Product data missing price.");
                        }
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 px-4 rounded-3xl cursor-pointer hover:scale-105 hover:bg-gray-800"
                    >
                      Add to Cart
                    </button>
                  ) : deal.category ? (
                    <Link to={`/category/${deal.category}`}>
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition">
                        View Category
                      </button>
                    </Link>
                  ) : deal.brand ? (
                    <Link to={`/brands/${deal.brand}`}>
                      <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-800 transition">
                        View Brand
                      </button>
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DealsPage;

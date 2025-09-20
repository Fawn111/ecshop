import React from "react";
import { FaTimes } from "react-icons/fa";

const ProductModal = ({ product, onClose, handlecart, handlewish, cart, wish }) => {
  if (!product) return null;

  const isInWishlist = wish?.some((item) => item._id === product._id);
  const isInCart = cart?.some((item) => item._id === product._id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md  bg-opacity-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-8 relative animate-fade-in">
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-gray-600 hover:text-red-600 transition"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes size={24} />
        </button>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="flex justify-center items-center bg-gray-50 rounded-xl p-6 shadow-inner">
            <img
              src={product.img}
              alt={product.name}
              className="max-h-[320px] object-contain rounded-lg"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-extrabold mb-4 tracking-wide text-gray-900">
                {product.name}
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-6 min-h-[80px]">
                {product.description || "No description available."}
              </p>
              <p className="text-2xl font-bold text-green-700 mb-3">
                Rs. {product.price.toLocaleString()}
              </p>
              <p className="text-md font-medium text-gray-700 mb-8">
                Stock Available:{" "}
                <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                  {product.stock}
                </span>
              </p>
            </div>

            <div className="flex gap-5">
              <button
                onClick={() => {
                  handlecart(product);
                }}
                className={`flex-1 bg-green-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-green-700 transition flex items-center justify-center gap-2`}
                disabled={product.stock === 0}
                title={product.stock === 0 ? "Out of stock" : "Add to Cart"}
              >
                {isInCart ? "Remove from Cart" : "Add to Cart"}
              </button>

              <button
                onClick={() => {
                  handlewish(product);
                }}
                className={`flex-1 border-2 rounded-xl font-semibold py-3 transition flex items-center justify-center gap-2 ${
                  isInWishlist
                    ? "border-red-600 text-red-600 hover:bg-red-100"
                    : "border-gray-700 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

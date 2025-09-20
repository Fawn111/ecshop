import React, { useEffect, useState } from "react";
import Heading from "../Shared/Heading";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal"; // 👈 Import the modal
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Products = ({ handlecart, handlewish, wish, cart }) => {
  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);     // 👈 Modal visibility
  const [selectedProduct, setSelectedProduct] = useState(null); // 👈 Product data

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    AOS.init({
      duration: 400,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
      offset: 100,
      delay: 200,
      anchorPlacement: 'top-bottom'
    });
  }, []);

  const fetchNewArrivals = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/api/products/newarrivals");
      if (!res.ok) throw new Error("Failed to fetch new arrivals");
      const data = await res.json();
      setProducts(data || []);
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchHotProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/api/products/hotselling");
      if (!res.ok) throw new Error("Failed to fetch hot selling");
      const data = await res.json();
      setProducts2(data || []);
    } catch (err) {
      setError(err.message);
      setProducts2([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewArrivals();
    fetchHotProducts();
  }, []);

  const NextArrow = ({ onClick }) => (
    <div onClick={onClick} className="z-20 absolute top-1/2 right-[-20px] -translate-y-1/2 cursor-pointer bg-white text-black shadow-md p-2 rounded-full hover:bg-black hover:text-white transition">
      <FaArrowRight />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div onClick={onClick} className="z-20 absolute top-1/2 left-[-20px] -translate-y-1/2 cursor-pointer bg-white text-black shadow-md p-2 rounded-full hover:bg-black hover:text-white transition">
      <FaArrowLeft />
    </div>
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div>
      {/* NEW ARRIVALS */}
      <div className="p-4 sm:p-6 m-4 overflow-hidden" data-aos="zoom-in">
        <Heading title="NEW ARRIVALS" />
        {error && <p className="text-red-500">{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : products.length > 0 ? (
          <div className="relative" data-aos="zoom-in">
            <Slider {...settings}>
              {products.map((product) => (
                <div key={product._id} className="ml-10 mb-5">
                  <ProductCard
                    data={[product]}
                    handlecart={handlecart}
                    handlewish={handlewish}
                    wish={wish}
                    cart={cart}
                    onOpenModal={() => handleOpenModal(product)} // 👈 Trigger
                  />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <p>No new arrivals found.</p>
        )}
      </div>

      {/* HOT SELLING */}
      <div className="p-4 sm:p-6 m-4 overflow-hidden border-t-2 border-gray-100" data-aos="zoom-in">
        <Heading title="HOT SELLINGS" />
        {error && <p className="text-red-500">{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : products2.length > 0 ? (
          <div className="relative" data-aos="zoom-in">
            <Slider {...settings}>
              {products2.map((product) => (
                <div key={product._id} className="ml-10 mb-5">
                  <ProductCard
                    data={[product]}
                    handlecart={handlecart}
                    handlewish={handlewish}
                    wish={wish}
                    cart={cart}
                    onOpenModal={() => handleOpenModal(product)} // 👈 Trigger
                  />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <p>No top selling products found.</p>
        )}
      </div>

      {/* Product Modal */}
      {showModal && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
          handlecart={handlecart}
          handlewish={handlewish}
          wish={wish}
          cart={cart}
        />
      )}
    </div>
  );
};

export default Products;

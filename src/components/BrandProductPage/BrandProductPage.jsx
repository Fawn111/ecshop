import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { IoIosStar } from "react-icons/io";
import { FaHeart } from 'react-icons/fa';

const BrandProductPage = ({ data, handlecart, handlewish, wish, cart }) => {
  const { id } = useParams(); // id is the brand name
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrandProducts = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/products/brand/${id}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching brand products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBrandProducts();
  }, [id]);

  if (loading) return <p className="text-center mt-40 mb-20">Loading Products...</p>;

  return (
    <div className="mt-40 max-w-6xl mx-auto px-4 mb-20">
      <h2 className="text-3xl font-bold mb-6">Products from "{id}"</h2>
      {products.length === 0 ? (
        <p>No products found for this brand.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((item) => (

            <div key={item.id} className='bg-white rounded-md p-3 w-full h-fit sm:w-[300px] hover:scale-105 transition-all duration-300 ease-in-out'>
                        <div className="relative">
                          <img src={item.img} alt={item.title} className="h-[330px] w-[295px] object-cover rounded-md" />
                        </div>
                        <div className="leading-7 mt-4 flex flex-col">
                          <div className='flex justify-between'>
                               <h2 className="font-semibold text-xl">{item.name}</h2>
                               <button onClick={() => handlewish(item)}>
                          <FaHeart className={`text-2xl mt-2 transition-all duration-300 cursor-pointer hover:scale-125 ${wish.some(w => w.id === item.id) ? 'text-red-600' : 'text-gray-400'}`}/>
                    </button>
                          </div>
                          <div className='flex items-center gap-1 mt-1 text-yellow-400'>
                            < IoIosStar className='text-yellow-400'/>
                            < IoIosStar />
                            < IoIosStar />
                            < IoIosStar />
                          </div>
                          <h2>{item.brand}</h2>
                          <div>
                            <h2 className="text-black text-[18px] font-semibold tracking-tighter">${item.price}</h2>
                          </div>
                           
                           <div className="items-center flex justify-center mt-3">
                           <motion.button onClick={() => handlecart(item)} className={`${cart.some((c) => c.id === item.id) ? 'bg-green-600' : 'bg-black'} text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg bottom-2 cursor-pointer`}  whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.8 }}>
                        {cart.some((c) => c.id === item.id) ? "Remove From Cart" : "Add To Cart"}
                    </motion.button>
                            
                          </div>
                        </div>
                      </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandProductPage;

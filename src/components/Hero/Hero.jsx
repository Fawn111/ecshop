import React from "react";
import { motion } from "framer-motion";
import image1 from "../../assets/Rectangle 2.png";
import vector from "../../assets/Vector.png";
import { Link } from "react-router-dom";

function Hero( { handleOrderPopup }){

    return(
        <div className="overflow-hidden mt-18 sm:mt-26 md:mt-22">
            <motion.div className="w-full bg-primary h-[900px] md:h-[1200px] lg:h-[650px]" initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }} >
            <div className="flex justify-around flex-col lg:flex-row md:flex-col">
                <div className="flex flex-col mt-6 ml-3 sm:ml-0 sm:mt-30 md:ml-12">
                    <div>
                        <h2 className="sm:w-[557px] w-[315px] sm:text-[60px] text-[39px] text-black font-extrabold sm:leading-14 leading-9 tracking-tighter">FIND CLOTHES THAT MATCHES YOUR STYLE</h2>
                        <p className="sm:w-[545px] w-[380px] text-[16px] mt-4 text-gray-500">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
                       <Link to="/newarrivals" ><button className="border rounded-full bg-black sm:px-15 px-34 py-3 text-white mt-4" >Shop Now</button></Link> 
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 grid-cols-2 grid gap-2 mt-15 text-center">
                        <div className="border-r-2 border-gray-200">
                            <h2 className="text-[40px] text-black font-bold">200+</h2>
                            <p className="text-gray-500">International Brands</p>
                        </div>
                        <div className="border-r-2 border-gray-200">
                             <h2 className="text-[40px] text-black font-bold">2,000+</h2>
                            <p className="text-gray-500">High Quality Products</p>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <h2 className="text-[40px] text-black font-bold">30,000+</h2>
                            <p className="text-gray-500">Happy Customers</p>
                        </div>
                    </div>
                </div>
                <div> 
                <motion.img 
                src={vector}
                className="absolute lg:top-90 top-180 lg:ml-0 ml-4 md:top-220"
                alt="vector"
                animate={{ y: [0, -10, 0] }}
                transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut"
                }}
                />

                <img src={image1} alt="" className="top-0" />

                <motion.img 
                src={vector}
                className="absolute lg:top-40 lg:right-20 top-150 right-10 md:top-200"
                alt="vector"
                animate={{ y: [0, -10, 0] }}
                transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut"
                }}
                />

                </div>
            </div>
              
            </motion.div>
        </div>
    )
}

export default Hero;
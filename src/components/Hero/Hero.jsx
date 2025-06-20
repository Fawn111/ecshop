import React from "react";
import Slider from "react-slick";
import Image1 from '../../assets/hero/headphone.png';
import Image2 from '../../assets/category/vr.png';
import { motion } from "framer-motion";
import Image3 from '../../assets/category/macbook.png'


const HeroData = [
    {
        id: 1,
        img: Image1,
        subtitle: "Beast Solo",
        title: "Wireless",
        title2: "Headphone",
    },
       {
        id: 2,
        img: Image2,
        subtitle: "Beast Solo",
        title: "Wireless",
        title2: "Virtual",
    },
       {
        id: 3,
        img: Image3,
        subtitle: "Beast Solo",
        title: "Laptops",
        title2: "Branded",
    },
]


function Hero( { handleOrderPopup }){
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

    return(
        <div className="p-3 sm:p-6 m-4 overflow-hidden mt-42 sm:mt-24">
            <motion.div className="w-full bg-gray-200 rounded-3xl h-[600px] sm:h-[550px]" initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }} >
              <Slider {...settings}>
                {HeroData.map((data) =>(
                    <div key={data.id}>
                        <div className="grid grid-cols-1 sm:grid-cols-2">
                            <div className="flex flex-col justify-center sm:ml-26 gap-2 ml-5">
                                <motion.h1 className="sm:text-2xl text-l mt-3 font-bold uppercase top-2 sm:ml-0 ml-26" initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}>{data.subtitle}</motion.h1>
                                <motion.h1 className="font-bold text-4xl sm:text-7xl sm:ml-0 ml-20" 
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 3 }}
                                    >{data.title}</motion.h1>
                                <motion.h1 initial={{ x: -50, opacity: 0 }}
                                           animate={{ x: 0, opacity: 1 }}
                                           transition={{ delay: 0.6, duration: 4 }} className="sm:text-9xl text-5xl uppercase tracking-wide font-bold text-white">{data.title2}</motion.h1>
                                <div>
                                    <button className="border transition hover:-translate-y-1 hover:scale-110  duration-300 ease-in-out delay-150 rounded-3xl p-3 mt-2 sm:ml-2 text-white border-secondary bg-secondary font-semibold cursor-pointer ml-20" onClick={handleOrderPopup}>Shop By Category</button>
                                </div>
                            </div>
                            <div>
                                <motion.img initial={{ x: 50, opacity: 0 }}
                                             animate={{ x: 0, opacity: 1 }}
                                             transition={{ delay: 0.6, duration: 3 }} src={data.img} className="w-[400px] h-[400px] sm:h-[500px] sm:scale-105 lg:scale-110 object-contain mx-auto drop-shadow-xl drop-shadow-gray-500" />
                            </div>
                        </div>

                    </div>
                ))}
             </Slider>
            </motion.div>
        </div>
    )
}

export default Hero;
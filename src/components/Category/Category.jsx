import React from "react";
import { motion } from "framer-motion";
import brand1 from "../../assets/brands/1.png";
import brand2 from "../../assets/brands/2.png";
import brand3 from "../../assets/brands/3.png";
import brand4 from "../../assets/brands/4.png";
import brand5 from "../../assets/brands/5.png";

function Category() {
  const vibrateAnimation = {
    scale: [1, 1.03, 1],
    x: [0, -1.5, 1.5, 0],
  };

  const vibrateTransition = {
    duration: 1.8,
    repeat: Infinity,
    repeatType: "loop",
    ease: "easeInOut",
  };

  return (
    <div className="bg-gradient-to-br from-rose-900 via-rose-700 to-rose-900 overflow-hidden">
      <motion.div className="p-3 sm:p-6">
        <div className="gap-3 grid grid-cols-3 md:grid-cols-5 place-items-center items-center">
          {[brand1, brand2, brand3, brand4, brand5].map((brand, index) => (
            <motion.img
              key={index}
              src={brand}
              alt={`brand-${index}`}
              className="w-[80px] col-span-auto md:col-span-1"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              animate={vibrateAnimation}
              transition={{
                ...vibrateTransition,
                delay: 0.5 + index * 0.15,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Category;

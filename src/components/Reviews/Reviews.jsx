import React from 'react';
import Heading from '../Shared/Heading';
import { MdVerified } from "react-icons/md";
import { IoIosStar } from "react-icons/io";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    subtitle: "I'm blown away by the quality and style of the clothes I received from Shop.co this month ! The fabric is soft and breathable, perfect for the summer heat. The fit is just right, and I love the trendy designs.",
  },
  {
    id: 2,
    name: "Alex K.",
    subtitle: "Shop.co has become my go-to for all my fashion needs this month! The selection is fantastic, and I appreciate the variety of styles available. The clothes are not only stylish but also comfortable to wear. I've received so many compliments on my outfits!",
  },
  {
    id: 3,
    name: "Emily Ria",
    subtitle: "Short reads for long-lasting calm and clarity. I recently bought a dress from Shop.co, and I couldn't be Highly recommend!",
  },
  {
    id: 4,
    name: "James T.",
    subtitle: "I recently purchased a suit for a wedding from Shop.co, and I couldn't be happier with my choice! The quality of the fabric is outstanding, and the fit is perfect. The suit looks sharp and stylish, making me feel confident at the event.",
  },
  {
    id: 5,
    name: "John D.",
    subtitle: "The variety is amazing, and I love how easy it is to find exactly what I'm looking for. The clothes are not only stylish but also comfortable to wear. I've received so many compliments on my outfits!",
  },
  {
    id: 6,
    name: "Sophia L.",
    subtitle: "Really impressed with the quality of the clothes I received from Shop.co this month! The fabric is soft and breathable, perfect for the summer heat. The fit is just right, and I love the trendy designs. I've already placed another order!",
  },
];

const Reviews = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 1000,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="p-3 sm:p-6 m-4 overflow-hidden sm:mb-20 mb-30">
      <Heading title="Our Happy Customers" />
      <div className="slider-container mt-10">
        <Slider {...settings}>
          {reviews.map((data) => (
            <div key={data.id} className="px-3 mb-10">
              <div className="bg-white rounded-md p-6 shadow-md hover:shadow-xl transition duration-300 h-full">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {data.name}
                  <MdVerified className="text-brandGreen" />
                </h3>
                <div className="flex items-center gap-1 mt-2 text-yellow-400">
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                  <IoIosStar />
                </div>
                <p className="text-gray-600 mt-2">{data.subtitle}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Reviews;

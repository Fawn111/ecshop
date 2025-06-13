import React from "react";
import Slider from "react-slick";
import Image1 from '../../assets/hero/headphone.png';
import Image2 from '../../assets/category/vr.png';
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


function Hero(){
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

    return(
        <div className="p-3 sm:p-6 m-4">
            <div className="w-full bg-gray-200 rounded-3xl h-[600px] sm:h-[550px]">
              <Slider {...settings}>
                {HeroData.map((data) =>(
                    <div key={data.id}>
                        <div className="grid grid-cols-1 sm:grid-cols-2">
                            <div className="flex flex-col justify-center sm:ml-26 gap-2 ml-5">
                                <h1 className="sm:text-2xl text-l mt-3 font-bold uppercase top-2 sm:ml-0 ml-26">{data.subtitle}</h1>
                                <h1 className="font-bold text-4xl sm:text-7xl sm:ml-0 ml-20">{data.title}</h1>
                                <h1 className="sm:text-9xl text-5xl uppercase tracking-wide font-bold text-white">{data.title2}</h1>
                                <div>
                                    <button className="border transition hover:-translate-y-1 hover:scale-110  duration-300 ease-in-out delay-150 rounded-3xl p-3 mt-2 sm:ml-2 text-white border-secondary bg-secondary font-semibold cursor-pointer ml-20">Shop By Category</button>
                                </div>
                            </div>
                            <div>
                                <img src={data.img} className="w-[400px] h-[400px] sm:h-[500px] sm:scale-105 lg:scale-110 object-contain mx-auto drop-shadow-xl drop-shadow-gray-500" />
                            </div>
                        </div>

                    </div>
                ))}
             </Slider>
            </div>
        </div>
    )
}

export default Hero;
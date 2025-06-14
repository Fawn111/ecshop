import React from "react";
import Button from "../Button";
import Image1 from "../../assets/category/gaming.png"
import Image2 from "../../assets/category/vr.png"
import Image3 from "../../assets/category/speaker.png"

function Category2(){
    return( 
        <>
        <div className="grid grid-col-1 sm:grid-cols-4 m-4 sm:p-6 gap-8  mt-24 sm:mt-0">
            <div className="bg-gradient-to-br from-gray-300/90 to-gray-100 rounded-3xl p-6 h-[320px] flex relative sm:col-span-2">
                <div>
                    <h2 className="text-white opacity-60">Enjoy</h2>
                    <h2 className="text-2xl text-white font-semibold">With</h2>
                    <h2 className="text-5xl font-bold opacity-60 text-white mb-5">Gaming Consoles</h2>
                    <Button className="mb-5 cursor-pointer">Browse</Button>
                </div>
                <div>
                     <img src={Image1} alt="" className="absolute bottom-3 right-1 w-[270px]" />
                </div>
            </div>
            <div className="bg-gradient-to-br from-brandGreen/90 to-brandGreen/90  rounded-3xl p-6 text-white h-[320px] relative flex">
                     <div>
                    <h2 className="text-white opacity-70">Enjoy</h2>
                    <h2 className="text-2xl text-white font-semibold">With</h2>
                    <h2 className="text-5xl font-bold opacity-40 text-white mb-5">VR</h2>
                    <Button className="mb-6 cursor-pointer button-20 ">Browse</Button>
                </div>
                <div>
                     <img src={Image2} alt="" className="absolute bottom-10 right-0 h-56" />
                </div>
            </div>
        <div className="bg-gradient-to-br from-brandBlue to-brandBlue/90  rounded-3xl p-6 text-white h-[320px]  relative flex">
                     <div>
                    <h2 className="text-white opacity-70">Enjoy</h2>
                    <h2 className="text-2xl text-white font-semibold">With</h2>
                    <h2 className="text-5xl font-bold opacity-40 text-white mb-5">Speakers</h2>
                    <Button className="mb-6 cursor-pointer">Browse</Button>
                </div>
                <div>
                     <img src={Image3} alt="" className="absolute sm:top-20 sm:h-62 h-62 top-15 right-0 bottom-0" />
                </div>
            </div>
        </div>
        </>
    )
        
}

export default Category2;
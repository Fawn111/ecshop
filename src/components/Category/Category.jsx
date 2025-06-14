import React from "react";
import Image1 from "../../assets/category/earphone.png";
import Image2 from "../../assets/category/watch.png"
import Image3 from "../../assets/category/macbook.png"
import Button from "../Shared/Button"

function Category(){
    return(
        <>
        <div className="grid grid-col-1 sm:grid-cols-4 m-4 sm:p-6 gap-8  mt-24 sm:mt-0">
            <div className="bg-gradient-to-br from-black/90 to-black/70 rounded-3xl p-6 h-[320px] flex relative items-end">
                <div>
                    <h2 className="text-white opacity-40">Enjoy</h2>
                    <h2 className="text-2xl text-white font-semibold">With</h2>
                    <h2 className="text-5xl font-bold opacity-20 text-white mb-5">Earphone</h2>
                    <Button className="mb-5 cursor-pointer">Browse</Button>
                </div>
                <div>
                     <img src={Image1} alt="" className="absolute bottom-0 right-0 w-[270px]" />
                </div>
            </div>
            <div className="bg-brandYellow rounded-3xl p-6 text-white h-[320px] relative flex items-end">
                     <div>
                    <h2 className="text-white opacity-70">Enjoy</h2>
                    <h2 className="text-2xl text-white font-semibold">With</h2>
                    <h2 className="text-5xl font-bold opacity-40 text-white mb-5">Watches</h2>
                    <Button className="mb-6 cursor-pointer">Browse</Button>
                </div>
                <div>
                     <img src={Image2} alt="" className="absolute bottom-10 left-20 right-0 " />
                </div>
            </div>
        <div className="bg-secondary rounded-3xl p-6 text-white h-[320px] sm:col-span-2  relative flex items-end">
                     <div>
                    <h2 className="text-white opacity-70">Enjoy</h2>
                    <h2 className="text-2xl text-white font-semibold">With</h2>
                    <h2 className="text-5xl font-bold opacity-40 text-white mb-5">Laptops</h2>
                    <Button className="mb-6 cursor-pointer">Browse</Button>
                </div>
                <div>
                     <img src={Image3} alt="" className="absolute sm:top-0 right-0 sm:h-86 h-62 top-15 ml-10 sm:ml-0" />
                </div>
            </div>
        </div>
        </>
    )
}

export default Category;
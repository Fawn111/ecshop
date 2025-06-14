import React from "react";
import { FaCarSide } from "react-icons/fa";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaWallet } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";

const servicesData = [
    {
        id: 1,
        icon: <FaCarSide className="text-4xl md:text-5xl text-primary"/>,
        title: "Free Shipping",
        description: "Free Shipping On All Order",
    },
    {
         id: 2,
        icon: <RiVerifiedBadgeFill className="text-4xl md:text-5xl text-primary"/>,
        title: "Safe Money",
        description: "30 Days Money Back",
    },
    {
         id: 3,
        icon: <FaWallet className="text-4xl md:text-5xl text-primary"/>,
        title: "Secure Payment",
        description: "All Payment Secure",
    },
    {
         id: 4,
        icon: <BiSupport className="text-4xl md:text-5xl text-primary"/>,
        title: "Online Supoort 24/7",
        description: "Technical Support 24/7",
    },
]

function Services(){
    return(
        <>
        <div className="p-3 sm:p-6 m-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-10">
            {servicesData.map((data) => (
                <div key={data.id} className="flex">
                     {data.icon}
                     <div className="ml-5">
                        <h2 className="text-2xl font-bold">{data.title}</h2>
                        <p className="text-{14px} font-normal text-gray-600">{data.description}</p>
                     </div>
                </div>
            ))}
        </div>
        </div>
        </>
    )
}

export default Services;
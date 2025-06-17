import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import DarkMode from './DarkMode';
import { IoMdArrowDropdown } from "react-icons/io";
import ProductCard from '../Products/ProductCard';
import { FaHeart } from "react-icons/fa";

const DropLinks = [
  {
    id: 1,
    name: "Best Selling",
    link: "/#",
  },
    {
    id: 2,
    name: "Hot Products",
    link: "/#",
  },
    {
    id: 3,
    name: "Most Ordered",
    link: "/#",
  },
]

const MenuLinks = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
    {
    id: 2,
    name: "Shop",
    link: "/#",
  },
    {
    id: 3,
    name: "Blogs",
    link: "/#",
  },
  {
    id: 4,
    name: "About",
    link: "/#",
  },
]

function NavBar({ handleOrderPopup , size , toggleCart, toggleWish ,size2 }){

    return (
      <>
    <div className="bg-white dark:text-white fixed w-full z-50 left-0 top-0">
        <div className="py-1">
            <div className="p-3 sm:p-6 flex justify-between items-center">
                <div className="flex">
                    <a href="#" className="text-primary tracking-widest font-semibold text-2xl sm:text-3xl uppercase">Eshop</a>
                    <div className="hidden lg:block">
                      <ul className="flex mx-9 mt-2">
                      {MenuLinks.map((data, index) => (
                        <li key={index} className="text-gray-600 font-semibold px-6 hover:text-black "><a href={data.link}> {data.name}</a> </li>
                      ))}
                      <li className='relative group cursor-pointer'>
                        <a href="#" className='text-gray-600 flex items-center gap-[2px] font-semibold'>Quick Links
                          <span>
                            <IoMdArrowDropdown className='text-gray-600 rotate-360 group-hover:rotate-180 mt-1 duration-300 text-xl'/>
                          </span>
                        </a>
                        <div className='hidden group-hover:block absolute shadow-sm top-full z-10'>
                          <ul>
                            {DropLinks.map((data, index) => (
                        <li key={index} className="hidden group-hover:block text-gray-600 
                   items-center w-36 p-2 group-hover:transition-all group-hover:duration-300 rounded-sm hover:bg-red-200 font-semibold border-solid  border-0 bg-white"><a href={data.link}> {data.name}</a> </li>))}
                          </ul>
                        </div>
                      </li>
                      </ul>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-4">
                    <div className="relative group hidden sm:block">
                      <input type="text" placeholder="Search" className="search-bar" />
                      <IoIosSearch className='text-gray-600 absolute top-1/2 -translate-y-1/2 right-1 group-hover:text-primary text-xl duration-200'/>
                    </div>
                     <button onClick={toggleWish}>
                      <FaHeart className='text-gray-600 hover:text-primary text-2xl cursor-pointer'/>
                    </button>
                    <p className='-translate-x-6 -translate-y-3 border rounded-4xl px-2 text-white bg-primary'>{size2}</p>
                    <button onClick={toggleCart}>
                      <FaShoppingCart className='text-gray-600 hover:text-primary text-2xl cursor-pointer'/>
                    </button>
                  <p className='-translate-x-6 -translate-y-3 border rounded-4xl px-2 text-white bg-primary'>{size}</p>
                    {/* <div>
                      <DarkMode />
                    </div> */}
                </div>

            </div>
        </div>
    </div>
    </>
  )
}

export default NavBar;
import React, { useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { Link, Navigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const MenuLinks = [
  { id: 1, name: "Home", link: "/#" },
  { id: 2, name: "Shop", link: "/#" },
  { id: 3, name: "Blogs", link: "/#" },
  { id: 4, name: "About", link: "/#" },
  { id: 4, name: "Orders", link: "/#" },
];


const ProfileLinks = [
  { id: 1, name: "Orders", link: "/orders" },
];


const DropLinks = [
  { id: 1, name: "Best Selling", link: "/#" },
  { id: 2, name: "Hot Products", link: "/#" },
  { id: 3, name: "Most Ordered", link: "/#" },
];

function NavBar({ handleOrderPopup, size, toggleCart, toggleWish, size2 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setLoggedIn(!!user);
  }, []);


const user = JSON.parse(localStorage.getItem("loggedInUser"));
  return (
    <div className="bg-white dark:text-white fixed w-full z-50 left-0 top-0 shadow">
      <div className="py-1">
        <div className="p-3 sm:p-6 sm:flex sm:justify-between items-center">
          <div className="flex justify-center items-center">
            <Link to="/" className="text-primary tracking-widest font-semibold text-4xl sm:text-3xl uppercase mb-5 sm:mb-0">Eshop</Link>
            <div className="hidden lg:block">
              <ul className="flex mx-9 mt-2">
                {MenuLinks.map((data) => (
                  <li key={data.id} className="text-gray-600  px-6 font-sans font-semibold hover:text-black">
                    <Link to={data.link}>{data.name}</Link>
                  </li>
                ))}
                <li className="relative group cursor-pointer">
                  <a href="#" className="text-gray-600 flex items-center gap-[2px] font-sans font-semibold">
                    Quick Links
                    <IoMdArrowDropdown className="text-gray-600 group-hover:rotate-180 mt-1 duration-300 text-xl" />
                  </a>
                  <div className="hidden group-hover:block absolute shadow-sm top-full z-10">
                    <ul>
                      {DropLinks.map((data) => (
                        <li
                          key={data.id}
                          className="text-gray-600 w-36 p-2 rounded-sm hover:bg-red-200 font-sans font-semibold bg-white"
                        >
                          <Link to={data.link}>{data.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4">
            <div className="relative group hidden sm:block">
              <input type="text" placeholder="Search" className="search-bar" />
              <IoIosSearch className="text-gray-600 absolute top-1/2 -translate-y-1/2 right-1 group-hover:text-primary text-xl duration-200" />
            </div>

            <button onClick={toggleWish}>
              <FaHeart className="text-gray-600 hover:text-primary text-2xl cursor-pointer" />
            </button>
            <p onClick={toggleWish} className="cursor-pointer -translate-x-6 -translate-y-3 border rounded-4xl px-2 text-white bg-primary">
              {size2}
            </p>

            <button onClick={toggleCart}>
              <FaShoppingCart className="text-gray-600 hover:text-primary text-2xl cursor-pointer" />
            </button>
            <p onClick={toggleCart} className="cursor-pointer -translate-x-6 -translate-y-3 border rounded-4xl px-2 text-white bg-primary">
              {size}
            </p>

       <div className="relative group cursor-pointer item-center" onClick={toggleDropdown} >
                  <a className="text-gray-600 flex items-center font-sans font-semibold" onClick={toggleDropdown}>
                    <CgProfile className="text-gray-600 duration-300 text-3xl" />
                  </a>
                    {isOpen && (
                  <div className="hidder group-hover:block absolute shadow-sm p-3 w-56 bg-white top-full z-10 ">
                    <ul>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h2 className="text-gray-600 font-semibold">Profile</h2>
                          <button onClick={closeDropdown} className="text-gray-600 hover:text-primary text-xl">  <IoMdClose
                                    className="text-2xl cursor-pointer hover:scale-105 text-black"
                                  /></button>
                        </div>
                      </div>
                      {ProfileLinks.map((moiz) => (
                        <li
                          key={moiz.id}
                          className="text-gray-600 w-full p-2 hover:bg-red-200 font-sans font-semibold bg-white border border-gray-200 rounded-sm mb-1"
                        >
                          <Link to={moiz.link}>{moiz.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div> 
                )}
                </div>

                {user ? (
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">Welcome, {user.name}</span>
          <button
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              localStorage.removeItem("loggedInUser");
              window.location.href = "/login";
            }}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <Link to="/login" className="text-white text-lg rounded-3xl cursor-pointer border border-primary bg-primary px-3 py-2">Login</Link>
          <Link to="/signup" className="text-white text-lg rounded-3xl cursor-pointer border border-primary bg-primary px-3 py-2">Signup</Link>
        </>
      )}


          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;

import React, { useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

const MenuLinks = [
  { id: 1, name: "Home", link: "/#" },
  { id: 2, name: "Shop", link: "/#" },
  { id: 3, name: "Blogs", link: "/#" },
  { id: 4, name: "About", link: "/#" },
];

const DropLinks = [
  { id: 1, name: "Best Selling", link: "/#" },
  { id: 2, name: "Hot Products", link: "/#" },
  { id: 3, name: "Most Ordered", link: "/#" },
];

function NavBar({ handleOrderPopup, size, toggleCart, toggleWish, size2 }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const user = localStorage.getItem("user");
    setLoggedIn(!!user);
  }, []);

  const handleAuthClick = () => {
    if (loggedIn) {
      localStorage.removeItem("user");
      window.location.reload();
    } else {
      window.location.href = "/login";
    }
  };
const user = JSON.parse(localStorage.getItem("loggedInUser"));
  return (
    <div className="bg-white dark:text-white fixed w-full z-50 left-0 top-0 shadow">
      <div className="py-1">
        <div className="p-3 sm:p-6 sm:flex sm:justify-between items-center">
          <div className="flex justify-center items-center">
            <a href="#" className="text-primary tracking-widest font-semibold text-4xl sm:text-3xl uppercase mb-5 sm:mb-0">Eshop</a>
            <div className="hidden lg:block">
              <ul className="flex mx-9 mt-2">
                {MenuLinks.map((data) => (
                  <li key={data.id} className="text-gray-600 font-semibold px-6 hover:text-black">
                    <a href={data.link}>{data.name}</a>
                  </li>
                ))}
                <li className="relative group cursor-pointer">
                  <a href="#" className="text-gray-600 flex items-center gap-[2px] font-semibold">
                    Quick Links
                    <IoMdArrowDropdown className="text-gray-600 group-hover:rotate-180 mt-1 duration-300 text-xl" />
                  </a>
                  <div className="hidden group-hover:block absolute shadow-sm top-full z-10">
                    <ul>
                      {DropLinks.map((data) => (
                        <li
                          key={data.id}
                          className="text-gray-600 w-36 p-2 rounded-sm hover:bg-red-200 font-semibold bg-white"
                        >
                          <a href={data.link}>{data.name}</a>
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
          <a href="/login" className="text-white text-lg rounded-3xl cursor-pointer border border-primary bg-primary px-3 py-2">Login</a>
          <a href="/signup" className="text-white text-lg rounded-3xl cursor-pointer border border-primary bg-primary px-3 py-2">Signup</a>
        </>
      )}


          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;

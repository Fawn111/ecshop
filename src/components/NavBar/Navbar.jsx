import React, { useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { FaShoppingCart, FaHeartBroken } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoMenu, IoNuclearOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const MenuLinks = [
  { id: 1, name: "On Sale", link: "/#" },
  { id: 2, name: "New Arrivals", link: "/#" },
  { id: 3, name: "Deals", link: "/#" },
  { id: 4, name: "Brands", link: "/#" },
];

const DropLinks = [
  { id: 1, name: "Best Selling", link: "/#" },
  { id: 2, name: "Hot Products", link: "/#" },
  { id: 3, name: "Most Ordered", link: "/#" },
];

function NavBar({ handleOrderPopup, size, toggleCart, toggleWish, size2 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

const [user, setUser] = useState(IoNuclearOutline);

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser)
}, []);

const username = JSON.parse(localStorage.getItem("loggedInUser"));


  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    closeDropdown();
  };

  return (
    <div className="bg-white dark:text-white fixed w-full z-50 left-0 top-0 shadow overflow-visible">
      <div className="py-1">
        <div className="p-3 sm:p-6 sm:flex sm:justify-between items-center flex justify-around mx-0 sm:mx-6">
          <div className="lg:hidden flex items-center">
            <IoMenu
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-2xl cursor-pointer text-black mr-4"
            />
          </div>

          <div className="flex items-center gap-6">
            <Link to="/" className="text-black font-extrabold text-4xl sm:text-3xl uppercase sm:mr-0 mr-4">SHOP.CO</Link>

            <div className="hidden lg:block">
              <ul className="flex mx-9 mt-2">
                <li className="relative group cursor-pointer">
                  <span className="text-gray-600 flex items-center gap-[2px] font-sans font-semibold">
                    Shop
                    <IoMdArrowDropdown className="text-gray-600 group-hover:rotate-180 mt-1 duration-300 text-xl" />
                  </span>
                  <div className="hidden group-hover:block absolute shadow-sm top-full z-10">
                    <ul>
                      {DropLinks.map((data) => (
                        <li key={data.id} className="text-gray-600 w-36 p-2 rounded-sm hover:bg-red-200 font-sans font-semibold bg-white">
                          <Link to={data.link}>{data.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
                {MenuLinks.map((data) => (
                  <li key={data.id} className="text-gray-600 px-4 font-sans font-semibold hover:text-black">
                    <Link to={data.link}>{data.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <IoIosSearch className="text-gray-600 absolute top-3 left-2 text-2xl" />
              <input type="text" placeholder="Search for Products.." className="search-bar pl-10" />
            </div>

            <button onClick={toggleCart}>
              <FaShoppingCart className="text-black hover:scale-105 text-2xl cursor-pointer" />
            </button>
            <p onClick={toggleCart} className="cursor-pointer -translate-x-6 -translate-y-3 border rounded-4xl px-2 text-white bg-black">
              {size}
            </p>
            <button onClick={toggleWish}>
              <FaHeartBroken className="text-black hover:scale-105 text-2xl cursor-pointer" />
            </button>
            <p onClick={toggleWish} className="cursor-pointer -translate-x-6 -translate-y-3 border rounded-4xl px-2 text-white bg-black">
              {size2}
            </p>

            <div className="relative cursor-pointer" onClick={toggleDropdown}>
              <CgProfile className="text-black text-3xl" />
              {isOpen && (
                <div className="absolute right-0 mt-4 shadow-sm w-56 bg-white top-full z-50 rounded-md border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-black text-xl font-bold p-3">
                      {user ? `Hello, ${username.name}` : 'Profile'}
                    </h2>
                    <button onClick={closeDropdown}>
                      <IoMdClose className="text-2xl m-3 text-gray-600 hover:scale-110 cursor-pointer" />
                    </button>
                  </div>

                  <ul className='text-center'>
                    {user ? (
                      <>
                          <Link to="/wishlist">   <li className="text-gray-600 w-full p-2 hover:bg-black hover:text-white font-sans font-semibold bg-white">Wishlist </li></Link>
                        <li
                          onClick={handleLogout}
                          className="cursor-pointer text-gray-600 w-full p-2 hover:bg-black hover:text-white font-sans font-semibold bg-white"
                        >
                          Logout
                        </li>
                      </>
                    ) : (
                      <>
                       
                          <Link to="/login"> <li className="text-gray-600 w-full p-2 hover:bg-black hover:text-white font-sans font-semibold bg-white">Login</li></Link>
                          <Link to="/signup"><li className="text-gray-600 w-full p-2 hover:bg-black hover:text-white font-sans font-semibold bg-white">Signup</li> </Link>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showMobileMenu && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-md z-40 px-4 py-2 transition-all duration-300">
          <ul>
            <li className="font-bold text-gray-700 mb-1">
              Quick Links
              <button onClick={() => setShowMobileMenu(!showMobileMenu)} className='text-black tracking-widest text-2xl ml-4'>X</button>
            </li>
            {DropLinks.map((link) => (
              <li key={link.id} className="py-2 border-b">
                <Link to={link.link} className="text-gray-600">{link.name}</Link>
              </li>
            ))}
            <li className="font-bold text-gray-700 mt-4 mb-1">Main Menu</li>
            {MenuLinks.map((link) => (
              <li key={link.id} className="py-2 border-b">
                <Link to={link.link} className="text-gray-600">{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavBar;

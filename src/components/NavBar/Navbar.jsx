import React, { useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { FaShoppingCart, FaHeartBroken } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";

const MenuLinks = [
  { id: 1, name: "Categories", link: "/category" },
  { id: 2, name: "All Products", link: "/newarrivals" },
  { id: 3, name: "Deals", link: "/deals" },
  { id: 4, name: "Brands", link: "/brands" },
];

const DropLinks = [
  { id: 1, name: "Best Selling", link: "/#" },
  { id: 2, name: "Hot Products", link: "/#" },
  { id: 3, name: "Most Ordered", link: "/#" },
];

function NavBar({ handleOrderPopup, size, toggleCart, toggleWish, size2 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(stored);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setUser(null);
    closeDropdown();
  };

  return (
    <nav className="bg-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        
        {/* Logo + Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <IoMenu
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="text-2xl lg:hidden cursor-pointer text-black"
          />
          <Link to="/" className="text-2xl sm:text-3xl font-extrabold text-black uppercase">
            SHOP.CO
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex gap-8">
          {MenuLinks.map((item) => (
            <li key={item.id}>
              <Link to={item.link} className="text-gray-600 font-medium hover:text-black transition">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Search (visible on md & up) */}
        <div className="hidden md:block relative w-40 md:w-56 lg:w-[500px]">
          <IoIosSearch className="absolute top-3.5 left-3 text-xl text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-3 border rounded-full text-sm  border-gray-400 focus:ring-black"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Cart */}
          <button onClick={toggleCart} className="relative">
            <FaShoppingCart className="text-3xl text-black hover:scale-105 transition" />
            {size > 0 && (
              <span className="absolute -top-3 -right-2 bg-red-500 text-white text-xs w-6 h-6 font-normal rounded-full flex items-center justify-center">
                {size}
              </span>
            )}
          </button>

          {/* Wishlist */}
          <button onClick={toggleWish} className="relative">
            <FaHeartBroken className="text-3xl text-black hover:scale-105 transition" />
            {size2 > 0 && (
              <span className="absolute -top-3 -right-2 bg-red-500 text-white text-xs w-6 h-6 font-normal rounded-full flex items-center justify-center">
                {size2}
              </span>
            )}
          </button>

          {/* Profile */}
          <div className="relative">
            <CgProfile
              onClick={toggleDropdown}
              className="text-3xl text-black cursor-pointer"
            />
            {isOpen && (
              <div className="absolute right-0 mt-2 bg-white w-56 rounded-lg shadow-lg z-50 border">
                <div className="flex justify-between items-center px-4 py-2 border-b">
                  <p className="text-black font-semibold">
                    {user ? `Hello, ${user.name}` : "Profile"}
                  </p>
                  <IoMdClose
                    className="text-xl cursor-pointer text-gray-500 hover:text-black"
                    onClick={closeDropdown}
                  />
                </div>
                <ul className="py-2">
                  {user ? (
                    <>
                      <Link to="/wishlist">
                        <li className="px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer">Wishlist</li>
                      </Link>
                      <li
                        onClick={handleLogout}
                        className="px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer"
                      >
                        Logout
                      </li>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <li className="px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer">Login</li>
                      </Link>
                      <Link to="/signup">
                        <li className="px-4 py-2 hover:bg-gray-100 text-gray-700 cursor-pointer">Signup</li>
                      </Link>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {showMobileMenu && (
        <div className="lg:hidden bg-white shadow-md px-6 py-4 transition-all">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-gray-800">Menu</h3>
            <button
              onClick={() => setShowMobileMenu(false)}
              className="text-black text-xl"
            >
              X
            </button>
          </div>
          <ul className="space-y-2">
            {DropLinks.map((link) => (
              <li key={link.id}>
                <Link to={link.link} className="text-gray-600 hover:text-black block">
                  {link.name}
                </Link>
              </li>
            ))}
            <hr className="my-2" />
            {MenuLinks.map((link) => (
              <li key={link.id}>
                <Link to={link.link} className="text-gray-600 hover:text-black block">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavBar;

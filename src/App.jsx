import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from './components/NavBar/Navbar';
import Hero from './components/Hero/Hero';
import Category from './components/Category/Category';
import Category2 from './components/Category/Category2';
import Services from './components/Services/Services';
import Banner from './components/Banner/Banner';
import headphone from './assets/hero/headphone.png';
import Products from './components/Products/Products';
import watch from "./assets/category/smartwatch2-removebg-preview.png";
import Blog from './components/Blogs/Blog';
import Partners from './components/Partners/Partners';
import Footer from './components/Footer/Footer';
import Popup from './components/Popup/Popup';
import Cart from './components/Cart/Cart';
import Wishlist from './components/Whishlist/Wishlist';
import Toaster from './components/Shared/Toaster';

import Login from './components/Logins/Login';
import Signup from './components/Logins/signup';

const BannerData = {
  discount: "30% OFF",
  title: "Fine Smile",
  date: "10 Jan to 28 Jan",
  image: headphone,
  title2: "Air Solo Bass",
  title3: "Winter Sale",
  title4: "Voluptate omnis aut at nobis voluptates vel quibusdam porro cupiditate hic ametvoluptatibus quos error?",
  bgColor: "#f42c37"
};

const BannerData2 = {
  discount: "30% OFF",
  title: "Happy Hours",
  date: "10 Jan to 28 Jan",
  image: watch,
  title2: "Winter Sale",
  title3: "Winter Sale",
  title4: "Voluptate omnis aut at nobis voluptates vel quibusdam porro cupiditate hic ametvoluptatibus quos error?",
  bgColor: "#2dcc6f"
};

function App() {
  const [cart, setCart] = useState([]);
  const [wish, setWish] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishOpen, setIsWishOpen] = useState(false);
  const [OrderPopup, SetOrderPopup] = useState(false);

  const [warning, setWarning] = useState(false);
  const [warning2, setWarning2] = useState(false);
  const [addedwish, setaddedWish] = useState(false);
  const [addedcart, setaddedCart] = useState(false);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleWish = () => setIsWishOpen(!isWishOpen);
  const handleOrderPopup = () => SetOrderPopup(!OrderPopup);

  const handlecart = (item) => {
    const exists = cart.some((moiz) => moiz.id === item.id);
    if (exists) {
      setCart(cart.filter((moiz) => moiz.id !== item.id));
      setWarning(true);
      setTimeout(() => setWarning(false), 2000);
    } else {
      setCart([...cart, item]);
      setaddedCart(true);
      setTimeout(() => setaddedCart(false), 2000);
    }
  };

  const handlewish = (item) => {
    const exists = wish.some((w) => w.id === item.id);
    if (exists) {
      setWish(wish.filter((w) => w.id !== item.id));
      setWarning2(true);
      setTimeout(() => setWarning2(false), 2000);
    } else {
      setWish([...wish, item]);
      setaddedWish(true);
      setTimeout(() => setaddedWish(false), 2000);
    }
  };

  return (
   <Router>
  <Routes>
    <Route
      path="/"
      element={
        <>
          <Navbar
            handleOrderPopup={handleOrderPopup}
            size={cart.length}
            size2={wish.length}
            toggleCart={toggleCart}
            toggleWish={toggleWish}
          />
          <Hero handleOrderPopup={handleOrderPopup} />

          <div className="fixed bottom-4 right-4 flex flex-col-reverse gap-3 z-[9999]">
            {warning && <Toaster message="Removed From the Cart!" type="error" />}
            {warning2 && <Toaster message="Item Removed From Wishlist!" type="error" />}
            {addedcart && <Toaster message="Added To The Cart!" type="success" />}
            {addedwish && <Toaster message="Added To The Wishlist!" type="success" />}
          </div>

          <Category />
          <Category2 />
          <Products
            cart={cart}
            handlecart={handlecart}
            handlewish={handlewish}
            wish={wish}
          />
          <Banner data={BannerData} handleOrderPopup={handleOrderPopup} />
          <Banner data={BannerData2} handleOrderPopup={handleOrderPopup} />
          <Blog />
          <Partners />
          <Services />
          <Footer />
          <Popup OrderPopup={OrderPopup} handleOrderPopup={handleOrderPopup} />
          <Cart
            isCartOpen={isCartOpen}
            size={cart.length}
            toggleCart={toggleCart}
            cart={cart}
            setCart={setCart}
          />
          <Wishlist
            isWishOpen={isWishOpen}
            toggleWish={toggleWish}
            wish={wish}
            setWish={setWish}
            size={wish.length}
          />
        </>
      }
    />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
</Router>

  );
}

export default App;

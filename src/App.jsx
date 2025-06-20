import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from './components/NavBar/Navbar';
import Hero from './components/Hero/Hero';
import Category from './components/Category/Category';
import Services from './components/Services/Services';
import Banner from './components/Banner/Banner';
import Products from './components/Products/Products';
import Blog from './components/Blogs/Blog';
import Footer from './components/Footer/Footer';
import Popup from './components/Popup/Popup';
import Cart from './components/Cart/Cart';
import Wishlist from './components/Whishlist/Wishlist';
import Toaster from './components/Shared/Toaster';
import Order from "./components/Orders/Order";
import Login from './components/Logins/Login';
import Signup from './components/Signup/Signup';
import OrderRecieved from "./components/Conformation/OrderRecieved";
import Checkout from './components/Checkout/Checkout';

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


useEffect(() => {
  const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
  setCart(savedCart);
}, []);

    useEffect(() => {
      localStorage.setItem("cartItems", JSON.stringify(cart));
    }, [cart]);

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
          <Products
            cart={cart}
            handlecart={handlecart}
            handlewish={handlewish}
            wish={wish}
          />
          <Banner />
          <Blog />
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
            cart={cart}
            handlecart={handlecart}
          />
        </>
      }
    />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="*" element={<Navigate to="/" />} />
    <Route path="/checkout" element={<>
      <Navbar   handleOrderPopup={handleOrderPopup}
            size={cart.length}
            size2={wish.length}
            toggleCart={toggleCart}
            toggleWish={toggleWish}/> 
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
            cart={cart}
            handlecart={handlecart}
          />
      <Checkout setCart1={setCart}
        cart={cart}/>
    </>} />
    <Route path="/order-received" element={<OrderRecieved />} />
    <Route path="/orders" element={
      <> 
     <Navbar
            handleOrderPopup={handleOrderPopup}
            size={cart.length}
            size2={wish.length}
            toggleCart={toggleCart}
            toggleWish={toggleWish}
          />
      <Order />
    </>
  } />
  </Routes>
</Router>

  );
}

export default App;

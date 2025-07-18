import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from './components/NavBar/Navbar';
import Hero from './components/Hero/Hero';
import Category from './components/Category/Category';
import Banner from './components/Banner/Banner';
import Products from './components/Products/Products';
import Reviews from './components/Reviews/Reviews';
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
import Productsapi from "./components/Product Page/Productsapi";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import CategoryProducts from "./components/CategoryProduct/CategoryProducts";
import BrandProductPage from "./components/BrandProductPage/BrandProductPage";
import BrandPage from "./components/BrandPage/BrandPage";
import DealsPage from "./components/Deals/DealPage";


// admin components
import AdminLayout from "./components/Admin/AdminLayout";
import AdminOrders from "./components/Admin/Orders";
import AdminProducts from "./components/Admin/Products";
import Dashboard from "./components/Admin/Dashboard";
import AdminCategory from "./components/Admin/Category";
import AdminBrands from "./components/Admin/Brands";
import CreateDeal from "./components/Admin/Dealsadmin";
import AdminCoupon from "./components/Admin/Coupon";
import AdminUsers from "./components/Admin/User";
import User from "./components/Admin/User";


function App() {
  const [cart, setCart] = useState([]);
  const [wish, setWish] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishOpen, setIsWishOpen] = useState(false);
  const [OrderPopup, SetOrderPopup] = useState(false);

  // toaster states
  const [warning, setWarning] = useState(false);
  const [warning2, setWarning2] = useState(false);
  const [addedwish, setaddedWish] = useState(false);
  const [addedcart, setaddedCart] = useState(false);

  const toggleCart = () => {
    console.log("Cart Pressed")
     setIsCartOpen(!isCartOpen);
  }

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
  const exists = cart.some((i) => i._id === item._id);
  if (exists) {
    setCart(cart.filter((i) => i._id !== item._id));
    setWarning(true);
    setTimeout(() => setWarning(false), 2000);
  } else {
    const newItem = { ...item, quantity: 1 };
    setCart([...cart, newItem]);
    setaddedCart(true);
    setTimeout(() => setaddedCart(false), 2000);
  }
};


  const handlewish = (item) => {
    const exists = wish.some((w) => w._id === item._id);
    if (exists) {
      setWish(wish.filter((w) => w._id !== item._id));
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
              <Reviews />
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
        <Route path="/deals" element={
          <>
          <Navbar
                handleOrderPopup={handleOrderPopup}
                size={cart.length}
                size2={wish.length}
                toggleCart={toggleCart}
                toggleWish={toggleWish}
              />
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
          <DealsPage cart={cart}
                handlecart={handlecart}
                handlewish={handlewish}
                wish={wish} />
          <Footer />
          </>
      } />

      <Route path="/admin" element={<AdminLayout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="orders" element={<AdminOrders />} />
      <Route path="products" element={<AdminProducts />} />
      <Route path="categories" element={<AdminCategory />} />
      <Route path="brands" element={<AdminBrands />} />
      <Route path="deals" element={<CreateDeal />} />
      <Route path="coupon" element={<AdminCoupon />} />
      <Route path="users" element={<User />} />
    </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/order-received" element={<OrderRecieved />} />

        <Route
          path="/checkout"
          element={
            <>
              <Navbar
                handleOrderPopup={handleOrderPopup}
                size={cart.length}
                size2={wish.length}
                toggleCart={toggleCart}
                toggleWish={toggleWish}
              />
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
              <Checkout setCart1={setCart} cart={cart} />
            </>
          }
        />

        <Route
          path="/orders"
          element={
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
          }
        />
        <Route
          path="/newarrivals"
          element={
            <>
              <Navbar
                handleOrderPopup={handleOrderPopup}
                size={cart.length}
                size2={wish.length}
                toggleCart={toggleCart}
                toggleWish={toggleWish}
              />
              <Productsapi cart={cart}
                handlecart={handlecart}
                handlewish={handlewish}
                wish={wish}/>
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
        <Route path="*" element={<Navigate to="/" />} />
         <Route
  path="/category"
  element={
    <>
     <Navbar
                handleOrderPopup={handleOrderPopup}
                size={cart.length}
                size2={wish.length}
                toggleCart={toggleCart}
                toggleWish={toggleWish}
              />
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
      <CategoryPage />
      <Footer />
    </>
  }
/>

<Route
  path="/category/:id"
  element={
    <>
       <Navbar
                handleOrderPopup={handleOrderPopup}
                size={cart.length}
                size2={wish.length}
                toggleCart={toggleCart}
                toggleWish={toggleWish}
              />
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
      <CategoryProducts cart={cart}
                handlecart={handlecart}
                handlewish={handlewish}
                wish={wish}/>
      <Footer />
    </>
  }
/>

  <Route
  path="/brands"
  element={
    <>
       <Navbar
                handleOrderPopup={handleOrderPopup}
                size={cart.length}
                size2={wish.length}
                toggleCart={toggleCart}
                toggleWish={toggleWish}
              />
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
      <BrandPage />
      <Footer />
    </>
  }
/>

<Route
  path="/brands/:id"
  element={
    <>
      <Navbar
        handleOrderPopup={handleOrderPopup}
        size={cart.length}
        size2={wish.length}
        toggleCart={toggleCart}
        toggleWish={toggleWish}
      />
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
      <BrandProductPage  cart={cart}
                handlecart={handlecart}
                handlewish={handlewish}
                wish={wish}/>
      <Footer />
    </>
  }
/>



      </Routes>
    </Router>
  );
}

export default App;

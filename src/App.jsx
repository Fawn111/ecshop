import React from 'react'
import Navbar from './components/NavBar/Navbar';
import Hero from './components/Hero/Hero';
import Category from './components/Category/Category';
import Category2 from './components/Category/Category2';
import Services from './components/Services/Services';
import Banner from './components/Banner/Banner';
import headphone from './assets/hero/headphone.png';
import Products from './components/Products/Products';
import watch from "./assets/category/smartwatch2-removebg-preview.png"
import Blog from './components/Blogs/Blog';
import Partners from './components/Partners/Partners';
import Footer from './components/Footer/Footer';
import Popup from './components/Popup/Popup';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Cart from './components/Cart/Cart';
import Wishlist from './components/Whishlist/Wishlist';
import Toaster from './components/Shared/Toaster';




const BannerData = {
    discount: "30% OFF",
    title: "Fine Smile",
    date: "10 Jan to 28 Jan",
    image: headphone,
    title2: "Air Solo Bass",
    title3: "Winter Sale",
    title4: "Voluptate omnis aut at nobis voluptates vel quibusdam porro cupiditate hic ametvoluptatibus quos error?",
    bgColor: "#f42c37"
}

const BannerData2 = {
    discount: "30% OFF",
    title: "Happy Hours",
    date: "10 Jan to 28 Jan",
    image: watch,
    title2: "Winter Sale",
    title3: "Winter Sale",
    title4: "Voluptate omnis aut at nobis voluptates vel quibusdam porro cupiditate hic ametvoluptatibus quos error?",
    bgColor: "#2dcc6f",
}


function App(){

  useEffect(() => {
  AOS.init(
    {
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
      offset: 100,
    }
  )
  AOS.refresh();
}, []);

  const [OrderPopup, SetOrderPopup] = React.useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [warning, setWarning ] = useState(false);
  const [wish, setWish] = useState([]);
  const [isWishOpen, setIsWishOpen] = useState(false);
  const [addedwish, setaddedWish] = useState(false);
  const [addedcart, setaddedCart] = useState(false);
  const [warning2, setWarning2 ] = useState(false);

  const handleOrderPopup = ()  => {
    SetOrderPopup(!OrderPopup);
  };

  function toggleCart() {
    console.log("pressed")
  setIsCartOpen(!isCartOpen);
}

 function toggleWish() {
    console.log("pressed")
  setIsWishOpen(!isWishOpen);
}

 function handlecart(item) {
  const isPresent = cart.some((moiz) => moiz.id === item.id);

  if (isPresent) {
    setCart(cart.filter((moiz) => moiz.id !== item.id));
    setWarning(true);
    setTimeout(() => {
      setWarning(false);
    }, 2000);
  } else {
    setCart([...cart, item]);
    setaddedCart(true);
    setTimeout(() => {
      setaddedCart(false);
    }, 2000);
  }
}


 function handlewish(item) {
  const isPresent = wish.some((list) => list.id === item.id);

  if (isPresent) {
    setWish(wish.filter((list) => list.id !== item.id));
    setWarning2(true);
    setTimeout(() => {
      setWarning2(false);
    }, 2000);
  } else {
    setWish([...wish, item]);
    setaddedWish(true);
    setTimeout(() => {
      setaddedWish(false);
    }, 2000);
  }
}



  return (
    <>
       <Navbar handleOrderPopup={handleOrderPopup} size={cart.length} size2={wish.length} toggleCart={toggleCart} toggleWish={toggleWish}/>
        <Hero handleOrderPopup={handleOrderPopup}/>
       <div className="fixed bottom-4 right-4 flex flex-col-reverse gap-3 z-[9999]">
              {warning && <Toaster message="Removed From the Cart!" type="error" />}
              {warning2 && <Toaster message="Item Removed From Wishlist!" type="error" />}
              {addedcart && <Toaster message="Added To The Cart!" type="success" />}
              {addedwish && <Toaster message="Added To The Wishlist!" type="success" />}
        </div>

        

        <Category />
        <Category2 />
        <Products cart={cart} handlecart={handlecart} handlewish={handlewish} wish={wish}/>
        <Banner data={BannerData} handleOrderPopup={handleOrderPopup}/>
        <Banner data={BannerData2} handleOrderPopup={handleOrderPopup}/>
        <Blog />
        <Partners />
        <Services />
        <Footer />
        <Popup OrderPopup={OrderPopup} handleOrderPopup={handleOrderPopup}/>
        <Cart isCartOpen={isCartOpen} size={cart.length} toggleCart={toggleCart} cart={cart} setCart={setCart}/>
        <Wishlist isWishOpen={isWishOpen} toggleWish={toggleWish} wish={wish} setWish={setWish} size={wish.length}/>
    </>
  )
}

export default App;
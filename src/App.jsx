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

  const handleOrderPopup = ()  => {
    SetOrderPopup(!OrderPopup);
  };

  function toggleCart() {
    console.log("pressed")
  setIsCartOpen(!isCartOpen);
}

 function handlecart(item) {
  let isPresent = false;

  cart.forEach((moiz) => {
    if (item.id === moiz.id) {
      isPresent = true;
    }
  });

  if (isPresent) {
    setWarning(true);
    setTimeout(() =>{
      setWarning(false);
    }, 5000);
    return;
  }

    setCart([...cart, item]);
}


  return (
    <>
       <Navbar handleOrderPopup={handleOrderPopup} size={cart.length} toggleCart={toggleCart}/>
        <Hero handleOrderPopup={handleOrderPopup}/>
        {warning && (
              <div data-aos="fade-in" className="fixed bottom-4 right-4 bg-red-500 text-white px-4 font-semibold text-xl py-2 rounded-lg shadow-md transition-all duration-100 z-[9999] border border-white">
               Item is already in the cart!
              </div>
          )}
        <Category />
        <Category2 />
        <Services />
        <Banner data={BannerData} handleOrderPopup={handleOrderPopup}/>
        <Products handleOrderPopup={handleOrderPopup} handlecart={handlecart}/>
        <Banner data={BannerData2} handleOrderPopup={handleOrderPopup}/>
        <Blog />
        <Partners />
        <Footer />
        <Popup OrderPopup={OrderPopup} handleOrderPopup={handleOrderPopup}/>
        <Cart isCartOpen={isCartOpen} toggleCart={toggleCart} />
    </>
  )
}

export default App;
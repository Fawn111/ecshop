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
  return (
    <>
       <Navbar />
        <Hero />
        <Category />
        <Category2 />
        <Services />
        <Banner data={BannerData}/>
        <Products />
        <Banner data={BannerData2}/>
        <Blog />
        <Partners />
        <Footer />
    </>
  )
}

export default App;
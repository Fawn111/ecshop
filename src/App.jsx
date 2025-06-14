import React from 'react'
import Navbar from './components/NavBar/Navbar';
import Hero from './components/Hero/Hero';
import Category from './components/Category/Category';
import Category2 from './components/Category/Category2';
import Services from './components/Services/Services';
import Banner from './components/Banner/Banner';
import headphone from './assets/hero/headphone.png';

const BannerData = {
    discount: "30% OFF",
    title: "Fine Smile",
    date: "10 Jan to 28 Jan",
    image: headphone,
    title2: "Air Solo Bass",
    title3: "Winter Sale",
    title4: "Voluptate omnis aut at nobis voluptates vel quibusdam porro cupiditate hic ametvoluptatibus quos error?",
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
    </>
  )
}

export default App;
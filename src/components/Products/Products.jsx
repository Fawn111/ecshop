import React from 'react'
import Heading from '../Shared/Heading'
import ProductCard from './ProductCard'

import img1 from '../../assets/product/p-1.jpg'
import img2 from '../../assets/product/p-2.jpg'
import img3 from '../../assets/product/p-3.jpg'
import img4 from '../../assets/product/p-4.jpg'
import img5 from '../../assets/product/p-5.jpg'
import img6 from '../../assets/product/p-7.jpg'
import img7 from '../../assets/product/p-9.jpg'
import img8 from '../../assets/product/p-1.jpg'

const Productcards = [
    {
        id: 1,
        img: img1,
        title: "ZenSound Aura (Wireless Headphones)",
        price: 150,
        quantity: 1,
        aosDelay: "0",
    },
        {
        id: 2,
        img: img2,
        quantity: 1,
        title: "BassBlitz Pro - Wireless Earbuds",
        price: 300,
        aosDelay: "200",
    },
        {
        id: 3,
        img: img3,
        quantity: 1,
        title: "Goggles - VR Experience",
        price: 600,
        aosDelay: "400",
    },
        {
        id: 4,
        img: img4,
        title: "EchoPulse H900 - Bluetooth ",
        price: 450,
        quantity: 1,
        aosDelay: "600",
    },
]

const Productcards2 = [
        {
        id: 5,
        img: img5,
        title: "Printed - Maya Johns",
        quantity: 1,
        price: 350,
        aosDelay: "0",
    },
        {
        id: 6,
        img: img6,
        title: "Maya Johns - Printed",
        price: 250,
        quantity: 1,
        aosDelay: "200",
    },
        {
        id: 7,
        img: img7,
        title: "Designers Favourite - Printed",
        price: 4050,
        aosDelay: "400",
        quantity: 1,
    },
        {
        id: 8,
        img: img8,
        title: "Grifftys Special - Designer",
        price: 5000,
        quantity: 1,
        aosDelay: "600",
    },
]

const Products = ({ handlecart, handlewish, wish , cart}) => {
  return (
    <div>
        <div className='p-3 sm:p-6 m-4 overflow-x-hidden'>
            <Heading title="Our Products" subtitle="Explore Our Products"/>
            <ProductCard data={Productcards} handlecart={handlecart} handlewish={handlewish} wish={wish} cart={cart}/>
            <ProductCard data={Productcards2} handlecart={handlecart} handlewish={handlewish}wish={wish} cart={cart}/>
        </div>
    </div>
  )
}

export default Products;

import React from 'react'
import Heading from '../Shared/Heading'
import ProductCard from './ProductCard'

import img1 from '../../assets/product/1.png'
import img2 from '../../assets/product/2.png'
import img3 from '../../assets/product/3.png'
import img4 from '../../assets/product/4.png'
import img5 from '../../assets/product/Frame 32.png'
import img6 from '../../assets/product/Frame 33.png'
import img7 from '../../assets/product/Frame 34.png'
import img8 from '../../assets/product/Frame 38.png'

const Productcards = [
    {
        id: 1,
        img: img1,
        title: "T-Shirt With Tape Details",
        price: 1500,
        quantity: 1,
        aosDelay: "0",
    },
        {
        id: 2,
        img: img2,
        quantity: 1,
        title: "Skinny Jeans - Blue",
        price: 3000,
        aosDelay: "200",
    },
        {
        id: 3,
        img: img3,
        quantity: 1,
        title: "Checked Shirt",
        price: 6000,
        aosDelay: "400",
    },
        {
        id: 4,
        img: img4,
        title: "Slipped Tripped T-Shirt",
        price: 4500,
        quantity: 1,
        aosDelay: "600",
    },
]

const Productcards2 = [
        {
        id: 5,
        img: img5,
        title: "Vertical Striped Shirt",
        quantity: 1,
        price: 3500,
        aosDelay: "0",
    },
        {
        id: 6,
        img: img6,
        title: "Courage Graphic T-Shirt",
        price: 2540,
        quantity: 1,
        aosDelay: "200",
    },
        {
        id: 7,
        img: img7,
        title: "Lose Fit Bermuda Shorts",
        price: 4050,
        aosDelay: "400",
        quantity: 1,
    },
        {
        id: 8,
        img: img8,
        title: "Faded Skinny Jeans",
        price: 5000,
        quantity: 1,
        aosDelay: "600",
    },
]

const Products = ({ handlecart, handlewish, wish , cart}) => {
  return (
    <div className=''>
        <div className='p-3 sm:p-6 m-4 overflow-x-hidde'>
            <Heading title="NEW ARRIVALS"/>
            <ProductCard data={Productcards} handlecart={handlecart} handlewish={handlewish} wish={wish} cart={cart}/>
        </div>
         <div className='p-4 sm:p-6 m-4 overflow-x-hidde border-t-2 border-gray-100'>
            <Heading title="top selling"/>
            <ProductCard data={Productcards2} handlecart={handlecart} handlewish={handlewish}wish={wish} cart={cart}/>
        </div>
    </div>
  )
}

export default Products;

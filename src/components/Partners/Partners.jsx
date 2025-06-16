import React from 'react'
import brand1 from '../../assets/brand/br-1.png'
import brand2 from '../../assets/brand/br-2.png'
import brand3 from '../../assets/brand/br-3.png'
import brand4 from '../../assets/brand/br-4.png'
import brand5 from '../../assets/brand/br-5.png'

const Partners = () => {
  return (
    <div className='mt-10 bg-gray-200 hidden md:block overflow-hidden'>
        <div className='p-3 sm:p-6 m-4'>
            <div className='gap-3 grid md:grid-cols-5 place-items-center opacity-50'>
                <img src={brand1} alt="" className='w-[80px]'/>
                <img src={brand2} alt="" className='w-[80px]'/>
                <img src={brand3} alt="" className='w-[80px]'/>
                <img src={brand4} alt="" className='w-[80px]'/>
                <img src={brand5} alt="" className='w-[80px]'/>
            </div>
        </div>
    </div>
  )
}

export default Partners
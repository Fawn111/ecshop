import React from 'react'
import { IoMdClose } from "react-icons/io";

const Popup = ({OrderPopup, handleOrderPopup}) => {
  return (
    <>
    {
        OrderPopup && (
             <div>
        <div className='h-screen w-screen fixed top-0 bg-black/50 z-50 backdrop-blur-sm overflow-x-hidden'>
            <div className='top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md rounded-md duration-200 w-[300px] p-4 bg-white fixed'>
                <div className='flex flex-col space-y-3'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-xl font-semibold'>Order Now</h2>
                        <IoMdClose onClick={handleOrderPopup} className='cursor-pointer hover:text-primary text-xl'/>
                    </div>
                    <div className='space-y-4'>
                        <input type="text"  className='border border-sold w-full rounded-2xl border-gray-300 px-2 py-1' placeholder='Name'/>
                        <input type="text" className='border border-sold w-full rounded-2xl border-gray-300 px-2 py-1' placeholder='Email' />
                        <input type="text" className='border border-sold w-full rounded-2xl border-gray-300 px-2 py-1' placeholder='Address' />
                    </div>
                    <div className="text-center">
                        <button className="bg-primary text-white px-6 py-2 rounded-2xl font-semibold hover:bg-red-600 shadow-md">
                  Order Now
                </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        )
    }
    </>
  )
}

export default Popup
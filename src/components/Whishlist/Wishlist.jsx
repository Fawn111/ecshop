import React, { use, useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Wishlist = ({ isWishOpen, toggleWish, wish , setWish }) => {



    // const [total, setTotal] = useState();
    //remove
    const handleRemove = (id) => {
        const arr = wish.filter((item) => item.id !== id);
        setWish(arr);
    }


//    useEffect(() => {
//         handleprice();
//     }, [cart]);

  return (
    <div
      className={`fixed h-full w-full top-0 right-0 sm:w-[600px] bg-white shadow-lg z-50 transform transition-transform duration-300 overflow-hidden ${
        isWishOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-2xl text-center font-bold">Wishlist</h2>
        <IoMdClose
          onClick={toggleWish}
          className="text-2xl cursor-pointer hover:text-primary"
        />
      </div>

    <div className="p-6 space-y-4">
      {
            wish?.map((item) => (
            <>
            <div key={item.id} className="border-b pb-2 flex gap-4">
                <img src={item.img} className='h-[100px] w-[160px] object-cover rounded-md'/>
                <div className='ml-10 flex w-full justify-between '>
                    <div>
                    <p className="font-bold text-xl">" {item.title} "</p>
                    <p className="text-lg text-gray-500">${item.price}</p>
                    </div>
                    <div className="">
                         <button className=' text-3xl hover:text-primary cursor-pointer' onClick={() => handleRemove(item.id)}>
                            <MdDelete />
                        </button>
                    </div>
                </div>
            </div>
            </>
             ))
      }
      </div>
    </div>
  );
};

export default Wishlist;

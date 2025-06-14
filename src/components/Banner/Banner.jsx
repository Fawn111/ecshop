import React from 'react'

const Banner = ({ data }) => {
  return (
  <>
    <div className='min-h-[550px] flex justify-center items-center'>
        <div className="p-3 sm:p-6 m-4">
            <div className="grid grid-cols-1 pl-10 sm:pl-0 gap-5 sm:grid-cols-3 items-center text-white rounded-2xl bg-primary">
                <div className="p-6 sm:p-8">
                    <p className='text-sm'>{data.discount}</p>
                    <h2 className="text-7xl font-bold uppercase ">{data.title}</h2>
                    <p className='text-sm'>{data.date}</p>
               </div>
               <div>
                <img src={data.image} className="scale-125 drop-shadow-xl drop-shadow-black/40 w-[250px] sm:w-[340px] object-cover" />
               </div>
               <div className='flex flex-col justify-center p-3 gap-4'>
                <p className='font-bold text-xl'>{data.title2}</p>
                <p className='text-3xl sm:text-5xl font-bold'>{data.title3}</p>
                <p className='leading-5 tracking-wide text-sm'>{data.title4}</p>
                <div>
                    <button className='border border-solid p-3  transition-all duration-300 ease-in-out  hover:scale-105 
                  shadow-md hover:shadow-lg bg-white text-primary rounded-4xl'>Shop Now</button>
                </div>
               </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Banner;
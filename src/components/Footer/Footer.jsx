import React from 'react'
import Button from '../Shared/Button'

const Footer = () => {
  return (
    <div>
        <div className='p-3 sm:p-6 m-4'>
            <div className='md:grid-cols-3 grid pb-20 pt-5 gap'>
                <div>
                    <a href="#" className="text-primary tracking-widest font-semibold text-2xl sm:text-3xl uppercase">Eshop</a>
                    <p className='text-gray-500 pt-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores alias cme</p>
                    <p className='text-gray-500 mt-3'>Made with 💖 by The Coding Journey</p>
                    <Button className='mt-4'>Visit Our Youtube Channel</Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer
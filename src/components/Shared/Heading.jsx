import React from 'react'
import Button from './Button';

const Heading = ({ subtitle , title }) => {
  return (
    <div className='text-center space-y-3'>
        <h2 className='text-4xl font-bold'>{title}</h2>
        <p className='text-l text-gray-500'>{subtitle}</p>
        <Button text="Visit Our Youtube Channel"/>
    </div>
  )
}

export default Heading;
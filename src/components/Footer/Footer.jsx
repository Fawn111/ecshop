import React from 'react'
import Button from '../Shared/Button'
import { FaLocationArrow, FaMobileAlt, FaFacebook} from "react-icons/fa";
import { FaLinkedin, FaInstagram } from "react-icons/fa6";

const FooterLinks = [
  {
    title: "Home",
    link: "#",
  },
  {
    title: "About",
    link: "/#about",
  },
  {
    title: "Contact",
    link: "/#contact",
  },
  {
    title: "Blog",
    link: "/#blog",
  },
]

const Footer = () => {
  return (
    <div>
        <div className='p-3 sm:p-6 m-4 flex overflow-x-hidden'>
            <div className='md:grid-cols-4 grid-cols-1 grid pb-20 pt-5 gap-10'>
                <div>
                    <a href="#" className="text-primary tracking-widest font-semibold text-2xl sm:text-3xl uppercase">Eshop</a>
                    <p className='text-gray-500 pt-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores alias cme</p>
                    <p className='text-gray-500 mt-3'>Made with 💖 by The Coding Journey</p>
                    <Button className='mt-4'>Visit Our Youtube Channel</Button>
                </div>
                   <div className='ml-20'>
              <div>
                <h2 className='text-xl font-bold  pb-3 ml-2'>Important Links</h2>
              </div>
              <div>
                <ul>
                  {FooterLinks.map((data, index) => (
                    <li key={index} className='p-2 font-normal text-[16px] text-gray-500'>
                      <a href={data.link}>{data.title}</a>
                    </li>
                ))}
                </ul>
              </div>
            </div>
               <div>
              <div>
                <h2 className='text-xl font-bold  pb-3 ml-2'>Quick Links</h2>
              </div>
              <div>
                <ul>
                  {FooterLinks.map((data, index) => (
                    <li key={index} className='p-2 font-normal text-[16px] text-gray-500'>
                      <a href={data.link}>{data.title}</a>
                    </li>
                ))}
                </ul>
              </div>
            </div>
               <div className='space-y-5'>
              <div>
                <h2 className='text-xl font-bold  pb-3 ml-2'>Address</h2>
              </div>
              <div className='flex items-center gap-3'>
                <FaLocationArrow />
                <p>Islamabad, Pakistan</p>
              </div>
               <div className='flex items-center gap-3'>
                <FaMobileAlt />
                <p>+92 443131334</p>
              </div>
              <div className='flex  gap-4 text-3xl'>
                <FaInstagram />
                <FaFacebook />
                <FaLinkedin />
              </div>
            </div>
            </div>
         
        </div>
    </div>
  )
}

export default Footer
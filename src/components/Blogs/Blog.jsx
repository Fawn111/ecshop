import React from 'react'
import Heading from '../Shared/Heading'
import img1 from '../../assets/blogs/blog-1.jpg'
import img2 from '../../assets/blogs/blog-2.jpg'
import img3 from '../../assets/blogs/blog-3.jpg'

const blogs = [
  {
    id: 1,
    published: "Jan 20, 2024 by Dilshad",
    title: "Byte & Brew",
    subtitle: "Sip on coffee while diving into bite-sized tech insights, productivity tips, and startup stories for curious minds and caffeine lovers.",
    img: img1,
  },
  {
    id: 2,
    published: "Nov 17, 2024 by Shade",
    title: "Wander & Wonder",
    subtitle: "A storytelling blog for dreamers and doers who seek adventure in travel, culture, and the quiet moments that shape us.",
    img: img2,
  },
  {
    id: 3,
    published: "Dec 2, 2024 by Ali",
    title: "Mindful Minutes",
    subtitle: "Short reads for long-lasting calm. Mindful Minutes offers bite-sized reflections on mental health, mindfulness, and intentional living.",
    img: img3,
  },
]


const Blog = () => {
  return (
    <div>
        <div className='p-3 sm:p-6 m-4'>
            <Heading title="Our Blogs" subtitle="Explore Our Blogs"/>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-4 mt-10'>
                {blogs.map((data) => (
                    <div>
                        <div>
                            <img src={data.img} className="w-full h-[220px] object-cover rounded-2xl hover:scale-105 duration-500"/>
                        </div>
                        <div className='flex flex-col gap-2 mt-3'>
                            <p className='text-sm text-gray-600'>{data.published}</p>
                            <h2 className='text-[22px] font-bold'>{data.title}</h2>
                            <p>{data.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Blog
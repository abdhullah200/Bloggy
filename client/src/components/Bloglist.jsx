import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import { motion as Motion } from "motion/react"
import BlogCard from './BlogCard'


const Bloglist = () => {
    const [menu, setMenu]= useState("All");
    return (
        <div className='my-10'>
            <div className='flex flex-wrap justify-center gap-4 sm:gap-8 mb-10 relative'>
                {blogCategories.map((item) => (
                    <div key={item} className='relative'>
                        <button
                            onClick={() => setMenu(item)}
                            className={`cursor-pointer text-sm sm:text-base transition-colors duration-200 px-2 sm:px-3 py-1 rounded-full ${menu === item ? 'text-white bg-primary' : 'text-gray-500 hover:text-white hover:bg-primary/70'}`}
                        >
                            {item}
                            {/* Animated background underline */}
                            {menu === item && (
                                <Motion.div
                                    layoutId="underline"
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    className='absolute inset-0 rounded-full -z-10'
                                />
                            )}
                        </button>
                    </div>
                ))}
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-24'>
                {blog_data
                    .filter(blog => menu === 'All' || blog.category === menu)
                    .map(blog => <BlogCard key={blog._id} blog={blog} />)}
            </div>
        </div>


    )
}

export default Bloglist
import React, { useState } from 'react'
import { blogCategories } from '../assets/assets'
import { motion as Motion } from "motion/react"
import BlogCard from './BlogCard'
import { useAppContext } from '../context/AppContext'

const Bloglist = () => {
    const [menu, setMenu] = useState("All");
    const { blog, input, setInput } = useAppContext();

    // Filter blogs based on category and search input
    const filteredBlogs = blog.filter(blogItem => {
        const categoryMatch = menu === 'All' || blogItem.category === menu;
        const searchMatch = input === '' || 
            blogItem.title.toLowerCase().includes(input.toLowerCase()) ||
            blogItem.description.toLowerCase().includes(input.toLowerCase()) ||
            blogItem.category.toLowerCase().includes(input.toLowerCase());
        
        return categoryMatch && searchMatch;
    });

    return (
        <div className='my-10'>
            <div className='flex flex-wrap justify-center gap-4 sm:gap-8 mb-10 relative'>
                {blogCategories.map((item) => (
                    <div key={item} className='relative'>
                        <button
                            onClick={() => setMenu(item)}
                            className={`cursor-pointer text-sm sm:text-base transition-colors duration-200 px-2 sm:px-3 py-1 rounded-full ${
                                menu === item 
                                    ? 'text-white bg-purple-500' 
                                    : 'text-gray-500 dark:text-gray-400 hover:text-white hover:bg-purple-500/70'
                            }`}
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
            
            {/* Search results info */}
            {input && (
                <div className='text-center mb-6'>
                    <p className='text-gray-600 dark:text-gray-400'>
                        Showing {filteredBlogs.length} results for "{input}"
                        <button 
                            onClick={() => setInput('')}
                            className='ml-2 px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full text-sm transition-colors'
                        >
                            Clear
                        </button>
                    </p>
                </div>
            )}
            
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-24'>
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map(blogItem => <BlogCard key={blogItem._id} blog={blogItem} />)
                ) : (
                    <div className='col-span-full text-center text-gray-500 dark:text-gray-400'>
                        {input ? `No blogs found for "${input}"` : 'No blogs available'}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Bloglist
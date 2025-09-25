import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { setInput } = useAppContext();

    const handleSearch = (e) => {
        e.preventDefault();
        setInput(searchTerm);
    };

    return (
        <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
            <div className='text-center mt-20 mb-8'>
                <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-purple-500/40 bg-purple-500/10 rounded-full text-sm text-purple-400'>
                    <p>New: AI feature integrated</p>
                    <img src={assets.star_icon} alt='logo' className='w-2.5' />
                </div>
                <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-800 dark:text-gray-200'>
                    Your own <span className='text-purple-400'>blogging</span> <br/> platform.
                </h1>
                <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-600 dark:text-gray-400">This is your space to share your thoughts, ideas, and stories with the world. <br/>
                Whether you're a seasoned writer or just starting out, our platform provides the tools you need to
                create and manage your own blog with ease. <br/>
                From customizable themes to built-in SEO features, we've got you covered. <br/>
                </p>
                <form onSubmit={handleSearch} className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-400 dark:border-gray-600 rounded overflow-hidden bg-white dark:bg-gray-800'>
                    <input 
                        type='text' 
                        placeholder='Search for blogs' 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='w-full pl-4 outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-600 dark:placeholder-gray-400'
                    />
                    <button type='submit' className='bg-purple-500 text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer'>Search</button>
                </form>
            </div>
            <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50' />
        </div>
    )
}

export default Header
import React from 'react'

const Newsletter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
        <h1 className='md:text-4xl text-2xl font-semibold text-gray-900 dark:text-gray-100'>Never Miss a Blog!</h1>
        <p className='md:text-lg text-gray-500/70 dark:text-gray-400/70 pb-8'>Subscribe to our newsletter to stay updated on the latest posts.</p>
        <form className='flex items-center justify-between max-w-2xl w-full md:h-13 h-12'>
            <input className='border border-gray-300 dark:border-gray-600 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500 dark:text-gray-300 bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500'
            type="text" placeholder='Enter your email id' required />
            <button type='submit' className='md:px-12 px-8 h-full text-white bg-purple-500 hover:bg-purple-600 transition-all cursor-pointer rounded-md rounded-l-none'>Subscribe</button>
        </form>
    </div>
  )
}

export default Newsletter
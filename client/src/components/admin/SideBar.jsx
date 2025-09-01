import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const SideBar = () => {
  return (

        <div className='flex flex-col border-r border-gray-200 min-h-full pt-6'>
            <NavLink end={true} to="/admin" className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:min-px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary" }`}>
                <img src={assets.home_icon} alt="Dashboard" className='min-w-4 w-5' />
                <p className='hidden md:inline-block font-medium'>Dashboard</p>
            </NavLink>

            <NavLink to="/admin/addBlog" className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:min-px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary" }`}>
                <img src={assets.add_icon} alt="Posts" className='min-w-4 w-5' />
                <p className='hidden md:inline-block font-medium'>Add Blog</p>
            </NavLink>

            <NavLink to="/admin/listBlog" className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:min-px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary" }`}>
                <img src={assets.list_icon} alt="Comments" className='min-w-4 w-5' />
                <p className='hidden md:inline-block font-medium'>List Blog</p>
            </NavLink>

            <NavLink to="/admin/comment" className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:min-px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary" }`}>
                <img src={assets.comment_icon} alt="Users" className='min-w-4 w-5' />
                <p className='hidden md:inline-block font-medium'>Comments</p>
            </NavLink>

        </div>
  
  )
}

export default SideBar
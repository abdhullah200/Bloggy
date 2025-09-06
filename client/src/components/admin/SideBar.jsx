import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
        <NavLink to="/admin" className={({isActive}) => `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-700'}`}>
            <span className="text-xl">🏠</span>
            <p className='hidden md:inline-block'>Dashboard</p>
        </NavLink>
        
        <NavLink to="/admin/addBlog" className={({isActive}) => `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 mt-2 ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-700'}`}>
            <span className="text-xl">✏️</span>
            <p className='hidden md:inline-block'>Add Blog</p>
        </NavLink>
        
        <NavLink to="/admin/listBlog" className={({isActive}) => `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 mt-2 ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-700'}`}>
            <span className="text-xl">📋</span>
            <p className='hidden md:inline-block'>List Blogs</p>
        </NavLink>
        
        <NavLink to="/admin/comments" className={({isActive}) => `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 mt-2 ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-700'}`}>
            <span className="text-xl">💬</span>
            <p className='hidden md:inline-block'>Comments</p>
        </NavLink>
    </div>
  )
}

export default SideBar
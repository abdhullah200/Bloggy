import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className="w-64 border-r border-gray-700 p-4" style={{backgroundColor: 'rgb(20, 20, 20)'}}>
        <NavLink to="/admin" className={({isActive}) => `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 ${isActive ? 'bg-purple-500/20 text-purple-400' : 'text-gray-300'}`}>
            <span className="text-xl">🏠</span>
            <p className='hidden md:inline-block'>Dashboard</p>
        </NavLink>
        
        <NavLink to="/admin/addBlog" className={({isActive}) => `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 mt-2 ${isActive ? 'bg-purple-500/20 text-purple-400' : 'text-gray-300'}`}>
            <span className="text-xl">✏️</span>
            <p className='hidden md:inline-block'>Add Blog</p>
        </NavLink>
        
        <NavLink to="/admin/listBlog" className={({isActive}) => `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 mt-2 ${isActive ? 'bg-purple-500/20 text-purple-400' : 'text-gray-300'}`}>
            <span className="text-xl">📋</span>
            <p className='hidden md:inline-block'>List Blogs</p>
        </NavLink>
        
        <NavLink to="/admin/comments" className={({isActive}) => `flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 mt-2 ${isActive ? 'bg-purple-500/20 text-purple-400' : 'text-gray-300'}`}>
            <span className="text-xl">💬</span>
            <p className='hidden md:inline-block'>Comments</p>
        </NavLink>
    </div>
  )
}

export default SideBar
import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from "../../assets/assets"; 

const SideBar = () => {
  return (
    <div className="w-80 bg-gray-50 border-r border-gray-200 p-4">
        <NavLink to="/admin" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
            {/* Using a simple home emoji as placeholder until you add the actual icon */}
            <span className="text-xl">🏠</span>
            <p className='hidden md:inline-block'>Dashboard</p>
        </NavLink>
        
        <NavLink to="/admin/addBlog" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 mt-2">
            <span className="text-xl">✏️</span>
            <p className='hidden md:inline-block'>Add Blog</p>
        </NavLink>
        
        <NavLink to="/admin/listBlog" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 mt-2">
            <span className="text-xl">📋</span>
            <p className='hidden md:inline-block'>List Blogs</p>
        </NavLink>
        
        <NavLink to="/admin/comments" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 mt-2">
            <span className="text-xl">💬</span>
            <p className='hidden md:inline-block'>Comments</p>
        </NavLink>
    </div>
  )
}

export default SideBar
import React, { useEffect, useState } from 'react'
import { blog_data } from '../../assets/assets';

const ListBlog = () => {

    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async() => {
        setBlogs(blog_data)
    }

    const deleteBlog = async(mongoId) => {
        // Delete blog logic here
        console.log('Delete blog:', mongoId);
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
        <h1 className='text-2xl font-bold text-gray-800 mb-6'>All blogs</h1>
        <div>
            <div className='relative h-4/5 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
            <table className='w-full text-sm text-gray-500'>
                <thead className='text-xs text-gray-600 text-left uppercase bg-gray-50'>
                <tr>
                    <th scope='col' className='px-6 py-4 text-center'> # </th>
                    <th scope='col' className='px-6 py-4'> Blog Title </th>
                    <th scope='col' className='px-6 py-4 max-sm:hidden'>Date</th>
                    <th scope='col' className='px-6 py-4 max-sm:hidden text-center'> Status </th>
                    <th scope='col' className='px-6 py-4 text-center'> Action </th>
                </tr>
                </thead>
                <tbody>
                {blogs.map((blog, index) => (
                    <tr key={blog._id} className='border-b border-gray-200 hover:bg-gray-50'>
                        <td className='px-6 py-4 text-center font-medium text-gray-900'>{index + 1}</td>
                        <td className='px-6 py-4 font-medium text-gray-900'>{blog.title}</td>
                        <td className='px-6 py-4 max-sm:hidden text-gray-500'>
                            {new Date(blog.createdAt).toLocaleDateString()}
                        </td>
                        <td className='px-6 py-4 max-sm:hidden text-center'>
                            <span className='px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full'>
                                Published
                            </span>
                        </td>
                        <td className='px-6 py-4 text-center'>
                            <button 
                                onClick={() => deleteBlog(blog._id)}
                                className='px-3 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded hover:bg-red-200 transition-colors'
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>

    </div>
  )
}

export default ListBlog
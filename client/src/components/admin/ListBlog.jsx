import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import toast, { Toaster } from 'react-hot-toast';

const ListBlog = () => {

    const { axios, blog, fetchBlogs } = useAppContext();
    const [loading, setLoading] = useState(false);

    const deleteBlog = async(blogId) => {
        if (!blogId) {
            toast.error("Blog ID is required");
            return;
        }

        if (!confirm("Are you sure you want to delete this blog?")) {
            return;
        }

        try {
            setLoading(true);
            console.log("Deleting blog with ID:", blogId);
            
            const response = await axios.post('/api/blog/delete', { id: blogId });
            
            if (response.data.success) {
                toast.success("Blog deleted successfully!");
                
                // Refresh the blogs list to update both admin page and home page
                await fetchBlogs();
            } else {
                toast.error(response.data.message || "Failed to delete blog");
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
            toast.error("Failed to delete blog. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    // Use blogs from global context (same as home page)
    const blogs = blog || [];

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-gradient-to-br from-purple-50 to-indigo-100'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6'>All blogs</h1>
        <div>
            <div className='relative h-4/5 max-w-4xl overflow-x-auto shadow-lg rounded-lg scrollbar-hide bg-white dark:bg-gray-800 border dark:border-gray-700'>
            <table className='w-full text-sm text-gray-600 dark:text-gray-300'>
                <thead className='text-xs text-gray-700 dark:text-gray-400 text-left uppercase bg-gray-100 dark:bg-gray-700'>
                <tr>
                    <th scope='col' className='px-6 py-4 text-center'> # </th>
                    <th scope='col' className='px-6 py-4'> Blog Title </th>
                    <th scope='col' className='px-6 py-4 max-sm:hidden'>Date</th>
                    <th scope='col' className='px-6 py-4 max-sm:hidden text-center'> Status </th>
                    <th scope='col' className='px-6 py-4 text-center'> Action </th>
                </tr>
                </thead>
                <tbody>
                {blogs.length > 0 ? (
                    blogs.map((blog, index) => (
                        <tr key={blog._id || blog.title} className='border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'>
                            <td className='px-6 py-4 text-center font-medium text-gray-900 dark:text-gray-100'>{index + 1}</td>
                            <td className='px-6 py-4 font-medium text-gray-900 dark:text-gray-100'>{blog.title}</td>
                            <td className='px-6 py-4 max-sm:hidden text-gray-600 dark:text-gray-400'>
                                {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className='px-6 py-4 max-sm:hidden text-center'>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                    blog._id && blog._id.length === 24 
                                        ? 'text-green-800 dark:text-green-300 bg-green-100 dark:bg-green-900/30' 
                                        : 'text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30'
                                }`}>
                                    {blog._id && blog._id.length === 24 ? 'Published' : 'Sample'}
                                </span>
                            </td>
                            <td className='px-6 py-4 text-center'>
                                {blog._id && blog._id.length === 24 ? (
                                    <button 
                                        onClick={() => deleteBlog(blog._id)}
                                        disabled={loading}
                                        className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                                            loading 
                                                ? 'text-gray-500 bg-gray-200 cursor-not-allowed' 
                                                : 'text-red-800 bg-red-100 hover:bg-red-200'
                                        }`}
                                    >
                                        {loading ? 'Deleting...' : 'Delete'}
                                    </button>
                                ) : (
                                    <span className='px-3 py-1 text-xs text-gray-500 bg-gray-100 rounded cursor-not-allowed'>
                                        Sample Blog
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" className='px-6 py-8 text-center text-gray-600 dark:text-gray-400'>
                            No blogs found. <a href="/admin/addBlog" className='text-purple-500 hover:underline'>Create your first blog</a>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
        </div>
        <Toaster position="top-right" />
    </div>
  )
}

export default ListBlog
import React from 'react'
import { assets } from '../../assets/assets'

const BlogTableItem = ({ blog, index, fetchBlogs }) => {
  const { title, createdAt, _id } = blog

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleDelete = async () => {
    // Add delete functionality here
    console.log('Delete blog:', _id)
    // After successful deletion, call fetchBlogs() to refresh the list
  }

  const handleEdit = () => {
    // Add edit functionality here
    console.log('Edit blog:', _id)
  }

  return (
    <tr className='border-b hover:bg-gray-50'>
      <td className='px-6 py-4 text-center font-medium text-gray-900'>
        {index}
      </td>
      <td className='px-6 py-4'>
        <div className='max-w-xs'>
          <p className='font-medium text-gray-900 truncate'>{title}</p>
        </div>
      </td>
      <td className='px-6 py-4 max-sm:hidden text-gray-600'>
        {formatDate(createdAt)}
      </td>
      <td className='px-6 py-4 max-sm:hidden text-center'>
        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
          Published
        </span>
      </td>
      <td className='px-6 py-4 text-center'>
        <div className='flex items-center justify-center gap-2'>
          <button 
            onClick={handleEdit}
            className='text-blue-600 hover:text-blue-900 cursor-pointer'
            title='Edit'
          >
            ✏️
          </button>
          <button 
            onClick={handleDelete}
            className='text-red-600 hover:text-red-900 cursor-pointer ml-2'
            title='Delete'
          >
            🗑️
          </button>
        </div>
      </td>
    </tr>
  )
}

export default BlogTableItem
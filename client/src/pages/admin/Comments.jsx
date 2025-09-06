import React, { useEffect, useState } from 'react'
import { comments_data } from '../../assets/assets'

const Comments = () => {
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('Not Approved')

  const fetchComments = async() => {
    setComments(comments_data)
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <div className='flex justify-between items-center max-w-4xl mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>Comments</h1>
        <div className='flex gap-4'>
          <button 
            onClick={() => setFilter('Approved')} 
            className={`shadow-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === 'Approved' ? 'text-primary bg-primary/10 border-primary' : 'text-gray-700 hover:border-primary/50'}`}
          >
            Approved
          </button>
          <button 
            onClick={() => setFilter('Not Approved')} 
            className={`shadow-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${filter === 'Not Approved' ? 'text-primary bg-primary/10 border-primary' : 'text-gray-700 hover:border-primary/50'}`}
          >
            Not Approved
          </button>
        </div>
      </div>
      
      <div className='relative max-w-4xl overflow-x-auto bg-white shadow rounded-lg scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-700 text-left uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3 text-center'> # </th>
              <th scope='col' className='px-6 py-3'> Blog Title and Comments </th>
              <th scope='col' className='px-6 py-3 max-sm:hidden'> Date </th>
              <th scope='col' className='px-6 py-3 max-sm:hidden text-center'> Action </th>
            </tr>
          </thead>
          <tbody>
            {comments.filter((comment) => {
              if (filter === 'Approved')
                return comment.isApproved === true;
              return comment.isApproved === false;
            }).map((comment, index) => (
              <tr key={comment._id || index} className='border-b border-gray-200 hover:bg-gray-50'>
                <td className='px-6 py-4 text-center font-medium text-gray-900'>{index + 1}</td>
                <td className='px-6 py-4'>
                  <div className='flex flex-col'>
                    <span className='font-medium text-gray-900 mb-1'>Sample Blog Title</span>
                    <div className='text-sm text-gray-600'>
                      <span className='font-medium'>{comment.name}:</span> {comment.content}
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 max-sm:hidden text-gray-500 text-sm'>
                  {new Date(comment.createdAt).toLocaleDateString('en-US', {
                    month: 'numeric',
                    day: 'numeric', 
                    year: 'numeric'
                  })}
                </td>
                <td className='px-6 py-4 max-sm:hidden text-center'>
                  <div className='flex items-center justify-center gap-2'>
                    <button 
                      onClick={() => {
                        const updatedComments = comments.map(c => 
                          c === comment ? { ...c, isApproved: !c.isApproved } : c
                        );
                        setComments(updatedComments);
                      }}
                      className={`p-2 rounded-full transition-colors ${
                        comment.isApproved 
                          ? 'text-green-600 hover:bg-green-100' 
                          : 'text-green-600 hover:bg-green-100'
                      }`}
                      title={comment.isApproved ? 'Approved' : 'Approve'}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button 
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                      title="Delete"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>        
    </div>
  )
}

export default Comments
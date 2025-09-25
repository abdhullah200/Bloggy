import React, { useEffect, useState } from 'react'
import { dashboard_data } from '../../assets/assets' 
import BlogTableItem from './BlogTableItem'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  })

  const fetchDashboardData = async() => {
    setDashboardData(dashboard_data)
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return (
    <div className='flex-1 p-4 md:p-10 bg-gradient-to-br from-purple-50 to-indigo-100'>
      <div className='flex flex-wrap gap-5'>
        {/* Blogs Card */}
        <div className='flex items-center gap-4 bg-white p-6 min-w-80 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-all border border-purple-100 hover:border-purple-300'>
          <div className='w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg'>
            <span className='text-2xl'>📝</span>
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-800'>{dashboardData.blogs}</p>
            <p className='text-purple-600 font-medium'>Blogs</p>
          </div>
        </div>

        {/* Comments Card */}
        <div className='flex items-center gap-4 bg-white p-6 min-w-80 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-all border border-purple-100 hover:border-purple-300'>
          <div className='w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg'>
            <span className='text-2xl'>💬</span>
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-800'>{dashboardData.comments}</p>
            <p className='text-purple-600 font-medium'>Comments</p>
          </div>
        </div>

        {/* Drafts Card */}
        <div className='flex items-center gap-4 bg-white p-6 min-w-80 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-all border border-purple-100 hover:border-purple-300'>
          <div className='w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg'>
            <span className='text-2xl'>📄</span>
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-800'>{dashboardData.drafts}</p>
            <p className='text-purple-600 font-medium'>Drafts</p>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='flex items-center gap-3 m-4 mt-6 text-purple-600'>
          <div className='w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center'>
            <span className='text-purple-500'>📝</span>
          </div>
          <p className='text-lg font-semibold'>Latest Blogs</p>
        </div>
        <div className='relative max-w-4xl overflow-x-auto shadow-lg rounded-lg scrollbar-hide bg-white border border-purple-100'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs text-gray-700 text-left uppercase bg-purple-50'>
              <tr>
                <th scope='col' className='px-6 py-4 text-center text-purple-600'> # </th>
                <th scope='col' className='px-6 py-4 text-purple-600'> Blog Title </th>
                <th scope='col' className='px-6 py-4 max-sm:hidden text-purple-600'>Date</th>
                <th scope='col' className='px-6 py-4 max-sm:hidden text-center text-purple-600'> Status </th>
                <th scope='col' className='px-6 py-4 text-center text-purple-600'> Action </th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) =>{
                  return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboardData} index={index+1}/>
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
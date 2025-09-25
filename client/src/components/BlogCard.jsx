import React from 'react'   
import { useNavigate } from 'react-router-dom';

const BlogCard = ({blog}) => {
    const {title, description,category, image, _id} = blog;
    const navigate = useNavigate();

  return (
  <div onClick={()=>navigate(`/blog/${_id}`)} className='w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 dark:hover:shadow-green-500/25 duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-green-500/50 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm'>
        <img src={image} alt="" className='aspect-video' />
        <span className='ml-5 mt-4 py-1 inline-block bg-purple-500/20 rounded-full text-purple-400 text-xs'>{category}</span>
        <div className='p-5'>
            <h5 className='mb-2 front-medium text-gray-900 dark:text-gray-100'>{title}</h5>
            <p className='mb-3 text-xs text-gray-600 dark:text-gray-400' dangerouslySetInnerHTML={{"__html":description.slice(0,80)}}></p>
        </div>
    </div>
  )
}

export default BlogCard
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom';
import { assets, blog_data } from '../assets/assets';
import Navbar from '../components/Navbar';
import Moment from 'moment';
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';

const Blog = () => {
  const {id} = useParams();
  const { axios } = useAppContext();

  const [data,setData] = useState(null)
  const [comments,setComments] = useState([])
  const [name,setName] = useState('')
  const [content,setContent] = useState('')
  const [loading, setLoading] = useState(false)

  // Static comments for fallback when database is empty
  const staticComments = useMemo(() => [
    {
      _id: "1",
      name: "John Doe",
      content: "Great article! Really helpful insights.",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      isApproved: true
    },
    {
      _id: "2", 
      name: "Sarah Smith",
      content: "Thanks for sharing this. I learned a lot from your perspective.",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      isApproved: true
    },
    {
      _id: "3",
      name: "Mike Johnson", 
      content: "This is exactly what I was looking for. Very well written!",
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
      isApproved: true
    }
  ], []);

  const fetchBlogData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/blog/${id}`);
      if (response.data.success) {
        setData(response.data.blog);
      } else {
        // API didn't find blog, try static data
        const staticBlog = blog_data.find(blog => blog._id === id);
        if (staticBlog) {
          setData(staticBlog);
        } else {
          toast.error("Blog not found");
        }
      }
    } catch {
      // Fallback to static data if API fails
      const staticBlog = blog_data.find(blog => blog._id === id);
      if (staticBlog) {
        setData(staticBlog);
      } else {
        toast.error("Failed to load blog");
      }
    }
  }, [id, axios]);

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(`/api/blog/${id}/comments`);
      if (response.data.success && response.data.comments.length > 0) {
        setComments(response.data.comments);
      } else {
        // No comments from API, use static comments for demo
        setComments(staticComments);
      }
    } catch {
      // Fallback to static comments if API fails
      setComments(staticComments);
    }
  }, [id, axios, staticComments]);

  const addComment = async(e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setLoading(true);
    
    // For demo purposes, always add comment locally first
    const newComment = {
      _id: Date.now().toString(),
      name: name.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
      isApproved: true
    };
    
    // Add comment to local state immediately
    setComments(prev => [newComment, ...prev]);
    setName('');
    setContent('');
    
    try {
      // Try to submit to backend (will work when database has real blogs)
      const response = await axios.post('/api/blog/add-comment', {
        blogId: id,
        name: newComment.name,
        content: newComment.content
      });
      
      if (response.data.success) {
        toast.success("Comment submitted and saved!");
      } else {
        // Backend failed but comment is already showing
        toast.success("Comment added! (Database currently using demo data)");
      }
    } catch {
      // API failed but comment is already showing locally
      toast.success("Comment added! (Working in demo mode)");
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    if (id) {
      fetchBlogData()
      fetchComments()
    }
  },[id, fetchBlogData, fetchComments])

  return data ?(
    <div className='relative'>
      <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50'/>
      <Navbar/>
      <div className='text-center mt-20 text-gray-600'>
        <p className='text-purple-500 py-4 font-medium'>Published on: {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
        <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subtitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-purple-500/35 bg-purple-500/5 font-medium text-purple-500'>Abu Ariff</p>
      </div>

      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        <img src={data.image} alt="" className='rounded-3xl mb-5'/>

        <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{__html: data.description}}></div>

        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>Comments ({comments.length})</p>
          <div className='flex flex-col gap-4'>
            {comments.map((item,index)=>(
              <div key={index} className='relative bg-purple-500/2 border border-purple-500/5 max-w-xl p-4 rounded text-gray-600'>
                <div className='flex items-center gap-2 mb-2'>
                  <img src={assets.user_icon} alt="" className='w-6'/>
                  <p className='font-medium'>{item.name}</p>
                </div>
                <p className='text-sm max-w-md ml-8'>{item.content}</p>
                <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>{Moment(item.createdAt).fromNow()}</div>
              </div>
            ))}

          </div>

        </div>
          {/* Add comment Section*/}
          <div className='max-w-3xl mx-auto'>
            <p className='font-semibold mb-4'>Add your comment</p>
            <form onSubmit={addComment} className='flex flex-col item-start gap-4 max-w-lg'>
              <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Name' required className='w-full p-2 border border-gray-300 rounded outline-none'/>
              <textarea onChange={(e)=>setContent(e.target.value)} value={content} placeholder='Comment' className='w-full p-2 border border-gray-300 rounded outline-none h-48' required></textarea>
              <button 
                type='submit' 
                disabled={loading}
                className='bg-purple-500 text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
          <div className='my-24 max-w-3xl mx-auto'>
            {/* Social media links */}
            <p className='font-semibold my-4'>Share this post</p>
            <div className='flex'>
              <img src={assets.facebook_icon} alt="" width={50}/>
              <img src={assets.twitter_icon} alt="" width={50} />
              <img src={assets.googleplus_icon} alt="" width={50} />
            </div>
          </div>
      </div>
      <Footer />


    </div>
  ) : <Loader />
}

export default Blog
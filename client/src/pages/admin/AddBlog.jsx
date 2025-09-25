import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';
import toast, { Toaster } from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';

const AddBlog = () => {

  const { axios, fetchBlogs } = useAppContext();
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  
  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [SubTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState('Startup');
  const [isPublic, setIsPublic] = useState(true); // Default to true so blogs appear on home page
  const [loading, setLoading] = useState(false);

  const generateContent = async () => {
    console.log("Generate content called");
    
    if (!title.trim()) {
      console.log("No title provided");
      toast.error("Please enter a blog title first");
      return;
    }
    
    try {
      console.log("Starting AI generation...");
      toast.loading("Generating AI content...", { id: 'ai-generation' });
      
      const prompt = `Write a comprehensive and engaging blog post about "${title.trim()}". ${SubTitle.trim() ? `The subtitle is: "${SubTitle.trim()}". ` : ''}Please make it informative, well-structured, and around 500-800 words. Include an introduction, main content with multiple paragraphs, and a conclusion. Use HTML formatting with headings, paragraphs, and lists where appropriate.`;
      
      const API_KEY = "ADD YOUR API KEY HERE";
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("AI Response:", data);
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
        let generatedContent = data.candidates[0].content.parts[0].text;
        
        // Convert markdown-style formatting to HTML
        generatedContent = generatedContent
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/^### (.*$)/gim, '<h3>$1</h3>')
          .replace(/^## (.*$)/gim, '<h2>$1</h2>')
          .replace(/^# (.*$)/gim, '<h1>$1</h1>')
          .replace(/\n\n/g, '</p><p>')
          .replace(/\n- /g, '<br>• ')
          .replace(/^\d+\. /gm, '<br>1. ');
        
        // Wrap in paragraphs if not already wrapped
        if (!generatedContent.includes('<p>')) {
          generatedContent = '<p>' + generatedContent.replace(/\n/g, '</p><p>') + '</p>';
        }
        
        // Clean up any empty paragraphs
        generatedContent = generatedContent.replace(/<p><\/p>/g, '');
        
        if (quillRef.current) {
          quillRef.current.root.innerHTML = generatedContent;
          toast.success("AI content generated successfully!", { id: 'ai-generation' });
        }
      } else {
        console.error("Invalid response structure:", data);
        throw new Error("Invalid response from AI service");
      }
    } catch (error) {
      console.error("AI generation error:", error);
      toast.error("Failed to generate AI content: " + error.message, { id: 'ai-generation' });
    }
  }

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    
    if (!image) {
      toast.error("Please select an image");
      return;
    }
    
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    
    if (!quillRef.current) {
      toast.error("Editor not initialized");
      return;
    }
    
    const description = quillRef.current.root.innerHTML;
    if (!description || description.trim() === '<p><br></p>') {
      toast.error("Please write blog content");
      return;
    }
    
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', title.trim());
      formData.append('subTitle', SubTitle.trim());
      formData.append('description', description);
      formData.append('category', category);
      formData.append('isPublic', isPublic);
      
      console.log("Submitting blog with data:", {
        title: title.trim(),
        subTitle: SubTitle.trim(),
        category,
        isPublic,
        hasImage: !!image,
        descriptionLength: description.length
      });
      
      const response = await axios.post('/api/blog/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log("Server response:", response.data);
      
      if (response.data.success) {
        toast.success("Blog added successfully!");
        
        // Refresh the blogs list to show the new blog on home page
        fetchBlogs();
        
        // Optional: Navigate to home page to see the new blog
        // navigation('/');
        
        // Reset form
        setImage(false);
        setTitle("");
        setSubTitle("");
        setCategory('Startup');
        setIsPublic(true); // Keep default as true
        quillRef.current.root.innerHTML = '';
      } else {
        toast.error(response.data.message || "Failed to add blog");
      }
    } catch (error) {
      console.error("Error adding blog:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        toast.error(error.response.data.message || "Failed to add blog");
      } else {
        toast.error("Failed to add blog. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    if (!quillRef.current && editorRef.current){
      quillRef.current= new Quill(editorRef.current, {theme:'snow'})
    }
  },[])

  return (
    <>
      <form onSubmit={onSubmitHandler} className='flex-1 bg-gradient-to-br from-purple-50 to-indigo-100 text-gray-800 dark:text-gray-200 h-full overflow-scroll'>
      <div className='bg-white dark:bg-gray-800 w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow-lg dark:shadow-gray-900/50 rounded border dark:border-gray-700'>

        <p className='text-gray-800 dark:text-gray-200 font-medium'>Upload Thumbnail</p>
        <label htmlFor="image">
          <img src={!image ? assets.upload_area: URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer border dark:border-gray-600'/>
          <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required/>
        </label>

        <p className='mt-4 text-gray-800 dark:text-gray-200 font-medium'>Blog Title</p>
        <input type='text' placeholder='Type here' required className='w-full max-w-lg mt-2 p-3 border border-gray-300 dark:border-gray-600 outline-none rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-primary dark:focus:border-green-400'
         onChange={e=>setTitle(e.target.value)} value={title}/>
        
          <p className='mt-4 text-gray-800 dark:text-gray-200 font-medium'>Sub Title</p>
        <input type='text' placeholder='Type here' required className='w-full max-w-lg mt-2 p-3 border border-gray-300 dark:border-gray-600 outline-none rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-primary dark:focus:border-green-400'
         onChange={e=>setSubTitle(e.target.value)} value={SubTitle}/>

        <p className='mt-4 text-gray-800 dark:text-gray-200 font-medium'>Blog Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative border dark:border-gray-600 rounded'>
          <div ref={editorRef} className='bg-white dark:bg-gray-700'>

          </div>
          <button type='button' onClick={generateContent} className='absolute bottom-1 right-2 text-white bg-purple-500 hover:bg-purple-600 px-4 py-1.5 rounded transition-all cursor-pointer'>Generate with AI</button>
          
        </div>
        <p className='mt-4 text-gray-800 dark:text-gray-200 font-medium'>Category</p>
        <select onChange={e=> setCategory(e.target.value)} name='category' className='p-3 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'>
          <option value="">Select category</option>
          {blogCategories.map((item,index)=>{
            return <option value={item} key={index}>{item}</option>
          })}
        </select>

        <div className='flex gap-2 mt-4 items-center'>
          <p className='text-gray-800 dark:text-gray-200 font-medium'>Publish Now</p>
          <input type='checkbox' checked={isPublic} className='scale-125 cursor-pointer accent-purple-500' onChange={e=> setIsPublic(e.target.checked)}/>
        </div>

        <button 
          type='submit' 
          disabled={loading}
          className='mt-8 w-40 h-10 bg-purple-500 text-white rounded cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-600 transition-all'
        >
          {loading ? 'Adding...' : 'Add Blog'}
        </button>
      </div>
        
    </form>
    <Toaster position="top-right" />
    </>
  )
}

export default AddBlog
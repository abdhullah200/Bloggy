import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const { loginUser } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const success = await loginUser(email, password);
    if (success) {
      navigate('/admin');
    }
  }
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-md p-6 max-md:m-6 border border-primary/30 dark:border-green-500/30 shadow-xl shadow-primary/15 dark:shadow-green-500/15 rounded-lg bg-white dark:bg-gray-800'>
        <div className='flex flex-col items-center justify-center'>
            <div className='w-full py-6 text-center'>
              <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'><span className='text-purple-500'>Admin</span> Login</h1>
              <p className='front-light text-gray-700 dark:text-gray-400'>Enter your credentials to access the admin panel</p>
            </div>
            <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-700 dark:text-gray-300'>
              <div className='flex flex-col '>
                <label className='text-gray-800 dark:text-gray-300 mb-2'>Email</label>
                <input onChange={e=>setEmail(e.target.value)} value={email}
                 type="email" required placeholder='your email id' className='border-b-2 border-gray-400 dark:border-gray-600 p-2 outline-none mb-6 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-600 dark:placeholder-gray-400 focus:border-primary dark:focus:border-green-400'/>
              </div>
              <div className='flex flex-col '>
                <label className='text-gray-800 dark:text-gray-300 mb-2'>Password</label>
                <input onChange={e=>setPassword(e.target.value)} value={password}
                 type="password" placeholder='your password' required className='border-b-2 border-gray-400 dark:border-gray-600 p-2 outline-none mb-6 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-600 dark:placeholder-gray-400 focus:border-primary dark:focus:border-green-400'/>
              </div>
              <button type='submit' className='w-full py-3 font-medium bg-purple-500 text-white rounded cursor-pointer hover:bg-purple-600 transition-all'>Login</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login
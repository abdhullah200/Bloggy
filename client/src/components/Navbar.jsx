import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {
    const navigate = useNavigate();
    const { token, logoutUser } = useAppContext();

    const handleAuthClick = () => {
        if (token) {
            logoutUser();
        } else {
            navigate('/admin');
        }
    };

  return (
    <div className='flex justify-between items-center p-5 mx-8 sm:mx-20 xl:mx-32 cursor-pointer bg-transparent'>
        <img onClick={()=>navigate('/')} src={assets.logo} alt='logo' className='w-32 sm:w-44' />
        <div className='flex items-center gap-4'>
            <button onClick={handleAuthClick} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-purple-500 text-white px-10 py-2.5 hover:bg-purple-600 transition-all'>
                {token ? "Logout" : "Login"}
                <img src={assets.arrow} alt='arrow' className='w-3' />
            </button>
        </div>
    </div>
  )
}

export default Navbar
import React from 'react'
import Navbar from '../components/Navbar'
import Headers from '../components/Header'
import Bloglist from '../components/Bloglist'
import Newsletter from '../components/Newsletter'
import { Footer } from '../components/footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <Headers/>
      <Bloglist />
      <Newsletter />
      <Footer />
    </>
  )
}

export default Home
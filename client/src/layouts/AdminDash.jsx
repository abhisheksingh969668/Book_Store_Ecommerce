import React from 'react'
import Layout from '../components/Layout'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminDash = () => {
  const user = useSelector(state => state.user)
  return (
    <section>
      <div className=' min-h-screen flex'>
      <div className='w-56'><Layout/></div>
      <div className=' flex-1 p-4'><Outlet/></div>
      </div>
      
    </section>
  )
}

export default AdminDash

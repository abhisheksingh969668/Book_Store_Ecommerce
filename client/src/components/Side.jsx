import React from 'react'

import { LuBox, LuUser, LuMessageSquare, LuCalendar  } from "react-icons/lu";
import { FaSuitcase } from "react-icons/fa";
import { TbUsers } from "react-icons/tb";
import { Link } from 'react-router-dom';


const Side = () => {
  const SIDEBAR_LINKS =[
    {id:1, path: "/dash", name:"Dashboard", icon:LuBox},
    {id:2, path: "/dash", name:"Members", icon:TbUsers},
    {id:3, path: "/dash", name:"Messages", icon:LuMessageSquare},
    {id:4, path: "/dash", name:"Project", icon:FaSuitcase},
    {id:5, path: "/dash", name:"Client", icon:LuUser},
    {id:6, path: "/dash", name:"Work Plan", icon:LuCalendar},
  ]
  return (
    <div className='w-16 md:w-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-sky-100'>
      <div className='mb-8'>
      <img src="/vite.svg" alt="logo" className='w-8 hidden md:flex'/>
      
     </div>

     <ul className='mt-6 space-y-6 p-0'>

             {
              SIDEBAR_LINKS.map((link, index)=>(
                <li
                  key={index}
                  className={'font-medium rounded-md py-2 px-5 hover:bg-gray-100 hover:text-indigo-500'}
                >
                  <Link to={link.path} className='flex items-center md:space-x-5'>
                  <span>{link.icon()}</span>
                  <span className=''>{link.name}</span>
                  </Link>
                </li>
              ))
             }

     </ul>

     <div>
      <p>
        {" "}
        <span>?</span> <span>Need Help?</span></p>
     </div>
    </div>
  )
}

export default Side

import React from 'react';
import { FaPlus, FaTrash, FaTags, FaList,   } from 'react-icons/fa';
import { BiLogOut } from "react-icons/bi"; // Importing icons
import { LuBox } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle } from "react-icons/fa";
import { logout } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { BiSolidCategoryAlt } from "react-icons/bi";
import isAdmin from '../utils/isAdmin';


const Sidebar = () => {
  const user = useSelector((state)=> state.user)
  console.log(user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const menuItems = [];
  menuItems.push(
    { label: `${user.name}`, icon: FaUserCircle, link: '/dash/profile' }
  ); 
  menuItems.push(
    { label: 'Dashboard', icon: LuBox, link: '/dash' }

  );
  
  if (isAdmin(user.role)) {
    menuItems.push(
      { label: 'Category', icon: FaTags, link: '/dash/category' },
      { label: 'Sub Category', icon: BiSolidCategoryAlt, link: '/dash/subCategory' },
      
    );
  }
  menuItems.push(
    { label: 'Upload Product', icon: FaPlus, link: '/dash/uploadProduct' }
  );
  menuItems.push(
    { label: 'Products', icon: FaList, link: '/dash/product' }
  );


   
   
  
    
    
  
  
 

  const handleLogout = async()=>{
    try {
      const response = await Axios({
         ...SummaryApi.logout
      })
      console.log("logout",response)
      if(response.data.success){
        // if(close){
        //   close()
        // }
        dispatch(logout())
        localStorage.clear()
        toast.success(response.data.message)
        navigate("/login")
      }
    } catch (error) {
      console.log(error)
      AxiosToastError(error)
    }
}

  
  



  return (
    <div className="min-h-screen flex flex-row bg-gray-100">
      <div className="flex flex-col w-56 bg-sky-50 rounded-r-3xl overflow-hidden">
        <div className="flex items-center justify-center h-20 shadow-md">
          <h1 className="text-3xl uppercase text-indigo-500">DigiUltra</h1>
          
        </div>
      
        <ul className="flex flex-col py-4">
     
         
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.link}
               
                className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800 no-underline"
              >  
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                {item.icon()}
                </span>
                <span className="text-sm font-medium no-underline">{item.label}</span>
                
               
              </a>
              
            </li>
            
          ))}
           
        </ul>
        <button 
           // Update this link to your logout route
           onClick={handleLogout}
          className="mt-auto mb-4  flex-row items-center h-12 w-55 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800 no-underline bg-sky-200 hover:bg-sky-300 rounded-full ml-3 mr-2"
        >
          <BiLogOut className="inline-flex items-center justify-center h-6 w-6 pr-2 text-gray-400" />
          <span className="text-sm font-medium">Logout</span>
        </button>
       
  
      </div>
      
    </div>
  );
};



export default Sidebar;
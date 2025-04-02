import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUserDetails';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Axios from './utils/Axios';
import { setAllCategory, setAllSubCategory,setLoadingCategory } from './store/productSlice';
import SummaryApi from './common/SummaryApi';

function App() {
  const dispatch = useDispatch()
  const location = useLocation();
  
  const fetchUser = async()=>{
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
    
}
const fetchCategory = async()=>{
  try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({
          ...SummaryApi.getCategory
      })
      const { data : responseData } = response

      if(responseData.success){
         dispatch(setAllCategory(responseData.data)) 
      }
  } catch (error) {
      
  }finally{
    dispatch(setLoadingCategory(false))
  }
}

const fetchSubCategory = async()=>{
  try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({
          ...SummaryApi.getSubCategory
      })
      const { data : responseData } = response

      if(responseData.success){
         dispatch(setAllSubCategory(responseData.data)) 
      }
  } catch (error) {
      
  }finally{
    dispatch(setLoadingCategory(false))
  }
}

useEffect(()=>{
  fetchUser()
  fetchCategory()
  fetchSubCategory()
},[])

const isAdminDashboard = location.pathname  === '/dash' || location.pathname === '/dash/profile' || location.pathname === '/dash/addProduct' || location.pathname === '/dash/category' || location.pathname === '/dash/subCategory' || location.pathname === '/dash/uploadProduct' || location.pathname === '/dash/product';

  return (
    <>
    {!isAdminDashboard && <Header/>}
   <main className='min-h-[78vh]'>
    <Outlet/>
   </main>
   {!isAdminDashboard && <Footer/>}
   <Toaster/>
   </>
  )
}

export default App

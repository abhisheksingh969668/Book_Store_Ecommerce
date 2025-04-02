import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import AdminDash from "../layouts/AdminDash";
import Profile from "../pages/Profile";
import AddProduct from "../components/AddProduct";
import Category from "../pages/Category";
import SubCategoryPage from "../pages/SubCategoryPage";
import UploadProduct from "../pages/UploadProduct";
import Product from "../pages/Product";
import AdminPermision from "../layouts/AdminPermision";



const router = createBrowserRouter([
    {
        
        path : "/",
        element : <App/>,
        children : [
             {
                path : "",
                element : <Home/>
            },
            {
                path : "search",
                element : <SearchPage/>
            },
            {
                 path : 'login',
                 element : <Login/>
            },
            {
                path : "register",
                element : <Register/>
            },
             {
                 path : "forgot-password",
                element : <ForgotPassword/>
            },
            {
                path : "verification-otp",
                element : <OtpVerification/>
            },
            {
                path : "reset-password",
                element : <ResetPassword/>
            },
            {
                path : "dash",
                element : <AdminDash/>,
                children : [
                    {
                        path : "profile",
                        element : <Profile/>
                    },
                    {
                        path : "uploadProduct",
                        element : <UploadProduct/>
                    },
                    {
                        path : "category",
                        element : <AdminPermision><Category/></AdminPermision>
                    },
                    {
                        path : "subCategory",
                        element : <AdminPermision><SubCategoryPage/></AdminPermision>
                    },
                    {
                        path : "product",
                        element : <Product/>
                    },
                    
                ]
            },
           
        
        ]
    },
   
])

export default router
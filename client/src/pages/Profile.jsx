import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import fetchUserDetails from '../utils/fetchUserDetails';
import { setUserDetails } from '../store/userSlice';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';

const Profile = () => {
  const user = useSelector(state => state.user);
  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        const userData = await fetchUserDetails();
        dispatch(setUserDetails(userData.data));
      }

    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center m-10 '>
         
      <div className='relative p-10 bg-white rounded-2xl shadow-lg max-w-lg w-full'>
        {/* Decorative Background */}
        <div className='absolute inset-0 -z-10 transform rotate-6 bg-sky-500 rounded-2xl'></div>
        <div className='flex justify-center mb-5'>
        {/** Profile upload and display image */}
        <div onClick={() => setProfileAvatarEdit(true)} className='w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
          {
            user.avatar ? (
              <img 
                alt={user.name}
                src={user.avatar}
                className='w-full h-full'
              />
            ) : (
              <FaRegUserCircle Circle size={65} />
            )
          }
        </div>
        </div>
        {/* <button  className='text-sm min-w-20 border border-sky-100 hover:border-sky-200 hover:bg-sky-200 px-3 py-1 rounded-full mt-3'>Edit</button> */}
        
        {
          openProfileAvatarEdit && (
            <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
          )
        }

        <form className='mt-5 space-y-4' onSubmit={handleSubmit}>
          <div>
            <label className='block font-medium text-gray-700'>Full Name*</label>
            <input
              type='text'
              placeholder='Type Name'
              className='w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-green-500 outline-none'
              value={userData.name}
              name='name'
              onChange={handleOnChange}
              required
            />
          </div>

          <div>
            <label className='block font-medium text-gray-700'>Email*</label>
            <input
              type='email'
              placeholder='Type Your Email'
              className='w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-green-500 outline-none'
              value={userData.email}
              name='email'
              onChange={handleOnChange}
              required
            />
          </div>

          <div>
            <label className='block font-medium text-gray-700'>Mobile*</label>
            <input
              type='text'
              placeholder='Type Your Mobile'
              className='w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-green-500 outline-none'
              value={userData.mobile}
              name='mobile'
              onChange={handleOnChange}
              required
            />
          </div>

          <button type='submit' className='w-full py-3 text-white bg-green-600 rounded-md hover:bg-green-700 transition'>
            {loading ? "Loading..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
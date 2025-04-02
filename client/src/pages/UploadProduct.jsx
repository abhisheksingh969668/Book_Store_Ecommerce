import React from 'react'
import { useState } from 'react'
import uploadImage from '../utils/UploadImage.js'
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ViewImage from '../components/ViewImage';
import Loading from "../components/Loading.jsx"
import { useSelector } from 'react-redux'
import { IoClose } from "react-icons/io5";
import AxiosToastError from '../utils/AxiosToastError.js';
import SummaryApi from '../common/SummaryApi.js';
import Axios from '../utils/Axios.js';
import successAlert from '../utils/SuccessAlert.js';

const UploadProduct = () => {
  const [data,setData] = useState({
    bookName : "",
    image : [],
    category : [],
    subCategory : [],
    authorName : "",
      authorDescrip : "",
      imprint : "",
      published : "",
      price : "",
      bookDescription : "",
      isbn : "",
      length : "",
      link : "",
  })
  const [imageLoading,setImageLoading] = useState(false)
  const [ViewImageURL,setViewImageURL] = useState("")
  const allCategory = useSelector(state => state.product.allCategory)
  const [selectCategory,setSelectCategory] = useState("")
  const [selectSubCategory,setSelectSubCategory] = useState("")
  const allSubCategory = useSelector(state => state.product.allSubCategory)

  const handleChange = (e)=>{
    const { name, value} = e.target 

    setData((preve)=>{
      return{
          ...preve,
          [name]  : value
      }
    })}

    const handleUploadImage = async(e)=>{
      const file = e.target.files[0]
  
      if(!file){
        return 
      }
      setImageLoading(true)
      const response = await uploadImage(file)
      const { data : ImageResponse } = response
      const imageUrl = ImageResponse.data.url 
  
      setData((preve)=>{
        return{
          ...preve,
          image : [...preve.image,imageUrl]
        }
      })
      setImageLoading(false)
  
    }

    const handleDeleteImage = async(index)=>{
      data.image.splice(index,1)
      setData((preve)=>{
        return{
            ...preve
        }
      })

  }

  const handleRemoveCategory = async(index)=>{
    data.category.splice(index,1)
    setData((preve)=>{
      return{
        ...preve
      }
    })
  }

  const handleRemoveSubCategory = async(index)=>{
    data.subCategory.splice(index,1)
    setData((preve)=>{
      return{
        ...preve
      }
    })
}

const handleSubmit = async(e)=>{
  e.preventDefault()
  console.log("data",data)

  try {
    const response = await Axios({
        ...SummaryApi.createProduct,
        data : data
    })
    const { data : responseData} = response

    if(responseData.success){
        successAlert(responseData.message)
        setData({
          bookName : "",
    image : [],
    category : [],
    subCategory : [],
    authorName : "",
      authorDescrip : "",
      imprint : "",
      published : "",
      price : "",
      bookDescription : "",
      isbn : "",
      length : "",
      link : "",
        })

    }
  } catch (error) {
      AxiosToastError(error)
  }


}

  


  return (
    <section className="max-w-3xl p-4 mx-auto m-0  rounded-md shadow-md bg-sky-200 mt-20">
    <h1 className="text-xl font-bold text-black capitalize dark:text-black">Add Book</h1>
       <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label className="text-black dark:text-slate-950" htmlFor="bookName">Book Name</label>
                <input id="bookName"  type="text" className="block w-full px-4 py-2 mt-2 text-slate-950 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-slate-950 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder='Enter book name' name='bookName'
                    value={data.bookName}
                    onChange={handleChange}
                    required
               />
            </div>
            <div>
                <label className="text-black dark:text-slate-950" htmlFor="authorName">Author Name </label>
                <input id="authorName" type="text" className="block w-full px-4 py-2 mt-2 text-slate-950 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-slate-950 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder='Enter author name' name='authorName'
                    value={data.authorName}
                    onChange={handleChange}
                    required
                 />
            </div>
            <div>
                <label className="text-black dark:text-slate-950" htmlFor="bookDescription">Book Description</label>
                <textarea id="bookDescription" type="textarea" className="block w-full px-4 py-2 mt-2 text-slate-950 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-slate-950 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder='Enter book description' name='bookDescription'
                    value={data.bookDescription}
                    onChange={handleChange}
                    required
               ></textarea>
            </div>
            <div>
                <label className="text-black dark:text-slate-950" htmlFor="authorDescrip">Author Description</label>
                <textarea id="authorDescrip" type="textarea" className="block w-full px-4 py-2 mt-2 text-slate-950 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-slate-950 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder='Enter author description' name='authorDescrip'
                    value={data.authorDescrip}
                    onChange={handleChange}
                    required
               ></textarea>
            </div>
            <div>
                <label className="text-black dark:text-slate-950" htmlFor="imprint">Imprint</label>
                <input id="imprint"  type="text" className="block w-full px-4 py-2 mt-2 text-slate-950 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-slate-950 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"  placeholder='Enter imprint' name='imprint'
                    value={data.imprint}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label className="text-black dark:text-slate-950" htmlFor="price">Price</label>
                <input id="price"  type="number" className="block w-full px-4 py-2 mt-2 text-slate-950 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-slate-950 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"  placeholder='Enter price' name='price'
                    value={data.price}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <label className="text-black dark:text-slate-950" htmlFor="category">Category</label>
                <div>
                <select id="category" className="block w-full px-4 py-2 mt-2 text-slate-950 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-slate-950 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"  
                 value={selectCategory}
                 onChange={(e)=>{
                   const value = e.target.value 
                   console.log(value)
                   const category = allCategory.find(el => el._id === value )
                   console.log(category)
                   
                   setData((preve)=>{
                     return{
                       ...preve,
                       category : [...preve.category,category],
                     }
                   })
                   setSelectCategory("")
                 }}> 
                 
                 <option value={''}>Select Category</option>
                 {
                        allCategory.map((c,index)=>{
                          return(
                            <option value={c?._id}>{c.name}</option>
                          )
                        })
                      }
                
                  
                </select>

                <div className='flex flex-wrap gap-3'>
                      {
                        data.category.map((c,index)=>{
                          return(
                            <div key={c._id+index+"productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                              <p>{c.name}</p>
                              <div className='hover:text-red-500 cursor-pointer' onClick={()=>handleRemoveCategory(index)}>
                                <IoClose size={20}/>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                </div>
            </div>
            <div>
                <label className="text-black dark:text-slate-950" htmlFor="subCategory">Sub Category</label>
                <div>
                <select id="subCategory" className="block w-full px-4 py-2 mt-2 text-slate-950 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-slate-950 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                  value={selectSubCategory}
                  onChange={(e)=>{
                    const value = e.target.value 
                    const subCategory = allSubCategory.find(el => el._id === value )

                    setData((preve)=>{
                      return{
                        ...preve,
                        subCategory : [...preve.subCategory,subCategory]
                      }
                    })
                    setSelectSubCategory("")
                  }} > 
               
               <option value={""} className='text-neutral-600'>Select Sub Category</option>
               {
                        allSubCategory.map((c,index)=>{
                          return(
                            <option value={c?._id}>{c.name}</option>
                          )
                        })
                      }
                </select>
                <div className='flex flex-wrap gap-3'>
                      {
                        data.subCategory.map((c,index)=>{
                          return(
                            <div key={c._id+index+"productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                              <p>{c.name}</p>
                              <div className='hover:text-red-500 cursor-pointer' onClick={()=>handleRemoveSubCategory(index)}>
                                <IoClose size={20}/>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                </div>
            </div>
           
            <div>
                <label className="text-black dark:text-slate-950" htmlFor="published">Published</label>
                <input id="published" type="date" className="block w-full px-4 py-2 mt-2 text-slate-950 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-slate-950 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"  name='published'
                    value={data.published}
                    onChange={handleChange}
                    required
              />
            </div>
            <div>
                <label className="text-black dark:text-slate-950" htmlFor="isbn">ISBN</label>
                <input id="isbn" type="string" className="block w-full px-4 py-2 mt-2 text-slate-950 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-slate-950 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"  placeholder='Enter isbn' name='isbn'
                    value={data.isbn}
                    onChange={handleChange}
                    required
             />
            </div>
            <div>
                <label className="text-black dark:text-slate-950" htmlFor="length">Length</label>
                <input id="length"  type="number" className="block w-full px-4 py-2 mt-2 text-slate-950 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-slate-950 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder='Enter length' name='length'
                    value={data.length}
                    onChange={handleChange}
                    required
                 />
            </div>
            <div>
                <label className="text-black dark:text-slate-950" htmlFor="link">Link</label>
                <input id="link" type="url" className="block w-full px-4 py-2 mt-2 text-slate-950 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-slate-950 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" placeholder='http://' name='link'
                    value={data.link}
                    onChange={handleChange}
                    required
                />
            </div>
           
            <div>
            <p className='font-medium'>Image</p>
              <div>
              <label htmlFor='productImage' className='bg-white h-24 border rounded flex justify-center items-center cursor-pointer '>
              <div className='text-center flex justify-center items-center flex-col'>
              {
                              imageLoading ?  <Loading/> : (
                                <>
                                   <FaCloudUploadAlt size={35}/>
                                   <p>Upload Image</p>
                                </>
                              )
                            }

                  </div>
                  <input 
                            type='file'
                            id='productImage'
                            className='hidden'
                            accept='image/*'
                            onChange={handleUploadImage}
                          />
                </label>
                 {/**display uploded image*/}
                 <div className='flex flex-wrap gap-4'>
                        {
                          data.image.map((img,index) =>{
                              return(
                                <div key={img+index} className='h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group'>
                                  <img
                                    src={img}
                                    alt={img}
                                    className='w-full h-full object-scale-down cursor-pointer' 
                                    onClick={()=>setViewImageURL(img)}
                                  />
                                  <div onClick={()=>handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer'>
                                    <MdDelete/>
                                  </div>
                                </div>
                              )
                          })
                        }
                      </div>
              </div>
            </div>
          
            
          

         
        </div>

        <div className="flex justify-end mt-6">
            <button   className="px-6 py-2 leading-5 text-black transiti0on-colors duration-200 transform bg-sky-500 rounded-md hover:bg-sky-700 focus:outline-none focus:bg-gray-600">Submit</button>
        </div>
        </form>
        {
          ViewImageURL && (
            <ViewImage url={ViewImageURL} close={()=>setViewImageURL("")}/>
          )
        }   
</section>
  )
}

export default UploadProduct

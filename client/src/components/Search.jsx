import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import { IoSearch } from "react-icons/io5";
import { TypeAnimation } from 'react-type-animation';

const Search = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isSearchPage, setIsSearchPage] = useState(false)
  //const searchText = params.search.slice(3)


  useEffect(() => {
    const isSearch = location.pathname === "/search"
    setIsSearchPage(isSearch)
  }, [location])
  const redirectToSearchPage = () => {
    navigate("/search")
  }

//   const handleOnChange = (e)=>{
//     const value = e.target.value
//     const url = `/search?q=${value}`
//     navigate(url)
// }






  return (
    <div className='w-full min-w-[200px] lg:min-w-[320px] h-8 rounded-lg border overflow-hidden flex items-center h-full me-2 group focus-within:border-primary-200'>
      <button className='flex  items-center h-full p-3 text-neutral-600 group-focus-within:text-primary-200'>
        <IoSearch size={16} />
      </button>
      <div>
        {
          !isSearchPage ? (

            <div onClick={redirectToSearchPage} className='w-full h-full flex items-center'>
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  'Search for "Fiction Books"',
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                  'Search for "Action and Adventure Books"',
                  1000,
                  'Search for "Romantic Books"',
                  1000,
                  'Search for "School Books"',
                  1000
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: '1em', display: 'inline-block' }}
                repeat={Infinity}
              />
            </div>

          ) : (
            <div className='w-full h-full'>
              <input
                type='text'
                placeholder='Search for any book.'
                autoFocus
                //defaultValue={searchText}
                className='bg-transparent w-full h-full outline-none'
                // onChange={handleOnChange}
              />
            </div>
          )
        }

      </div>

    </div>
  )
}

export default Search

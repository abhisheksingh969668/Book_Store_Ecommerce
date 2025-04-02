
import React from 'react'
import noDataImage from '../assets/no-data-found-empty-file-folder-concept-design-vector-illustration_620585-1698.avif'

const NoData = () => {
  return (
    <div className='flex flex-col items-center justify-center p-4 gap-2'>
      <img
        src={noDataImage}
        alt='no data'
        className='w-36' 
      />
      <p className='text-neutral-500'>No Data</p>
    </div>
  )
}

export default NoData

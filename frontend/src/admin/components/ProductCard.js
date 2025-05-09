import { useState } from 'react'
import {MdModeEdit} from 'react-icons/md'


const ProductCard = ({data, fetchData, setOpenUpdate,setDataUpdate }) => {
  
  const handleUpdate = () => {
    setOpenUpdate()
    setDataUpdate()
    }

  return (
      <div className="bg-white col-span-1 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 h-60 py-4 rounded hover:scale-105 transition-all">
        <div className='flex justify-center w-full '>
            <div className='min-w-[150px] max-w-[200px]'>
                <img
                  src={data?.image[0]}
                  alt={data.name}
                  style={{ height: "150px" }}
                  className='w-full object-cover'
                />
                <h1 className="text-center text-ellipsis line-clamp-2">{data?.name}</h1>
          
                <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer ' 
                onClick={handleUpdate}
                >
                  <MdModeEdit />
                </div>
            </div>
        </div>

        
      </div>
  
  )
}

export default ProductCard

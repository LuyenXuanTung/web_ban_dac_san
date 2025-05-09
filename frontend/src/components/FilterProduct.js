import React, { useState } from 'react'
import SummaryApi from '../common';

const FilterProduct = ({label, select, down, up, setProducts}) => {
    const [openDropDown, setOpenDropDown] = useState(false)
    const handleSelect = async (e) => {
  
    
        const response = await fetch(SummaryApi.getProductSelected.url,{
          method: SummaryApi.getProductSelected.method,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            selected: e.target.innerText
          })
        })

        const data = await response.json()


        if(data.success) {
          setProducts(data.data)
        }
    }
    
    
    
  return (
    <div className="w-full rounded-md overflow-hidden border border-gray-300">
      <div className="w-full min-h-20 border-t-4 border-green-500 py-2 px-4">
        <div className='flex justify-between items-center'>
            <h2 className='text-lg font-bold uppercase'>{label}</h2>
            <div className='cursor-pointer text-black hover:text-slate-600 text-lg' onClick={() => setOpenDropDown((prev) => !prev)}>
                {openDropDown ? up : down}
            </div>
        </div>
       
        <div className='border-t-4 border-green-600 w-8 my-2'></div>
        <div className={`${openDropDown ? 'h-fit' : 'max-h-28' } transition-all`}>
            {
                select.sort((a,b) => a.localeCompare(b)).map((pro, index) => {
                    return (
                        <>
                            <div key={index} name='select' className='py-1 cursor-pointer w-fit hover:text-green-600'onClick={handleSelect} >{pro}</div>
                            <div className='border-t-[1px] border-slate-300 w-full my-1'></div>
                        </>
                        
                    )
                })
            }
        </div>
      </div>
    </div>
  );
}

export default FilterProduct

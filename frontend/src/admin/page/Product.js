import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import ProductCard from '../components/ProductCard'
import fetchAllProduct from '../../helpers/fetchAllProduct'
import SummaryApi from '../../common'


const Product = () => {
  const [openUpload, setOpenUpload] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const [openUpdate, setOpenUpdate] = useState(false)
  const [dataUpdate, setDataUpdate] = useState({})



  useEffect(() => {
    fetchAllProduct(setAllProduct)
  },[])
  return (
    <div className='p-4'>
      <div className='bg-white flex justify-between py-2 px-4 items-center'>
        <h2 className='font-bold text-lg'>Sản phẩm</h2>
        <button className='border-red-600 border-2 text-red-600 rounded-md px-3 py-1 hover:bg-red-600 hover:text-white transition-all' onClick={() => setOpenUpload(true)}>Thêm mới</button>
      </div>

      <div className="hide-scroll py-4 px-1 h-[calc(100vh-150px)] overflow-y-scroll grid gap-4 grid-cols-1 sm:grid-cols-12">
          {
            allProduct.map((product, index) => {
              return (   
                  <ProductCard data={product}
                   key={index+'allProduct'} 
                   fetchData={setAllProduct}
                   setOpenUpdate={() => setOpenUpdate(true)}
                   setDataUpdate={() => setDataUpdate(product)}
                   />
              )
            })
          }
        </div>

      {
        openUpload && (<UploadProduct onClose={() => setOpenUpload(false)}
         fetchData={setAllProduct}
         title="Thêm sản phẩm"
         handleFetchProduct={SummaryApi.addProduct}
         />)
      }

      {
        openUpdate && (<UploadProduct onClose={() => setOpenUpdate(false)}
         fetchData={setAllProduct}
         title="Cập nhật sản phẩm"
         dataUpdate={dataUpdate}
          handleFetchProduct={SummaryApi.updateProduct}
         />)
      }
    </div>
  )
}

export default Product

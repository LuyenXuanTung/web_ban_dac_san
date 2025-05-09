import React, { use, useEffect } from 'react'
import Banner from '../components/Banner'
import SectionCard from '../components/SectionCard'

const HomePage = () => {
  useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },[])
  return (
    <div className=" bg-white">
      <div className="container mx-auto p-4">
        <Banner />
        <div className="p-4 bg-green-600 text-white text-center mt-4 font-bold">
          <h1>
            NÔNG SẢN DŨNG HÀ – MANG SỨC KHOẺ VÀ CUỘC SỐNG AN LÀNH ĐẾN MỌI NƠI
          </h1>
        </div>

        <SectionCard title={"sản phẩm bán chạy"} bg={'bg-green-100'}/>
          
          
      </div>
    </div>
  )
}

export default HomePage

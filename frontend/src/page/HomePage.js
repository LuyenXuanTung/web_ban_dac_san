import React, { use, useEffect } from 'react'
import Banner from '../components/Banner'
import SectionCard from '../components/SectionCard'
import SummaryApi from '../common'

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

        <div id="best-selling">
          {" "}
          <SectionCard
            title={"sản phẩm bán chạy"}
            bg={"bg-green-100"}
            api={SummaryApi.getProductsBestSelling}
          />
        </div>

        <div id="best-promotion">
          {" "}
          <SectionCard
            title={"sản phẩm giảm giá cao nhất"}
            bg={"bg-green-100"}
            api={SummaryApi.getProductsBestPromotion}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage

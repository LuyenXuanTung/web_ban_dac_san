import React, { useContext, useEffect, useState } from 'react'
import {FaStar, FaStarHalf} from 'react-icons/fa'
import SummaryApi from '../common'
import formatPrice from '../helpers/formatMoney';
import addToCart from '../helpers/addToCart';
import CountProduct from '../context/countProduct';
import fetchCartItems from '../helpers/fetchCartItems';
import moment from 'moment';
import Feedback from '../components/Feedback';
import { useNavigate } from 'react-router-dom';


const ProductDetails = () => {

  const [data, setData] = useState({
    _id:'',
    name: '',
    description: '',
    category: '',
    image: [],
    price: '',
    province: '',
    quantity: '',
    total_pay: '',
    total_rating: '',
    total_stars: '',
  })

  const [loading, setLoading] = useState(false)
  const productImagesLoading = new Array(4).fill(null) 
  const [activeImage, setActiveImage] = useState('')
  const context = useContext(CountProduct)
  const navigate = useNavigate()

  const handleActiveImage = (image) =>{
    setActiveImage(image)
  } 


  const fetchProductDetails = async () => {
    setLoading(true)
    const res = await fetch(SummaryApi.getProductsById.url, {
      method: SummaryApi.getProductsById.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: context?.productDetailsId,
      }),
    })
    const data = await res.json()
    setLoading(false)
    
    
    if (data.success) {
      setData(data.data)
      setActiveImage(data.data.image[0])
    } 
  }
  
  useEffect(() => {
    fetchProductDetails()
    setLoading(false)
  },[context?.productDetailsId])
  
  const handleAddToCard = async(e, id) => {
    await addToCart(e, id)
     context?.fetchCountProductInCart()
    fetchCartItems(context.setCartItems)
   }

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* Product Images */}
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200">
            <img
              src={activeImage}
              alt=""
              className="h-full w-full object-fill mix-blend-multiply"
            />
          </div>

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col h-full">
                {productImagesLoading.map((p) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded animate-pulse"
                      key={"loading image"}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col h-full">
                {data?.image?.map((img, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded p-1"
                      key={img}
                    >
                      <img
                        src={img}
                        alt=""
                        className="h-full w-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleActiveImage(img)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        {loading ? (
          <div className="flex flex-col gap-1">
            <p className="bg-slate-200 animate-pulse rounded h-6 w-full inline-block">
      
            </p>
            <h2 className="bg-slate-200 animate-pulse rounded h-6 w-full">
              
            </h2>
            <p className="bg-slate-200 animate-pulse rounded h-6 min-w-[100px] max-w-[120px]"></p>

            <div className="bg-slate-200 animate-pulse rounded h-6 min-w-[100px] max-w-[100px]">
              
            </div>

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
              <p className="bg-slate-200 animate-pulse rounded h-6 min-w-[100px] max-w-[120px]"></p>
              <p className="bg-slate-200 animate-pulse rounded h-6 min-w-[100px] max-w-[120px]"></p>
            </div>

            <div className="flex items-center gap-3 my-2">
              <button className="bg-slate-200 animate-pulse rounded h-8 min-w-[130px] max-w-[180px]">
                
              </button>
              <button className="bg-slate-200 animate-pulse rounded h-8 min-w-[130px] max-w-[180px]">
                
              </button>
            </div>

            <div>
              <p className="bg-slate-200 animate-pulse rounded h-6 min-w-[100px] max-w-[120px]"> </p>
              <p className='bg-slate-200 animate-pulse rounded h-10 min-w-[100px] max-w-[120px] mt-2'></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data?.name}
            </h2>
            <p className="capitalize text-slate-400">{data?.category}</p>

            <div className="text-yellow-500 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
              <p className="text-slate-400 text-sm">({data?.total_rating ? data.total_rating+' đánh giá' : "Chưa có đánh giá"})</p>
              <p className="text-black text-base font-medium ml-1">{data?.total_pay && data.total_pay + " đã bán"}</p>

            </div>

            <div className="flex items-center gap-2 text-base lg:text-lg font-medium my-1">
              <p className="text-slate-600">Xuất xứ: {data?.province}</p>
            </div>

            <div className="flex items-center gap-2 text-base lg:text-lg font-medium my-1">
              <p className="text-slate-600">Ngày sản xuất: {moment(data?.manufacture).format("DD-MM-YYYY")}</p>
            </div>

            <div className="flex items-center gap-2 text-base lg:text-lg font-medium my-1">
              <p className="text-slate-600">Ngày hết hạn: {moment(data?.expiry).format("DD-MM-YYYY")}</p>
            </div>

            <div className="flex items-center gap-2 text-base lg:text-lg font-medium my-1">
              <p className="text-slate-800">Số lượng: {data?.quantity}</p>
            </div>

            <div className="flex items-center gap-2 text-base font-medium my-1">
              <p className="text-red-500 bg-red-50 p-1">Khuyến mãi: Giảm {data?.promotion}%</p>
            </div>

            <div className="flex items-center gap-4 text-2xl lg:text-3xl font-medium my-1">
              <p className="text-2xl font-semibold text-slate-500 line-through">{formatPrice(data?.price)}</p>
              <p className="text-3xl font-semibold text-red-600">{formatPrice(data?.new_price)}</p>
            </div>

            {
              data?.quantity > 0 && (
                <div className="flex items-center gap-3 my-2">
              <button className="border-2 border-green-600 rounded px-4 py-2 min-w-[120px] text-green-600 font-medium hover:bg-green-600 hover:text-white"
              onClick={e => {
                handleAddToCard(e,data?._id)
                navigate('/cart')
              }}
              >
                Mua ngay
              </button>
              <button className="border-2 border-green-600 rounded px-4 py-2 min-w-[120px] bg-green-600 text-white hover:bg-white hover:text-green-600" 
              onClick={e => handleAddToCard(e,data?._id)}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
              )
            }

            <div>
              <p className="text-slate-600 font-medium my-1">Mô tả: </p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>


      {/* create component feedback product */}
      <Feedback productId={data._id} />
    </div>
  )
}

export default ProductDetails

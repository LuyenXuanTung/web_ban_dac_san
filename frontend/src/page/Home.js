import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from "../components/Header";
import Footer from '../components/Footer'
import SummaryApi from '../common';
import CountProduct from '../context/countProduct';
import fetchCartItems from '../helpers/fetchCartItems';


const Home = () => {

  const [countProduct, setCountProduct] = useState(0)
  const [cartItems, setCartItems] = useState([]);
  const [productDetailsId, setProductDetailsId] = useState(null)

  const fetchCountProductInCart = async () => {
    const dataApi = await fetch(SummaryApi.countProductInCart.url, {
      method: SummaryApi.countProductInCart.method,
      credentials: 'include'
    })

    const dataResponse = await dataApi.json()

    if (dataResponse.success) {
      setCountProduct(dataResponse.data)
    }
  }

  useEffect(() => {
    fetchCountProductInCart()
    fetchCartItems(setCartItems);
  },[])

  return (
    <>
      <CountProduct.Provider
        value={{
          fetchCountProductInCart,
          countProduct,
          cartItems,
          setCartItems,
          productDetailsId,
          setProductDetailsId,
        }}
      >
        <Header />
        <main className="min-h-[calc(100vh-120px+60px)] pt-32">
          <Outlet />
        </main>
        <Footer />
      </CountProduct.Provider>
    </>
  );
}

export default Home

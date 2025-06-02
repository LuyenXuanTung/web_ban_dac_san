import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'


const SectionCard = ({title, bg, api}) => {
    const [products, setProducts] = useState([])
    const fetchProducts = async () => {
        const dataApi = await fetch(api.url, {
            method: api.method,
            headers: {
                'content-type': 'application/json'},
            })
        const data = await dataApi.json()

        if (data.success) {
            setProducts(data.data)
        } 
    }

    useEffect(() => {
        fetchProducts()
    }, [])
    
    
  return (
    <section className={`mt-8 ${bg && bg} p-4 shadow-md`} >
          
          {title && (
            <>
            <h2 className="text-2xl font-semibold mt-4 uppercase py-1">{title}</h2>
            <hr className='border-black'/>
            </>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-12 xl:grid-cols-10 2xl:grid-cols-12 gap-4 mt-4">
            {
              products.map((product, index) => (
                <div className="bg-white hover:-translate-y-1 transition-all shadow-lg sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 cursor-pointer">
                  <ProductCard key={index} product={product} /> 
                </div>
                
              ))
            }
          </div>
        </section>
  )
}

export default SectionCard

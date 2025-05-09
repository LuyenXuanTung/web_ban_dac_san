import React, { useEffect, useState } from 'react'
import {FaAngleRight, FaAngleLeft} from 'react-icons/fa6'
import slide1 from '../assets/banner/slide1.png'
import slide2 from '../assets/banner/slide2.jpg'
import slide3 from '../assets/banner/slide3.jpg'
import slide4 from '../assets/banner/slide4.jpg'

const Banner = () => {

    const [currentImage, setCurrentImage] = useState(0)

    const desktopImages = [
        slide1,
        slide2,
        slide3,
        slide4
    ]

    const nextImage = () => {
        if(currentImage < desktopImages.length-1)
        setCurrentImage((prev) => prev + 1)
    }

    const prevImage = () => {
        if(currentImage >= 1){
            setCurrentImage((prev) => prev - 1)
        }      
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(currentImage < desktopImages.length-1){
                nextImage()
            }
            else{
                setCurrentImage(0)
            }
        },5000)

        return () => clearInterval(interval)
    },[currentImage])

  return (
    <div className="container mx-auto rounded ">
      <div className="h-64 md:h-[300px] lg:h-[400px] w-full bg-slate-200 relative">

        <div className={`absolute z-10 h-full w-full md:flex items-center hidden`}>
          <div className='w-full flex justify-between text-2xl'>
              <button className='bg-white shadow-md rounded-full p-1'
                onClick={prevImage}
              >
                <FaAngleLeft />
              </button>
              <button className='bg-white shadow-md rounded-full p-1'
                onClick={nextImage}
              >
                <FaAngleRight />
              </button>
          </div>
        </div>

        {/* Desktop and tablet */}
        <div className="hidden md:flex h-full w-full overflow-hidden" >
          {desktopImages.map((image, index) => (
            <div
              className="w-full h-full min-w-full min-h-full transition-all"
              key={image}
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <img src={image} alt="banner" className="w-full h-full" />
            </div>
          ))}
        </div>

          {/* Mobile */}
        {/* <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImages.map((image, index) => (
            <div
              className="w-full h-full min-w-full min-h-full transition-all"
              key={image}
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <img src={image} alt="banner" className="w-full h-full object-cover" />
            </div>
          ))}
        </div> */}

      </div>
    </div>
  )
}

export default Banner

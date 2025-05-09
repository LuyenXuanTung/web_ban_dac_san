import React, { useEffect, useState } from 'react'
import {FaAngleUp} from 'react-icons/fa6'

const ScrollUp = () => {

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 200){
        setIsVisible(true)
      }
      else{
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener('scroll',handleScroll)
  })

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
   
        <div className={`fixed  right-[20px] bottom-[20px] transition-all ${isVisible ? 'opacity-100' : 'opacity-0'}`} onClick={handleScrollTop}>
          <div className="h-12 w-12 bg-green-600 text-white text-xl flex items-center justify-center rounded-full shadow-xl cursor-pointer hover:scale-105">
            <FaAngleUp />
          </div>
        </div>
      
    </>
  );
}

export default ScrollUp

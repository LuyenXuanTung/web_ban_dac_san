import React, { useEffect } from 'react'
import Header from '../components/Header'
import SummaryApi from '../../common'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'



const Home = () => {

  const navigate = useNavigate()

  const fetchAdmin = async () => {
    const dataApi = await fetch(SummaryApi.getAdmin.url,{
      method: SummaryApi.getAdmin.method,
      credentials: 'include'
    })

    const dataResponse = await dataApi.json()

    if(dataResponse.success && dataResponse.data === "ADMIN"){
      toast.success(dataResponse.message)
    }
    else{
      navigate('/error')
    }
    
  }

  useEffect(() => {
    fetchAdmin()
  })
   
  return (
    <div>
      <ToastContainer position='top-right' style={{top: '70px'}} />
      <Header />
      <div>fjeijei</div>
    </div>
    
  )
}

export default Home

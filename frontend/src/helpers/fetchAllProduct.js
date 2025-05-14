import { toast } from "react-toastify"
import SummaryApi from "../common"


const fetchAllProduct = async (setAllProduct) => {
        const fetchData = await fetch(SummaryApi.allProduct.url,{
          method: SummaryApi.allProduct.method,
          credentials: 'include'
        })
    
        const dataResponse = await fetchData.json()
    
        if(dataResponse.success){
          setAllProduct(dataResponse.data)
        }
    
        if(dataResponse.error){
          toast.error(dataResponse.message)
        }
}

const fetchAllProductInAdmin = async (setAllProduct) => {
        const fetchData = await fetch(SummaryApi.allProductInAdmin.url,{
          method: SummaryApi.allProductInAdmin.method,
          credentials: 'include'
        })
    
        const dataResponse = await fetchData.json()
    
        if(dataResponse.success){
          setAllProduct(dataResponse.data)
        }
    
        if(dataResponse.error){
          toast.error(dataResponse.message)
        }
}

export {fetchAllProductInAdmin}

export default fetchAllProduct
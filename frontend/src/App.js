import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer} from "react-toastify"
import ScrollUp from "./components/ScrollUp";
import SummaryApi from "./common";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import Context from './context'

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user?.user)
  const location = useLocation();
  

  const fetUserDetails = async() => {
    const dataApi = await fetch(SummaryApi.userDetails.url,{
      method: SummaryApi.userDetails.method,
      credentials: 'include'
    })

    const dataResponse = await dataApi.json()

    if(dataResponse.success){
      localStorage.setItem('user', JSON.stringify(dataResponse.data));
      dispatch(setUserDetails(dataResponse.data));
    }

  }

  

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      dispatch(setUserDetails(storedUser));
    }
    else{
      fetUserDetails();
    }
  },[])

  useEffect(() => {
    if(user){
      if (location.pathname === '/login') {
        if(user.role === "USER") {
          navigate('/');
        }
        if(user.role === "ADMIN") {
          navigate('/admin');
        }
      }

    }
  },[user])


  return (

    <>
        
       <Context.Provider value={
        {
          fetUserDetails,
        }
       }>
          <ToastContainer position='top-right' style={{top: '70px'}} />
          <Outlet />
          <ScrollUp />
       </Context.Provider>
    </>
  );
}

export default App;

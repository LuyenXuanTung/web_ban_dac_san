import SummaryApi from "../common";

const fetchCartItems = async (setCartItems) => {
    const response = await fetch(SummaryApi.getCart.url,{
        method:SummaryApi.getCart.method,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        
    });

    const dataResponse = await response.json();
    
    if(dataResponse.success){
      setCartItems(dataResponse.data);
    } 
  };

export default fetchCartItems;
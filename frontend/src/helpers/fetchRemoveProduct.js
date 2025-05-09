import SummaryApi from "../common";
import fetchCartItems from "./fetchCartItems";

const fetchRemoveProduct = async (id,setCartItems,fetchCountProductInCart) => {
    const response = await fetch(SummaryApi.removeProductCart.url, {
      method: SummaryApi.removeProductCart.method,
      credentials: "include",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });
    const data = await response.json();

    if(data.success) {
      fetchCartItems(setCartItems);
      fetchCountProductInCart()
    }
  };

  export default fetchRemoveProduct;
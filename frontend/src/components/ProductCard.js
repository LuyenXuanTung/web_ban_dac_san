import React, { useContext } from 'react';
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import formatPrice from '../helpers/formatMoney';
import addToCart from '../helpers/addToCart';
import CountProduct from '../context/countProduct';
import fetchCartItems from '../helpers/fetchCartItems';


const ProductCard = ({ product, border }) => {
  const context = useContext(CountProduct)

  const handleAddToCard = async(e) => {
   await addToCart(e, product?._id)
    context?.fetchCountProductInCart()
    fetchCartItems(context.setCartItems)
  }

  return (
    <Link
      to={"/product-details/" + product?.name}
      onClick={() => context.setProductDetailsId(product?._id)}
    >
      <div className={`${border && border + " rounded-md overflow-hidden"} `}>
        <div className={`w-full h-48 overflow-hidden `}>
          <img
            src={product.image[0]}
            alt="Product"
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="py-2 px-4">
          <h2 className="text-lg font-bold line-clamp-2 capitalize">
            {product.name}
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-yellow-500">
              <span className="text-gray-500 text-sm mr-1">{product?.total_stars > 0 && product?.total_rating > 0 ? (product?.total_stars / product?.total_rating).toFixed(1) : "5.0"}</span>
              <FaStar className="text-sm" />
              <span className="ml-1 text-sm text-gray-500">
                ({product?.total_pay} đã bán)
              </span>
            </div>

            <span className="text-sm p-1 bg-red-100 text-red-500">
              -{product?.promotion}%
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-slate-600 line-through">
              {formatPrice(product?.price)}
            </p>
            <p className="text-xl font-semibold text-red-600">
              {formatPrice(product?.new_price)}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center px-4  py-2">
          {product?.quantity > 0 ? (
            <button
              className="bg-green-600 w-full text-white py-2 rounded-sm hover:bg-green-700 transition duration-200 line-clamp-1"
              onClick={handleAddToCard}
            >
              Thêm vào giỏ hàng
            </button>
          ) : (
            <button
              className="bg-red-600 w-full text-white py-2 rounded-sm transition duration-200 line-clamp-1"
            >
              Hết hàng
            </button>
          )
        }
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

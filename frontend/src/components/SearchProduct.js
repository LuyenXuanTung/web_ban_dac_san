import React, { useEffect, useState } from 'react'
import { FaSearch} from "react-icons/fa";
import SummaryApi from '../common';
import { Link } from 'react-router-dom';
import formatPrice from '../helpers/formatMoney';


const SearchProduct = () => {

    const [searchValue, setSearchValue] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);
    const [searchResult, setSearchResult] = useState([])

    const handleSearch = (e) => {
        setSearchValue(e.target.value)      
    }

    const fetchSearchProduct = async () => {
        
        const response = await fetch(SummaryApi.searchProduct.url, {
            method: SummaryApi.searchProduct.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                searchValue
            })
        })
       
        const data = await response.json()
       
        if(data.success) {
            setSearchResult(data.data)
        }
    }

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        if (searchValue.trim() !== '') { 
            const newTimeoutId = setTimeout(() => {
                fetchSearchProduct();
            }, 600);
            setTimeoutId(newTimeoutId);
            return () => {
                if (newTimeoutId) {
                    clearTimeout(newTimeoutId);
                }
            };
        } else {
            setSearchResult([]);
        }
    }, [searchValue]);

    const handleProductClick = () => {
        setSearchValue(''); 
        setSearchResult([]);
    };

  return (
    <div className="relative">
      <div className="hidden md:flex items-center border border-slate-300 rounded-full h-10 min-w-[350px]">
        <input
          className="flex-1 rounded-full h-full border-none outline-none p-4"
          name="search"
          type="text"
          id="search"
          value={searchValue}
          onChange={handleSearch}
          placeholder="Tìm kiếm..."
        />
        <div className="p-3 cursor-pointer text-xl" onClick={fetchSearchProduct}>
          <FaSearch />
        </div>
      </div>

      {searchResult.length > 0 && (
        <div
          className={`${
            searchResult.length ? "block" : "hidden"
          } absolute top-[calc(100%+8px)] w-full max-h-64 min-h-fit bg-white rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden`}
        >
          <div className="py-2 ">
            {searchResult.map((product, index) => {
              return (
                <Link
                  to={"/product-details/" + product?.id}
                  className="p-2 flex items-center gap-2 hover:bg-slate-200 cursor-pointer"
                  onClick={handleProductClick}
                  key={index}
                >
                  <div className="border-slate-400 border">
                    <img
                      src={product.image}
                      width={45}
                      height={45}
                      alt={product.name}
                    ></img>
                  </div>
                  <div>
                    <p className="text-base">{product.name}</p>
                    <p className="text-red-600">{formatPrice(product.new_price)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchProduct

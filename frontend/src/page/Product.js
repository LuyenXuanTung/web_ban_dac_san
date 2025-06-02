import React, { useContext, useEffect, useState } from "react";
import FilterProduct from "../components/FilterProduct";
import province from "../data/province";
import category from "../data/category";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import CountProduct from "../context/countProduct";
import fetchAllProduct from "../helpers/fetchAllProduct";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";



const Product = () => {
  const { allProducts } = useContext(CountProduct);
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    if (allProducts.length > 0) {
      setProducts(allProducts);
    } else {
      fetchAllProduct(setProducts);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [allProducts]);

  const handleSortBy = (e) => {
    const { value } = e.target;

    if (value === "asc") {
      setProducts((prev) =>
        [...prev].sort((a, b) => a.new_price - b.new_price)
      );
    } else if (value === "dsc") {
      setProducts((prev) =>
        [...prev].sort((a, b) => b.new_price - a.new_price)
      );
    } else if (value === "new") {
      setProducts((prev) =>
        [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    }
  };
  return (
    <div className="bg-white">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-10 gap-4">
          <div className="hidden md:block col-span-1 md:col-span-4 lg:col-span-2">
            <div className="max-h-[calc(100vh-10px)] overflow-y-scroll hide-scroll">
              <FilterProduct
                label={"Danh mục"}
                select={category}
                down={<FaAngleDown />}
                up={<FaAngleUp />}
                setProducts={setProducts}
              />
              <div className="my-4"></div>

              <FilterProduct
                label={"Khu vực"}
                select={province}
                down={<FaAngleDown />}
                up={<FaAngleUp />}
                setProducts={setProducts}
              />
            </div>
          </div>
          <div className="col-span-1 md:col-span-8 lg:col-span-8">
            <div className="h-12 bg-slate-200 w-full flex items-center">
              <div className="flex items-center justify-between bg-slate-200 px-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg text-gray-500">Sắp xếp theo:</span>
                  <select
                    className="border border-gray-300 rounded-md p-1"
                    onChange={handleSortBy}
                  >
                    <option>Lựa chọn</option>
                    <option value="new">Mới nhất</option>
                    <option value="asc">Giá thấp đến cao</option>
                    <option value="dsc">Giá cao đến thấp</option>
                  </select>
                </div>
              </div>
            </div>

            <section className="min-h-96">
              {products.length > 0 ? (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4">
                    {currentProducts.map((product, index) => (
                      <div
                        className="bg-white hover:-translate-y-1 transition-all shadow-lg sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3 cursor-pointer"
                        key={product._id || index}
                      >
                        <ProductCard
                          product={product}
                          border={"border border-green-400"}
                        />
                      </div>
                    ))}
                  </div>
                  {/* Phân trang */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-8 gap-2 items-center">
                      {/* Mũi tên lùi */}
                      <button
                        className={`p-2 rounded-full ${
                          currentPage === 1
                            ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                            : "bg-green-600 text-white"
                        }`}
                        onClick={() =>
                          currentPage > 1 && setCurrentPage(currentPage - 1)
                        }
                        disabled={currentPage === 1}
                      >
                        <FaArrowLeft />
                      </button>

                      {/* Trang đầu */}
                      {currentPage > 2 && (
                        <>
                          <button
                            className={`px-3 py-1 rounded-full ${
                              currentPage === 1
                                ? "bg-green-600 text-white"
                                : "bg-gray-200"
                            }`}
                            onClick={() => setCurrentPage(1)}
                          >
                            1
                          </button>
                          {currentPage > 3 && <span className="px-2">...</span>}
                        </>
                      )}

                      {/* Trang trước */}
                      {currentPage > 1 && (
                        <button
                          className={`px-3 py-1 rounded-full ${"bg-gray-200"}`}
                          onClick={() => setCurrentPage(currentPage - 1)}
                        >
                          {currentPage - 1}
                        </button>
                      )}

                      {/* Trang hiện tại */}
                      <button
                        className="px-3 py-1 rounded-full bg-green-600 text-white"
                        disabled
                      >
                        {currentPage}
                      </button>

                      {/* Trang sau */}
                      {currentPage < totalPages && (
                        <button
                          className={`px-3 py-1 rounded-full ${"bg-gray-200"}`}
                          onClick={() => setCurrentPage(currentPage + 1)}
                        >
                          {currentPage + 1}
                        </button>
                      )}

                      {/* Trang cuối */}
                      {currentPage < totalPages - 1 && (
                        <>
                          {currentPage < totalPages - 2 && (
                            <span className="px-2">...</span>
                          )}
                          <button
                            className={`px-3 py-1 rounded-full ${
                              currentPage === totalPages
                                ? "bg-green-600 text-white"
                                : "bg-gray-200"
                            }`}
                            onClick={() => setCurrentPage(totalPages)}
                          >
                            {totalPages}
                          </button>
                        </>
                      )}

                      {/* Mũi tên tiến */}
                      <button
                        className={`p-2 rounded-full ${
                          currentPage === totalPages
                            ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                            : "bg-green-600 text-white"
                        }`}
                        onClick={() =>
                          currentPage < totalPages &&
                          setCurrentPage(currentPage + 1)
                        }
                        disabled={currentPage === totalPages}
                      >
                        <FaArrowRight />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-96 flex items-center justify-center">
                  <h2 className="text-2xl font-bold text-gray-500">
                    Không có sản phẩm nào
                  </h2>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

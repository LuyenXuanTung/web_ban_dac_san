import React, { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import category from '../../data/category';
import { FaCloudUploadAlt } from "react-icons/fa";
import {MdDelete} from "react-icons/md"
import { toast } from 'react-toastify';
import province from '../../data/province';
import uploadImage from '../../helpers/uploadImages';
import moment from 'moment';
import fetchAllProduct from '../../helpers/fetchAllProduct';



const UploadProduct = ({onClose,fetchData,title,dataUpdate,handleFetchProduct}) => {
    const [data, setData] = useState({
        name: "",
        description: "",
        category: "",
        image: [],
        price: "",
        expiry: "",
        province: "",
    })
    useEffect(() => {
      if (dataUpdate) {
        setData(dataUpdate)
      }
    }, [dataUpdate])
    


    const handleOnchange = (e) =>{
        const {name, value} = e.target
        if (name === 'expiry') {
          const selectedDate = moment(value);
          const now = moment();
          const threeMonthsFromNow = now.clone().add(3, 'months');
    
          if (!selectedDate.isValid()) {
            toast.error('Ngày hết hạn không hợp lệ');
            return;
          } else if (selectedDate.isBefore(threeMonthsFromNow)) {
            toast.error('Ngày hết hạn phải cách ngày hiện tại ít nhất 3 tháng');
          }
        }
        setData((prev) => {
            return{
                ...prev,
                [name]: value
            }
        })
        
    }


    const handleUploadProduct = async(e) => {
      const file = e.target.files[0]


      const uploadImageCloudinary = await uploadImage(file);

      setData((prev) => {
        return {
          ...prev,
          image: [...prev.image, uploadImageCloudinary.url],
        };
      });
      
    }


    const handleDeleteImage = async(index) => {
      const newImage = [...data.image]
      newImage.splice(index,1)

      setData((prev) => {
        return {
          ...prev,
          image: [...newImage],
        };
      });
    }

    const handleSubmitProduct = async (e) => {
      e.preventDefault();

      const dataApi = await fetch(handleFetchProduct.url, {
        method: handleFetchProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataResponse = await dataApi.json();

      if (dataResponse.success) {
        toast.success(dataResponse.message);
        fetchAllProduct(fetchData);
        onClose();
      }

      if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-70 top-0 right-0 left-0 bottom-0 flex justify-center items-center z-10">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex items-center justify-between pb-3">
          <h2 className="font-bold text-lg"> {title && title}</h2>
          <div
            className="w-fit text-2xl cursor-pointer hover:text-red-600"
            onClick={onClose}
          >
            <IoMdClose />
          </div>
        </div>

        <form
          className="grid gap-2 p-4 overflow-y-scroll h-full"
          onSubmit={handleSubmitProduct}
        >
          <label htmlFor="name">Tên sản phẩm: </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nhập tên sản phẩm"
            value={data.name}
            onChange={handleOnchange}
            className="p-2 bg-slate-100 border rounded"
          />


          <label htmlFor="category" className="mt-3">
            Danh mục:{" "}
          </label>
          <select
            value={data.category}
            name="category"
            onChange={handleOnchange}
            className="p-2 bg-slate-100 border rounded"
           
          >
            <option value={""}>Lựa chọn danh mục</option>
            {category.map((category, index) => {
              return (
                <option key={category + index} value={category}>
                  {category}
                </option>
              );
            })}
          </select>

          
        <label htmlFor="province" className="mt-3">
            Khu vực:{" "}
          </label>
          <select
            value={data.province}
            name="province"
            onChange={handleOnchange}
            className="p-2 bg-slate-100 border rounded"
            style={{ maxHeight: '150px', overflowY: 'auto' }}
          >
            <option value={""}>Lựa chọn khu vực</option>
            {province.map((p, index) => {
              return (
                <option key={index} value={p}>
                  {p}
                </option>
              );
            })}
          </select>

          <label htmlFor="productImage" className="mt-3">
            Hình ảnh sản phẩm :
          </label>
          <label htmlFor="image">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className=" text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Tải lên hình ảnh</p>
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleUploadProduct}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.image[0] ? (
              <div className="flex items-center gap-2">
                {data.image.map((img, index) => {
                  return (
                    <div className="relative group">
                      <img
                        src={img}
                        alt={img}
                        width={80}
                        height={80}
                        className="bg-slate-100 border"
                      />
                      <div
                        className="absolute top-0 p-1 text-sm text-white bg-red-600 rounded-full right-0 hidden group-hover:block cursor-pointer"
                        onClick={() => handleDeleteImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-sm">Vui lòng tải lên hình ảnh</p>
            )}
          </div>


          <label htmlFor="expiry" className="mt-3">
            Hạn sử dụng:
          </label>
          <input
            type="date"
            id="expiry"
            name="expiry"
            value={moment(data.expiry).format('YYYY-MM-DD')}
            onChange={handleOnchange}
            className="p-2 bg-slate-100 border rounded"
           
          />

        <label htmlFor="price" className="mt-3">
            Giá:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Nhập giá"
            value={data.price}
            onChange={handleOnchange}
            className="p-2 bg-slate-100 border rounded"
           
          />

          <label htmlFor="description" className="mt-3">
            Mô tả:
          </label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            name="description"
            id="description"
            placeholder="Nhập mô tả"
            rows={3}
            value={data.description}
            onChange={handleOnchange}
           
          ></textarea>

          <button className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white mb-10">
            {title && title}
          </button>
        </form>
      </div>
    </div>
  )
}

export default UploadProduct

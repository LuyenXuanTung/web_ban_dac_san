import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever, MdRestoreFromTrash } from "react-icons/md";
import DeleteProduct from "./DeleteProduct";

const ProductCard = ({ data, fetchData, setOpenUpdate, setDataUpdate }) => {
  const [openDeleteProduct, setOpenDeleteProduct] = useState(false);

  const handleUpdate = () => {
    setOpenUpdate();
    setDataUpdate();
  };

 

  return (
    <>
      <div className="bg-white col-span-1 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 h-60 py-4 rounded hover:scale-105 transition-all">
        <div className="flex justify-center w-full ">
          <div className="min-w-[150px] max-w-[200px]">
            <img
              src={data?.image[0]}
              alt={data.name}
              style={{ height: "150px" }}
              className="w-full h-full object-contain"
            />
            <h1 className="text-center text-ellipsis line-clamp-2">
              {data?.name}
            </h1>

            <div className="flex items-center justify-center gap-1">
              <div
                className="w-fit p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer "
                onClick={handleUpdate}
              >
                <MdModeEdit />
              </div>
              <div
                className="bg-red-100 hover:bg-red-500 hover:text-white rounded-full p-2 cursor-pointer"
                onClick={() => setOpenDeleteProduct(true)}
              >
                {data?.status ? <MdDeleteForever /> : <MdRestoreFromTrash />}
              </div>
            </div>
          </div>
        </div>
      </div>
      {openDeleteProduct && (
        <DeleteProduct data={data}
         onclose={() => setOpenDeleteProduct(false)}
          callFunc={fetchData}
        /> 
      )}
    </>
  );
};

export default ProductCard;

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../store/newsApi";
import Modal from "../../component/ui/Modal";
import Loader from "../../component/ui/Loader";
import AddProduct from "./product/AddProduct";
import ProductImport from "./product/ProductImport";

const Product = () => {
  // useGetProductsQuery-dən refetch funksiyasını da götürürük
  const { data, isLoading, refetch } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [open, setOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);

  // Modal bağlananda məhsul siyahısını yeniləyək
  useEffect(() => {
    if (!open) {
      refetch();
    }
  }, [open, refetch, data]);

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Məhsulu silmək istədiyinizdən əminsiniz?")) return;

    try {
      await deleteProduct(id).unwrap();
      toast.success("Məhsul uğurla silindi");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Xəta baş verdi");
    }
  };

  return (
    <div className="p-6 w-full bg-gray-900 min-h-screen">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="px-8 py-3 font-semibold rounded bg-blue-600 hover:bg-blue-700 text-white"
        >
          Yeni Məhsul əlavə et
        </button>

        <button
          onClick={() => setImportOpen(true)}
          type="button"
          className="px-8 py-3 font-semibold rounded bg-green-600 hover:bg-green-700 text-white"
        >
          JSON ilə Import et
        </button>
      </div>

      <Modal open={importOpen} setOpen={setImportOpen}>
        <ProductImport setOpen={setImportOpen} refetch={refetch} />
      </Modal>

      <Modal open={open} setOpen={setOpen}>
        <AddProduct setOpen={setOpen} />
      </Modal>

      <div className="flex justify-center w-full">
        {isLoading ? (
          <Loader />
        ) : (
          <ul className="w-full max-w-xl flex flex-col gap-4">
            {data?.length ? (
              data.map((item) => (
                <li
                  key={item.id || item._id}
                  className="p-4 text-white flex justify-between items-center bg-gray-700 rounded hover:bg-gray-600 transition"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-300">{item.price} AZN</p>
                    <p className="text-gray-400 text-sm">
                      Kateqoriya: {item.categoryName || "Yoxdur"}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(item.id || item._id)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
                  >
                    🗑️
                  </button>
                </li>
              ))
            ) : (
              <p className="text-gray-400 text-center">Məhsul tapılmadı</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Product;

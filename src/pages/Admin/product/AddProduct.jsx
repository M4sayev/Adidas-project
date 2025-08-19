import React, { useState } from "react";
import axios from "axios";
import {
  useAddProductMutation,
  useUploadImageMutation,
} from "../../../store/newsApi";
import { toast } from "react-toastify";

const AddProduct = ({ setOpen }) => {
  const [addProduct] = useAddProductMutation();
  const [uploadImage] = useUploadImageMutation();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    brandId: "",
    colors: [],
    sizes: [],
    categoryId: "",
    slug: "",
  });

  const [imageFiles, setImageFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (e) => {
    const { name, selectedOptions } = e.target;
    const values = Array.from(selectedOptions, (option) => option.value);
    setForm((prev) => ({ ...prev, [name]: values }));
  };

  const handleFileChange = async (e) => {
    const files = e.target.files[0];
    const formada = new FormData();
    formada.append("image", files);
    try {
      let imageId = await uploadImage(formada).unwrap();
      setImageFiles([...imageFiles, imageId.id]);
    } catch (error) {
      alert("Şəkil yüklənərkən xəta baş verdi");
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const productData = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        brandId: Number(form.brandId),
        categoryId: Number(form.categoryId),
        images: imageFiles,
      };

      await addProduct(productData).unwrap();

      toast.success("Məhsul uğurla əlavə edildi");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(
        error?.data?.message || "Məhsul əlavə edilərkən xəta baş verdi"
      );
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
          aria-label="Bağla"
          title="Bağla"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Yeni Məhsul Əlavə Et
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ad
            </label>
            <input
              type="text"
              name="name"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Təsvir
            </label>
            <textarea
              name="description"
              rows="3"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Qiymət
              </label>
              <input
                type="number"
                name="price"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stok
              </label>
              <input
                type="number"
                name="stock"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Brand ID
              </label>
              <input
                type="number"
                name="brandId"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Kateqoriya ID
              </label>
              <input
                type="number"
                name="categoryId"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rənglər
            </label>
            <select
              name="colors"
              multiple
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              onChange={handleMultiSelect}
            >
              <option value="Black">Black</option>
              <option value="Red">Red</option>
              <option value="Lavender">Lavender</option>
              <option value="Beige">Beige</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ölçülər
            </label>
            <select
              name="sizes"
              multiple
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              onChange={handleMultiSelect}
            >
              <option value="EU 36">EU 36</option>
              <option value="EU 42">EU 42</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Şəkillər
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Məhsulu əlavə et
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

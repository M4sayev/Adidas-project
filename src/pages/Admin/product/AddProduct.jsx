import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AddProduct = ({ setOpen }) => {
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

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Brands və Categories fetch
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchBrands = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/brand", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Brand-lar alınmadı");
        const data = await res.json();
        setBrands(data);
      } catch (err) {
        console.error("Brand fetch error:", err);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/category", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Kateqoriyalar alınmadı");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Category fetch error:", err);
      }
    };

    fetchBrands();
    fetchCategories();
  }, []);

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
    const files = Array.from(e.target.files);
    setUploading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Login olmalısınız");
        return;
      }

      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch("http://localhost:3000/api/upload/image", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setImageFiles((prev) => [...prev, result.id]);
      }

      toast.success("Şəkillər uğurla yükləndi");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Şəkil yüklənərkən xəta baş verdi");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Login olmalısınız");
        return;
      }

      const productData = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        brandId: Number(form.brandId),
        categoryId: Number(form.categoryId),
        images: imageFiles,
      };

      console.log("Göndərilən məlumat:", productData);

      const response = await fetch("http://localhost:3000/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success response:", result);

      toast.success("Məhsul uğurla əlavə edildi");
      setOpen(false);

      // Form reset
      setForm({
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
      setImageFiles([]);
    } catch (error) {
      console.error("Add product error:", error);
      toast.error("Məhsul əlavə edilərkən xəta baş verdi");
    } finally {
      setSubmitting(false);
    }
  };

  // 🔥 Rekursiv kateqoriya render funksiyası
  const renderCategoryOptions = (categories, depth = 0) => {
    if (!categories || !Array.isArray(categories)) return [];

    return categories.flatMap((category) => {
      const categoryId = category._id || category.id;
      const indentation = "—".repeat(depth);
      const displayName = `${indentation} ${category.name}`;

      const option = (
        <option key={categoryId} value={categoryId}>
          {displayName}
        </option>
      );

      const childrenOptions = renderCategoryOptions(category.children, depth + 1);

      return [option, ...childrenOptions];
    });
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

        <div className="space-y-4">
          {/* Ad */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ad
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              onChange={handleChange}
              required
            />
          </div>

          {/* Təsvir */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Təsvir
            </label>
            <textarea
              name="description"
              value={form.description}
              rows="3"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Qiymət və Stok */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Qiymət
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
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
                value={form.stock}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Brand seçimi */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Brand
            </label>
            <select
              name="brandId"
              value={form.brandId}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Seçin</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          {/* Kateqoriya seçimi */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kateqoriya
            </label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Seçin</option>
              {renderCategoryOptions(categories)}
            </select>
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              onChange={handleChange}
            />
          </div>

          {/* Rənglər */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rənglər
            </label>
            <select
              name="colors"
              multiple
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              onChange={handleMultiSelect}
              size={4}
            >
              <option value="Black">Black</option>
              <option value="Red">Red</option>
              <option value="Lavender">Lavender</option>
              <option value="Beige">Beige</option>
              <option value="White">White</option>
              <option value="Blue">Blue</option>
            </select>
          </div>

          {/* Ölçülər */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ölçülər
            </label>
            <select
              name="sizes"
              multiple
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              onChange={handleMultiSelect}
              size={4}
            >
              <option value="EU 36">EU 36</option>
              <option value="EU 37">EU 37</option>
              <option value="EU 38">EU 38</option>
              <option value="EU 39">EU 39</option>
              <option value="EU 40">EU 40</option>
              <option value="EU 41">EU 41</option>
              <option value="EU 42">EU 42</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>

          {/* Şəkillər */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Şəkillər ({imageFiles.length} yükləndi)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 w-full"
              disabled={uploading}
            />
            {uploading && (
              <div className="mt-2 text-sm text-blue-600">
                Şəkillər yüklənir...
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={submitting || uploading}
            className={`w-full font-semibold py-2 px-4 rounded-md transition duration-200 ${
              submitting || uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {submitting ? "Əlavə edilir..." : "Məhsulu əlavə et"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;

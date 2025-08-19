import React, { useState } from "react";
import { toast } from "react-toastify";

const ProductImport = ({ setOpen, refetch }) => {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        setLoading(true);
        const products = JSON.parse(e.target.result);

        const token = localStorage.getItem("token"); // admin token burada saxlanır

        for (const product of products) {
          const body = { ...product, brandId: 1 };
          const response = await fetch("http://localhost:3000/api/product", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(body),
          });

          if (!response.ok) {
            const errorData = await response.json();
            toast.error(`Xəta: ${errorData.message || "Məhsul əlavə olunmadı"}`);
          }
        }

        toast.success("Məhsullar uğurla əlavə olundu!");
        refetch();
        setOpen(false);
      } catch (err) {
        console.error(err);
        toast.error("Fayl oxunarkən və ya import zamanı xəta baş verdi!");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Məhsul Import</h2>
      <input type="file" accept=".json" onChange={handleFileUpload} />
      {loading && <p>Yüklənir...</p>}
    </div>
  );
};

export default ProductImport;

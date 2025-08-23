import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "./UserAuth";
import { toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await signin(form);
      localStorage.setItem("token", data.token);
      navigate("/");
      toast.success("Daxil oldunuz ✅");
    } catch (err) {
      if (err.response?.status === 404) {
        navigate("/signup");
      } else {
        toast.error("Email və ya şifrə yanlışdır.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-10 rounded-xl shadow-lg w-96 flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-center">Daxil ol</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Şifrə"
          value={form.password}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <button 
          type="submit" 
          disabled={loading}
          className="bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition"
        >
          {loading ? "Yüklənir..." : "Daxil ol"}
        </button>
        <p className="text-sm text-center">
          Hesabınız yoxdur? 
          <span 
            className="text-blue-500 cursor-pointer ml-1" 
            onClick={() => navigate("/signup")}
          >
            Qeydiyyatdan keç
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignIn;

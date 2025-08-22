import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { signup } from "./UserAuth";

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "male"
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(form);
      alert("Hesab yaradıldı! İndi daxil olun.");
      navigate("/signin");
    } catch (err) {
      console.error(err);
      alert("Qeydiyyat zamanı xəta baş verdi.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-10 rounded-xl shadow-lg w-96 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Qeydiyyat</h2>
        <div className="flex gap-3">
          <input
            type="text"
            name="firstName"
            placeholder="Ad"
            value={form.firstName}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Soyad"
            value={form.lastName}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>
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
        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
          required
        />
        <select 
          name="gender" 
          value={form.gender} 
          onChange={handleChange} 
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="male">Kişi</option>
          <option value="female">Qadın</option>
        </select>
        <button 
          type="submit" 
          disabled={loading}
          className="bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition"
        >
          {loading ? "Yüklənir..." : "Qeydiyyat"}
        </button>
        <p className="text-sm text-center">
          Hesabınız var? 
          <span 
            className="text-blue-500 cursor-pointer ml-1" 
            onClick={() => navigate("/signin")}
          >
            Daxil ol
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/auth",
});

// Sign Up
export const signup = (formData) => API.post("/signup", formData);

// Sign In
export const signin = (formData) => API.post("/signin", formData);

// Reset Password
export const resetPassword = (formData) => API.post("/reset-password", formData);

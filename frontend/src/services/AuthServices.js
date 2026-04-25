// src/services/authService.js
import axios from "axios";

export const getCurrentUser = async () => {
  const res = await axios.get("http://localhost:5000/api/auth/me", { withCredentials: true });
  return res.data.user;
};

export const login = async (email, password) => {
  const res = await axios.post(
    "http://localhost:3000/api/auth/login",
    { email, password },
    { withCredentials: true }
  );
  return res.data;
};

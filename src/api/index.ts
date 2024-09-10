import axios from "axios";

export const apiVito = axios.create({
  baseURL: "https://planpartyapirepos.onrender.com/api",
});

export const apiFelipe = axios.create({
  baseURL: "https://plan-paty-back-felipe.onrender.com",
});

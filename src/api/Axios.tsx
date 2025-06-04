import axios from "axios";

export const brregApi = axios.create({
  baseURL: import.meta.env.VITE_BRREG_API_BASE_URL
});

export const customerApi = axios.create({
  baseURL: import.meta.env.VITE_CUSTOMER_API_BASE_URL
});
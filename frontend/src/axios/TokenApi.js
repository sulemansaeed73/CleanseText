import axios from "axios";
import store from "@/app/store";


const TokenApi = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

TokenApi.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = JSON.parse(localStorage.getItem("persist:auth"));


    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default TokenApi;

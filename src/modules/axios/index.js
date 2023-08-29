import axios from "axios";

const baseURL = "http://localhost:3001";
const instance = axios.create({ baseURL });

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.access_token = `${token}`;
  }
  return config;
});

export { instance };
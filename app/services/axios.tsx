import axios from "axios";
import { parseCookies } from "nookies";

export const getToken = () => {
  return parseCookies().token;
};

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000,
});

axiosInstance.interceptors.request.use((request) => {
  let { token } = parseCookies();
  console.log("token", token);
  request.headers["Content-Type"] = "application/json";
  request.headers["Access-Control-Allow-Origin"] = "*";
  if (token && !request.headers["Authorization"]) {
    request.headers["Authorization"] = `Bearer ${getToken()}`;
  }
  console.log("request.headers", request.headers);
  return request;
});

import axios from "axios";
import { BASE_URL } from "../config";
import { googleLogout } from "@react-oauth/google";

const defaultOptions = {
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

// Create axios instance
const axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use(
  async (config) => interceptors.requestHandler(config),
  async (error) => interceptors.requestErrorHandler(error)
);

axiosInstance.interceptors.response.use(
  async (response) => interceptors.responseHandler(response),
  async (error) => interceptors.responseErrorHandler(error)
);

export default axiosInstance;

//request handler
const requestHandler = async (config) => {
  const accessToken = localStorage.getItem("access_token");
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

//request error handler
const requestErrorHandler = async (error) => {
  return Promise.reject({ ...error });
};

//response handler
const responseHandler = async (response) => {
  return response;
};

//response error handler
const responseErrorHandler = async (error) => {
  if (error.response) {
    //for checking if this request has authentication 401 error and if it is  already called
    if (error.response.status === 401) {
      console.log("authentication error");
      googleLogout();
      window.location.href = "/";
    }
  }
  return Promise.reject({ ...error });
};

//export
export const interceptors = {
  requestHandler,
  requestErrorHandler,
  responseHandler,
  responseErrorHandler,
};

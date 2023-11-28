import axios from "axios";

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
  });

  axiosSecure.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

    return config;
  });

  return axiosSecure;
};

export default useAxiosSecure;

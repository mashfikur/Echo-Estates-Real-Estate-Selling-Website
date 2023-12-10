import axios from "axios";
import useAuth from "./useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useAxiosSecure = () => {
  const { userSignOut } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
  });

  axiosSecure.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  });

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (err) => {
      const status = err.response.status;
      if (status === 401 || status === 403) {
        userSignOut();
        navigate("/login");
        return toast.error("An error occured , Login properly to fix it");
      }
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;

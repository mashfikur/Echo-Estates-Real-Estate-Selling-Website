import axios from "axios";

const useAxiosPublic = () => {
  const axiosPublic = axios.create({
    baseURL: "https://echo-estates-server.vercel.app",
  });

  return axiosPublic;
};

export default useAxiosPublic;

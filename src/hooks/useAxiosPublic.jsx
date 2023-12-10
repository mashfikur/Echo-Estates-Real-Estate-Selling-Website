import axios from "axios";

// https://echo-estates-server.vercel.app

const useAxiosPublic = () => {
  const axiosPublic = axios.create({
    baseURL: "http://localhost:5000",
  });

  return axiosPublic;
};

export default useAxiosPublic;

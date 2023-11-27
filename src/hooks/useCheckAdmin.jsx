import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useCheckAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isPending } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      if (user) {
        return axiosSecure
          .get(`/api/v1/user/check-admin/${user?.uid}`)
          .then((res) => {
            return res.data.isAdmin;
          });
      }
    },
  });

  return [data, isPending];
};

export default useCheckAdmin;

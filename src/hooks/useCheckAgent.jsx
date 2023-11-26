import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useCheckAgent = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isPending } = useQuery({
    queryKey: ["isAgent", user?.email],
    queryFn: async () => {
      if (user) {
        return axiosSecure
          .get(`/api/v1/user/check-agent/${user?.uid}`)
          .then((res) => {
            return res.data;
          });
      }
    },
  });

  return [data, isPending];
};

export default useCheckAgent;

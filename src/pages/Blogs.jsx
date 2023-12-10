import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Blogs = () => {
  const axiosPublic = useAxiosPublic();

  const { data } = useQuery({
    queryKey: ["all-blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/v1/user/get-blogs");
      return res.data;
    },
  });


  return (
    <div>
      <h3 className="text-center font-semibold pt-24">
        Welcome to our blogs page : {data && data.length}
      </h3>
    </div>
  );
};

export default Blogs;

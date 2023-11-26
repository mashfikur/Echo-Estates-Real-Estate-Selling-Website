import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../components/Dashboard/SectionHeading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const MyAddedProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data,isPending } = useQuery({
    queryKey: ["added-properties"],
    queryFn: async () => {
      if (user) {
        const res = await axiosSecure.get(
          `/api/v1/agent/added-properties/${user.uid}`
        );
        return res.data;
      }
    },
  });

  return (
    <div>
      <SectionHeading title={"My Added Properties"}> </SectionHeading>

      <h3 className="text-center font-semibold text-gray-400 ">
        Find out all the properties you have added to our website . Manage them
        easily
      </h3>

      <div className="max-w-6xl mt-12 mx-auto">
        <div>hello : {data?.length} </div>
      </div>
    </div>
  );
};

export default MyAddedProperties;

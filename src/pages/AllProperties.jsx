import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import PropertyCard from "../components/Dashboard/Agent/PropertyCard";
import { Container } from "@mui/material";
import { ThreeCircles } from "react-loader-spinner";

const AllProperties = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isPending } = useQuery({
    queryKey: ["all-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/v1/user/verified-properties");
      return res.data;
    },
  });

  return (
    <div className="min-h-screen mt-28">
      <h3 className="text-center font-playfair text-4xl lg:text-6xl">
        All Properties
      </h3>

      <p className="text-center p-4 lg:p-0 font-semibold capitalize lg:my-8 text-gray-400">
        welcome to a seamless home-buying experience , Browse from our
        collection for your Dream Property{" "}
      </p>

      <div className="my-12">
        {isPending ? (
          <div className="mt-32 flex items-center justify-center ">
            <ThreeCircles
              height="100"
              width="100"
              color="#A9BEDA"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />
          </div>
        ) : (
          <Container maxWidth="xl">
            {data.length ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4">
                {data &&
                  data.map((item) => (
                    <PropertyCard key={item._id} info={item}></PropertyCard>
                  ))}
              </div>
            ) : (
              <div>
                <h3 className="text-center font-semibold my-32 text-4xl text-gray-400">
                  No Property Available
                </h3>
              </div>
            )}
          </Container>
        )}
      </div>
    </div>
  );
};

export default AllProperties;

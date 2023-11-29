import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../components/Dashboard/SectionHeading";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ThreeCircles } from "react-loader-spinner";
import OfferedCard from "../../components/Dashboard/User/OfferedCard";
import { Helmet } from "react-helmet-async";

const PropertyBought = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isPending } = useQuery({
    queryKey: ["offered", user?.uid],
    queryFn: async () => {
      if (user) {
        const res = await axiosSecure(
          `/api/v1/user/get-offered-properties/${user?.uid}`
        );

        return res.data;
      }
    },
  });

  return (
    <div>
      <Helmet>
        <title>Echo Estates | Property Bought </title>
      </Helmet>
      <SectionHeading title={"Property Bought"}></SectionHeading>
      <p className="text-center font-semibold text-gray-400 my-6 text-lg">
        Browse all of your offered properties here . Wait for {"Owner's"}{" "}
        response
      </p>

      <div className="max-w-6xl my-10 mx-auto">
        {isPending ? (
          <>
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
          </>
        ) : data && data.length ? (
          <div className="grid grid-cols-1 gap-7 lg:gap-4  lg:grid-cols-2 xl:grid-cols-3">
            {data &&
              data.map((item) => (
                <OfferedCard
                  property_id={item._id}
                  key={item._id}
                  info={item}
                ></OfferedCard>
              ))}
          </div>
        ) : (
          <div className="text-center my-24 lg:my-40">
            <h3 className=" text-3xl lg:text-5xl font-semibold text-gray-400">
              {" "}
              You {"haven't"} make offer to any property yet{" "}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyBought;

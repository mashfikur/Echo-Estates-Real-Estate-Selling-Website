import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../components/Dashboard/SectionHeading";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PropertyCard from "../../components/Dashboard/Agent/PropertyCard";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { ThreeCircles } from "react-loader-spinner";
import OfferedCard from "../../components/Dashboard/User/OfferedCard";

const PropertyBought = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, refetch, isPending } = useQuery({
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

  const handleWishListRemove = (_id) => {
    Swal.fire({
      title: "Do you want to remove this property?",
      text: "It won't be in your list after that!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/api/v1/user/remove-wishlist/${_id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              toast.success("Removed from your wishlist");
              refetch();
            }
          });
      }
    });
  };

  return (
    <div>
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
                <OfferedCard key={item._id} info={item}></OfferedCard>
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

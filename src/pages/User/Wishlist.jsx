import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../components/Dashboard/SectionHeading";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PropertyCard from "../../components/Dashboard/Agent/PropertyCard";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Wishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, refetch } = useQuery({
    queryKey: ["wishlist", user?.uid],
    queryFn: async () => {
      if (user) {
        const res = await axiosSecure(`/api/v1/user/get-wishlist/${user?.uid}`);

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
      <SectionHeading title={"Wishlist"}></SectionHeading>
      <p className="text-center font-semibold text-gray-400 my-6 text-lg">
        Browse all of your wishlisted properties here . Choose what you want to
        do next.
      </p>

      <div className="max-w-6xl mt-10 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {data &&
            data.map((item) => (
              <PropertyCard
                handleWishListRemove={handleWishListRemove}
                key={item._id}
                info={item}
              ></PropertyCard>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;

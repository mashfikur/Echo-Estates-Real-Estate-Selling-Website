import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../components/Dashboard/SectionHeading";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ThreeCircles } from "react-loader-spinner";
import ReviewCard from "../../components/Home/ReviewCard";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isPending, refetch } = useQuery({
    queryKey: ["single-user-review", user?.uid],
    queryFn: async () => {
      if (user) {
        const res = await axiosSecure.get(
          `/api/v1/user/get-reviews/${user.uid}`
        );
        return res.data;
      }
    },
  });

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Do you want to delete this review?",
      text: "It won't be reverted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes , Do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/api/v1/user/delete-review/${_id}`).then((res) => {
          if (res.data.deletedCount) {
            toast.success(`Successfully deleted the review`);
            refetch();
          }
        });
      }
    });
  };

  return (
    <div>
      <SectionHeading title={"My Reviews"}></SectionHeading>

      <h3 className="text-center font-semibold text-gray-400 ">
        Here you can find all the reviews you have made about {"someone's"}{" "}
        property and manage them
      </h3>

      <div className="max-w-6xl mx-auto">
        {isPending ? (
          <div className=" min-h-screen flex items-center justify-center ">
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
        ) : data.length ? (
          <div className="grid grid-cols-1  gap-5 xl:gap-20 lg:grid-cols-2 xl:grid-cols-3 mt-20">
            {data &&
              data.map((review) => (
                <ReviewCard
                  handleDelete={handleDelete}
                  key={review._id}
                  review={review}
                ></ReviewCard>
              ))}
          </div>
        ) : (
          <div>
            {" "}
            <h3 className="text-center text-gray-400 capitalize font-semibold text-3xl">
              No Reviews Available for this property
            </h3>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReviews;

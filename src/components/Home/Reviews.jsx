import { useRef, useState } from "react";
import ReviewDialog from "./ReviewDialog";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import ReviewCard from "./ReviewCard";
import { ThreeCircles } from "react-loader-spinner";

const Reviews = ({ property_id, agent_name, property_title }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(1);
  const reviewRef = useRef(null);
  const axiosSecure = useAxiosSecure();

  const { data, isPending, refetch } = useQuery({
    queryKey: ["property_review", property_id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/v1/property/get-reviews/${property_id}`
      );

      return res.data;
    },
  });

  const handleSubmit = () => {
    const description = reviewRef.current.value;
    console.log(description, value);
    if (description.length) {
      setOpen(false);

      const info = {
        reviewer_image: user.photoURL,
        reviewer_email: user.email,
        reviewer_name: user.displayName,
        reviewer_id: user.uid,
        review_desc: description,
        review_time: Date.now(),
        agent_name,
        property_title,
        property_id,
        rating: value,
      };

      axiosSecure.post("/api/v1/user/add-review", info).then((res) => {
        if (res.data.insertedId) {
          toast.success("Thank you for sharing your review ");
          setValue(1);
          refetch();
        }
      });
    }
  };

  return (
    <div>
      <div className=" min-h-screen">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div></div>
          <h3 className="text-white font-playfair font-semibold underline text-[2.3rem] text-center">
            Property Reviews
          </h3>
          <div className="flex justify-center h-14 lg:justify-end">
            <ReviewDialog
              reviewRef={reviewRef}
              handleSubmit={handleSubmit}
              open={open}
              setOpen={setOpen}
              value={value}
              setValue={setValue}
            ></ReviewDialog>
          </div>
        </div>
        <div className="py-40">
          {isPending ? (
            <div className="mt-32 min-h-screen flex items-center justify-center ">
              <ThreeCircles
                height="100"
                width="100"
                color="#fff"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 xl:gap-20 lg:grid-cols-3 xl:grid-cols-4">
              {data &&
                data.map((review) => (
                  <ReviewCard key={review._id} review={review}></ReviewCard>
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
    </div>
  );
};

export default Reviews;

Reviews.propTypes = {
  property_id: PropTypes.string,
  agent_name: PropTypes.string,
  property_title: PropTypes.string,
};

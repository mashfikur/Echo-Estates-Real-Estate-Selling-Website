import { useRef, useState } from "react";
import ReviewDialog from "./ReviewDialog";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Reviews = ({ property_id, agent_name, property_title }) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const reviewRef = useRef(null);
  const axiosSecure = useAxiosSecure();

  const handleSubmit = () => {
    const value = reviewRef.current.value;
    if (value.length) {
      setOpen(false);

      const info = {
        reviewer_image: user.photoURL,
        reviewer_email: user.email,
        reviewer_name: user.displayName,
        reviewer_id: user.uid,
        review_desc: value,
        review_time: Date.now(),
        agent_name,
        property_title,
        property_id,
      };

      axiosSecure.post("/api/v1/user/add-review", info).then((res) => {
        if (res.data.insertedId) {
          toast.success("Thank you for sharing your review ");
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
          <div className="flex justify-center lg:justify-end">
            <ReviewDialog
              reviewRef={reviewRef}
              handleSubmit={handleSubmit}
              open={open}
              setOpen={setOpen}
            ></ReviewDialog>
          </div>
        </div>
        <div className="py-40 text-white">review cards</div>
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

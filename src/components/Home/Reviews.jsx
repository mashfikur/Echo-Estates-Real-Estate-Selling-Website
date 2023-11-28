import { useRef, useState } from "react";
import ReviewDialog from "./ReviewDialog";

const Reviews = () => {
  const [open, setOpen] = useState(false);
  const reviewRef = useRef(null);

  const handleSubmit = () => {
    const value = reviewRef.current.value;
    if (value.length) {
      console.log(value);
      setOpen(false);
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

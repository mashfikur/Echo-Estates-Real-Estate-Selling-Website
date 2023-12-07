import { Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ReviewCard from "./ReviewCard";
import { ThreeCircles } from "react-loader-spinner";
import Marquee from "react-fast-marquee";
import starLeft from "../../assets/images/star.svg";
import starRight from "../../assets/images/star-2.svg";

const LatestReviews = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isPending } = useQuery({
    queryKey: ["latest-reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/public/get-reviews`);

      return res.data;
    },
  });

  return (
    <div>
      <Container maxWidth="xl">
        <Typography
          sx={{
            fontWeight: "600",
            textDecoration: "underline",
            fontFamily: '"Playfair Display", serif ',
          }}
          align="center"
          variant="h3"
        >
          <div className="flex justify-center space-x-5">
            <img src={starLeft} alt="star-icon" className="w-16" />
            <h1>Latest reviews</h1>
            <img src={starRight} alt="star-icon" className="w-16" />
          </div>
        </Typography>
        <Typography sx={{ mt: "1.5rem" }} align="center" variant="subtitle1">
          See what our users are saying !
        </Typography>
      </Container>
      <div className="my-10">
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
          <div>
            <Marquee
              pauseOnHover={true}
              className="bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-400 to-indigo-900 py-10"
            >
              {data &&
                data.map((review) => (
                  <div className="mx-10" key={review._id}>
                    <ReviewCard review={review}></ReviewCard>
                  </div>
                ))}
            </Marquee>
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

export default LatestReviews;

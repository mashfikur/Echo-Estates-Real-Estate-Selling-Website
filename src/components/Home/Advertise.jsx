import { Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PropertyCard from "../Dashboard/Agent/PropertyCard";
import { ThreeCircles } from "react-loader-spinner";

const Advertise = () => {
  const axiosPublic = useAxiosPublic();

  const { data, isPending } = useQuery({
    queryKey: ["advertised"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/v1/advertised-properties");

      return res.data;
    },
  });

  return (
    <div id="advertisement" className="my-20">
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
          Top Picks For You
        </Typography>
        <Typography sx={{ mt: "1.5rem" }} align="center" variant="subtitle1">
          Unlock Your Dream Home: Explore Our Exclusive Listings Today!
        </Typography>
      </Container>
      <div className="">
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
    </div>
  );
};

export default Advertise;

import { Button, Container, IconButton } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PinDropIcon from "@mui/icons-material/PinDrop";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import EmailIcon from "@mui/icons-material/Email";
import FavoriteIcon from "@mui/icons-material/Favorite";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { ThreeCircles } from "react-loader-spinner";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PropertyDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data, isPending } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/user/property/details/${id}`);

      return res.data;
    },
  });

  // using mutation
  const mutation = useMutation({
    mutationFn: (info) => {
      return axiosSecure.post("/api/v1/user/add-to-wishlist", info);
    },
  });

  // Add Button Event handler
  const handleAddToWishList = () => {
    console.log(user,'real')
    const info = {
      property_id: id,
      wishlisted_by: user.uid,
    };

    // mutating the data
    mutation.mutate(info);
  };

  useEffect(() => {
    if (mutation.isError) {
      toast.error(mutation.error.message);
      mutation.reset();
    }

    if (mutation.isSuccess) {
      toast.success("Added to your wishlist");
      mutation.reset();
    }
  }, [mutation]);

  return (
    <div className="  lg:mt-20 details-banner">
      <div className="pt-28 lg:pt-0">
        <Container maxWidth="xl">
          {/* details  */}

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
          ) : (
            <div className="flex pb-10 min-h-screen  flex-col-reverse gap-10 lg:gap-0 lg:flex-row  items-center text-white">
              <div className="flex-1 md:text-center lg:text-left">
                <div className="mx-auto flex justify-center lg:justify-start">
                  <IconButton
                    sx={{ backgroundColor: "white", mb: "2rem" }}
                    color="primary"
                    size="medium"
                    onClick={() => navigate(-1)}
                  >
                    <ArrowBackIcon></ArrowBackIcon>
                  </IconButton>
                </div>
                <h3 className="capitalize text-4xl font-bold">
                  {" "}
                  {data?.property_title}{" "}
                </h3>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold mt-8">
                    {" "}
                    <span className="text-gray-400">
                      {" "}
                      <PinDropIcon></PinDropIcon> Location :
                    </span>{" "}
                    {data?.property_location}{" "}
                  </h3>
                  <h3 className="text-lg font-semibold">
                    {" "}
                    <span className="text-gray-400">
                      {" "}
                      <LocalOfferIcon></LocalOfferIcon> Price Range :
                    </span>{" "}
                    ${data?.price_range[0]}k -${data?.price_range[1]}k ({"USD"})
                  </h3>
                  <h3 className="text-lg font-semibold">
                    {" "}
                    <span className="text-gray-400">
                      {" "}
                      <AdminPanelSettingsIcon></AdminPanelSettingsIcon> Owner:
                    </span>{" "}
                    {data?.agent_name}
                  </h3>
                  <h3 className="text-lg font-semibold">
                    {" "}
                    <span className="text-gray-400">
                      {" "}
                      <EmailIcon></EmailIcon> Owners Email:
                    </span>{" "}
                    {data?.agent_email}
                  </h3>
                </div>
                <div className=" mt-10 lg:mt-14 mx-auto ">
                  <Button
                    onClick={handleAddToWishList}
                    sx={{
                      padding: ".7rem 1rem",
                      width: { xs: "100%", sm: "inherit" },
                    }}
                    startIcon={<FavoriteIcon></FavoriteIcon>}
                    variant="contained"
                    color="warning"
                  >
                    {mutation.isPending ? "Adding..." : "Add to Wishlist"}
                  </Button>
                </div>
              </div>
              <div className="flex-1">
                <img
                  className="w-[100%] mx-auto rounded-lg shadow-lg"
                  src={data?.property_image}
                  alt=""
                />
              </div>
            </div>
          )}

          {/* users review */}
          <div className=" min-h-screen">
            <h3 className="text-white font-semibold underline text-4xl text-center">
              Property Reviews
            </h3>
            <div className="py-40">reviw cards</div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default PropertyDetails;

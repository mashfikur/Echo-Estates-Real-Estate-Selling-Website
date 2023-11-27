import { Button, Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PinDropIcon from "@mui/icons-material/PinDrop";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import EmailIcon from "@mui/icons-material/Email";
import FavoriteIcon from "@mui/icons-material/Favorite";

const PropertyDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/user/property/details/${id}`);

      return res.data;
    },
  });

  return (
    <div className="mt-20 details-banner">
      <div className="pt-24">
        <Container maxWidth="xl">
          <div className="flex items-center text-white ">
            <div className="flex-1 ">
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
              <div className="mt-14">
                <Button
                  sx={{ padding: ".7rem 1rem" }}
                  startIcon={<FavoriteIcon></FavoriteIcon>}
                  variant="contained"
                  color="warning"
                >
                  Add to Wishlist
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
        </Container>
      </div>
    </div>
  );
};

export default PropertyDetails;

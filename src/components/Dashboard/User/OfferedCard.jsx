import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import PropTypes from "prop-types";
import { Button, Chip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate } from "react-router-dom";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";

export default function OfferedCard({ info }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: 345, mx: "auto", height: 530 }}>
      <div className="flex flex-col relative">
        {/* card header */}
        <div>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="User Photo">
                <img src={info?.agent_image} alt="" />
              </Avatar>
            }
            title={<h1 className="text-base font-bold">{info?.agent_name}</h1>}
            subheader={<h3 className="">Property Owner</h3>}
            action={
              <Chip
                sx={{ textAlign: "end", mt: "1rem" }}
                size="small"
                label={info?.status}
                color={
                  info?.status === "pending"
                    ? "warning"
                    : info?.status === "accepted"
                    ? "success"
                    : info?.status === "bought"
                    ? "secondary"
                    : info?.status === "rejected" && "error"
                }
              ></Chip>
            }
          />
        </div>
        {/* card media */}
        <div>
          <CardMedia
            component="img"
            sx={{ height: "200px" }}
            image={info?.property_image}
            alt="Property Image"
          />
        </div>
        {/* card content */}
        <div>
          <CardContent>
            <Typography height={65} variant="h5">
              {info?.property_title}
            </Typography>

            <Typography
              sx={{ mt: "1rem" }}
              variant="subtitle1"
              color="text.secondary"
              height={50}
            >
              <LocationOnIcon></LocationOnIcon>{" "}
              <span className="font-bold">Location:</span>{" "}
              {info?.property_location}
            </Typography>
            <Typography
              sx={{ mt: ".5rem" }}
              variant="subtitle1"
              color="text.secondary"
            >
              <PriceCheckIcon></PriceCheckIcon>{" "}
              <span className="font-bold">Offered Amount:</span> $
              {info?.offered_price}k
            </Typography>
          </CardContent>
        </div>
        {/* card actions */}
        <div className="-mt-4">
          <CardActions>
            <>
              {info?.status === "accepted" ? (
                <Button
                  onClick={() => navigate(`/dashboard/payment/${info._id}`)}
                  sx={{ borderRadius: "30px", mx: "auto" }}
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<RequestQuoteIcon></RequestQuoteIcon>}
                >
                  Pay
                </Button>
              ) : (
                <></>
              )}
            </>
          </CardActions>
        </div>
      </div>
    </Card>
  );
}

OfferedCard.propTypes = {
  info: PropTypes.object,
};

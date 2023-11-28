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
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TocIcon from "@mui/icons-material/Toc";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";

export default function OfferedCard({
  info,
  handleWishListRemove,
  handlePropertyDelete,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Card sx={{ width: 345, mx: "auto" }}>
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
                    : info?.status === "verified"
                    ? "success"
                    : ""
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
            <Typography height={70} variant="h5">
              {info?.property_title}
            </Typography>

            <Typography
              sx={{ mt: "1rem" }}
              variant="subtitle1"
              color="text.secondary"
            >
              <LocationOnIcon></LocationOnIcon> {info?.property_location}
            </Typography>
            <Typography
              sx={{ mt: "1rem" }}
              variant="subtitle1"
              color="text.secondary"
            >
              <LocationOnIcon></LocationOnIcon> Offered Amount :{" "}
              {info?.offered_price}
            </Typography>
          </CardContent>
        </div>
        {/* card actions */}
        <div className="">
          <CardActions>
            <>
              {" "}
              <Button
                onClick={() =>
                  navigate(`/dashboard/wishlist/make-offer/${info._id}`)
                }
                sx={{ borderRadius: "30px" }}
                variant="contained"
                color="success"
                endIcon={<RequestQuoteIcon></RequestQuoteIcon>}
              >
                Make An Offer
              </Button>
              <Button
                onClick={() => handleWishListRemove(info._id)}
                sx={{ borderRadius: "30px" }}
                variant="contained"
                endIcon={<DeleteIcon></DeleteIcon>}
                color="error"
              >
                Remove
              </Button>
            </>
          </CardActions>
        </div>
      </div>
    </Card>
  );
}

OfferedCard.propTypes = {
  info: PropTypes.object,
  handleWishListRemove: PropTypes.func,
  handlePropertyDelete: PropTypes.func,
};
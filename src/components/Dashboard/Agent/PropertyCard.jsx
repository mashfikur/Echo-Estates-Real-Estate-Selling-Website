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
import { useLocation } from "react-router-dom";
import TocIcon from "@mui/icons-material/Toc";

export default function PropertyCard({ info }) {
  const location = useLocation();

  return (
    <Card sx={{ maxWidth: 345, mx: "auto" }}>
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
            label={info?.verification_status}
            color={
              info?.verification_status === "pending"
                ? "warning"
                : info?.verification_status === "verified"
                ? "success"
                : ""
            }
          ></Chip>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={info?.property_image}
        alt="Property Image"
      />
      <CardContent>
        <Typography variant="h5">{info?.property_title}</Typography>

        <Typography
          sx={{ mt: "1rem" }}
          variant="subtitle1"
          color="text.secondary"
        >
          <LocationOnIcon></LocationOnIcon> {info?.property_location}
        </Typography>

        <Typography
          sx={{ mt: "0rem" }}
          variant="subtitle1"
          color="text.secondary"
        >
          <MonetizationOnIcon></MonetizationOnIcon>{" "}
          {`$${info?.price_range[0]}k - $${info?.price_range[1]}k`}
        </Typography>
      </CardContent>

      <CardActions>
        <div className="flex justify-between  w-full">
          {location.pathname === "/all-properties" ? (
            <>
              <Button
                sx={{
                  borderRadius: "30px",
                  mx: "auto",
                  backgroundColor: "black",
                }}
                variant="contained"
                endIcon={<TocIcon></TocIcon>}
              >
                Details
              </Button>
            </>
          ) : (
            <>
              <Button
                sx={{ borderRadius: "30px" }}
                variant="contained"
                endIcon={<BorderColorIcon></BorderColorIcon>}
              >
                Update
              </Button>
              <Button
                sx={{ borderRadius: "30px" }}
                variant="contained"
                endIcon={<DeleteIcon></DeleteIcon>}
                color="error"
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </CardActions>
    </Card>
  );
}

PropertyCard.propTypes = {
  info: PropTypes.object,
};

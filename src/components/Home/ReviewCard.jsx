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
import CommentIcon from "@mui/icons-material/Comment";
import Rating from "@mui/material/Rating";

export default function ReviewCard({ review }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Card sx={{ width: { sm: 300, lg: 345, xs: 345 }, mx: "auto" }}>
      <div className="flex flex-col relative">
        {/* card header */}
        <div>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="User Photo">
                <img src={review?.reviewer_image} alt="reviewer_image" />
              </Avatar>
            }
            title={
              <h1 className="text-base font-bold">{review?.reviewer_name}</h1>
            }
            action={<Rating name="read-only" value={review?.rating} readOnly />}
          />
        </div>
        {/* card content */}
        <div>
          <CardContent>
            {location.pathname === "/" && (
              <Typography height={70} sx={{ fontWeight: "600" }} variant="h5">
                {review?.property_title}
              </Typography>
            )}

            <h3 className="text-gray-400  font-semibold">
              <CommentIcon></CommentIcon> Description :
            </h3>

            <Typography height={100} sx={{ mt: ".5rem" }} variant="h6">
              &quot; {review?.review_desc} &quot;
            </Typography>
          </CardContent>
        </div>
        {/* card actions */}
        <div className="">
          <CardActions>
            <div className="flex justify-between  w-full">
              {location.pathname === "/dashboard/my-reviews" && (
                <Button
                  sx={{
                    borderRadius: "30px",
                    mx: "auto",
                  }}
                  variant="contained"
                  endIcon={<DeleteIcon></DeleteIcon>}
                  color="error"
                >
                  Delete
                </Button>
              )}
            </div>
          </CardActions>
        </div>
      </div>
    </Card>
  );
}

ReviewCard.propTypes = {
  review: PropTypes.object,
};

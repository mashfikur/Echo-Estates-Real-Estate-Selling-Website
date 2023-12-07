import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useLocation } from "react-router-dom";
import CommentIcon from "@mui/icons-material/Comment";
import Rating from "@mui/material/Rating";

export default function ReviewCard({ review, handleDelete }) {
  const location = useLocation();

  const time = new Date(review.review_time).toLocaleString();
  const hour = time.split(":")[0];
  const min = time.split(":")[1];
  const part = time.split(":")[2].split(" ")[1];

  return (
    <Card
      sx={{
        width: { sm: 300, lg: 345, xs: 345 },
        mx: "auto",
        borderRadius: "20px",
      }}
    >
      <div className="flex flex-col relative">
        {/* card header */}
        <div>
          <CardHeader
            avatar={
              <Avatar
                src={review?.reviewer_image}
                alt="reviewer_image"
              ></Avatar>
            }
            title={
              <h1 className="text-base font-bold">{review?.reviewer_name}</h1>
            }
            action={<Rating name="read-only" value={review?.rating} readOnly />}
            subheader={`${hour}:${min}${part}`}
          />
        </div>
        {/* card content */}
        <div>
          <CardContent>
            {(location.pathname === "/" ||
              location.pathname === "/dashboard/my-reviews" ||
              location.pathname === "/dashboard/manage-reviews") && (
              <Link
                to={`/all-properties/property/details/${review.property_id}`}
              >
                <Typography height={70} sx={{ fontWeight: "600" }} variant="h5">
                  {review?.property_title}
                </Typography>
              </Link>
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
              {(location.pathname === "/dashboard/my-reviews" ||
                location.pathname === "/dashboard/manage-reviews") && (
                <Button
                  onClick={() => handleDelete(review._id)}
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
  handleDelete: PropTypes.func,
};

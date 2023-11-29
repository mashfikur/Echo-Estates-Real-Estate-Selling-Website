import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ReviewsIcon from "@mui/icons-material/Reviews";
import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";
export default function ReviewDialog({
  reviewRef,
  handleSubmit,
  open,
  setOpen,
  value,
  setValue,
}) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        endIcon={<ReviewsIcon></ReviewsIcon>}
        variant="contained"
        onClick={handleClickOpen}
      >
        Add a Review
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          Property Review{" "}
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              if (newValue) {
                setValue(newValue);
              }
            }}
          />{" "}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Share your thoughts ! What do you think about this property?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Your Review"
            type="text"
            fullWidth
            variant="standard"
            inputRef={reviewRef}
          />
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            variant="contained"
            sx={{ borderRadius: "25px", px: "1.5rem", py: ".5rem" }}
            onClick={handleClose}
            color="error"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ borderRadius: "25px", px: "1.5rem", py: ".5rem" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

ReviewDialog.propTypes = {
  reviewRef: PropTypes.object,
  handleSubmit: PropTypes.func,
  open: PropTypes.bool,
  value: PropTypes.number,
  setOpen: PropTypes.func,
  setValue: PropTypes.func,
};

import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function BlogModal({ open, handleClose, _id }) {
  const axiosPublic = useAxiosPublic();

  const { data } = useQuery({
    queryKey: ["blog-details", _id],
    queryFn: async () => {
      if (_id) {
        const res = await axiosPublic.get(`/api/v1/blog/${_id}/details`);
        return res.data;
      }
    },
  });

  return (
    <React.Fragment>
      {data && (
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {data && data.blog_title}
          </DialogTitle>
          <hr />
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Typography gutterBottom>
              {data && data.blog_description}
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button
              autoFocus
              variant="contained"
              sx={{ borderRadius: "20px" }}
              color="error"
              onClick={handleClose}
            >
              Close
            </Button>
          </DialogActions>
        </BootstrapDialog>
      )}
    </React.Fragment>
  );
}

BlogModal.propTypes = {
  open: PropTypes.bool,
  handleClickOpen: PropTypes.func,
  handleClose: PropTypes.func,
  _id: PropTypes.string,
};

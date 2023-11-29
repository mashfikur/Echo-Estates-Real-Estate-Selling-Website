import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import toast from "react-hot-toast";
import { updateProfile, getAuth } from "firebase/auth";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
const apiKey = import.meta.env.VITE_IMAGE_API_KEY;
const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

export default function EditProfile() {
  const [open, setOpen] = React.useState(false);
  const [updating, setUpdating] = React.useState(false);
  const nameRef = React.useRef(null);
  const axiosPublic = useAxiosPublic();
  const { user, setUser } = useAuth();

  const auth = getAuth();

  const handleSubmit = () => {
    const name = nameRef.current.value;
    const fileLength = document.getElementById("imageInput").files.length;
    const files = document.getElementById("imageInput").files[0];

    setUpdating(true);

    if (fileLength && name) {
      axiosPublic
        .post(
          url,
          { image: files },
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            updateProfile(auth.currentUser, {
              displayName: name,
              photoURL: res?.data?.data?.display_url,
            })
              .then(() => {
                setUser({
                  ...user,
                  photoURL: res?.data?.data?.display_url,
                  displayName: name,
                });
                setUpdating(false);
                setOpen(false);
                return toast.success("Updated Profile Successfully");
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      return;
    }

    if (fileLength) {
      console.log(files);
      axiosPublic
        .post(
          url,
          { image: files },
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            updateProfile(auth.currentUser, {
              photoURL: res?.data?.data?.display_url,
            })
              .then(() => {
                setUser({
                  ...user,
                  photoURL: res?.data?.data?.display_url,
                });
                setUpdating(false);
                setOpen(false);
                return toast.success("Updated Profile Successfully");
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      return;
    }

    if (name) {
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: user.photoURL,
      })
        .then(() => {
          setUser({ ...user, displayName: name });
          setUpdating(false);
          setOpen(false);
          return toast.success("Updated Profile Successfully");
        })
        .catch((err) => {
          console.log(err);
        });

      return;
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        endIcon={<ModeEditOutlineIcon></ModeEditOutlineIcon>}
      >
        Edit Profile
      </Button>
      <Dialog open={open} fullWidth onClose={handleClose}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          {updating ? "Updating..." : "Update Profile"}{" "}
        </DialogTitle>

        <DialogContent>
          <div className="space-y-5">
            <div>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Your Name"
                type="text"
                fullWidth
                variant="standard"
                inputRef={nameRef}
              />
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-gray-500">Profile Photo</span>
              <input
                id="imageInput"
                type="file"
                className="file-input file-input-bordered rounded-full file-input-neutral w-full max-w-xs"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
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
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

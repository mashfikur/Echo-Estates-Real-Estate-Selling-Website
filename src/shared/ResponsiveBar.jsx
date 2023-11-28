import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import Links from "../components/Navbar/Links";
import HomeIcon from "@mui/icons-material/Home";
import ClearAllIcon from "@mui/icons-material/ClearAll";

export default function ResponsiveBar() {
  const { userSignOut } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = () => {
    userSignOut().then(() => {
      toast.success("Logged Out Successfully");
      navigate("/");
    });
  };
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        backgroundColor: "#323377",
        minHeight: "100vh",
        color: "white",
        fontWeight: "600",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="mt-10 mb-4 px-10 ">
        <Links></Links>
      </div>
      <Divider />
      <div className=" px-10 pt-5 ">
        <List className="flex flex-col   space-y-5  ">
          <NavLink to="/">
            {" "}
            <span className="flex items-center gap-2">
              <HomeIcon></HomeIcon> Home
            </span>
          </NavLink>
          <NavLink to="/all-properties">
            {" "}
            <span className="flex items-center gap-2">
              <ClearAllIcon></ClearAllIcon> All Properties
            </span>
          </NavLink>
          <button
            onClick={handleSignOut}
            className="btn rounded-full bg-red-500 border-none text-white font-semibold"
          >
            Logout
          </button>
        </List>
      </div>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button sx={{}} onClick={toggleDrawer(anchor, true)}>
            <MenuIcon></MenuIcon>
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

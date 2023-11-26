import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";

export default function ResponsiveBar() {
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
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="mt-10 mb-4 px-10 ">
        <List className="flex flex-col space-y-5  ">
          <NavLink to="/dashboard">My Profile</NavLink>
          <NavLink to="/dashboard/wishlist">Wishlist</NavLink>
          <NavLink>Property Bought</NavLink>
          <NavLink>My Reviews</NavLink>
        </List>
      </div>
      <Divider />
      <div className=" px-10 ">
        <List className="flex flex-col   space-y-5  ">
          <NavLink to="/" className={"mt-5"}>
            Home
          </NavLink>
          <NavLink to="/all-properties">All Properties</NavLink>
          <NavLink to="/dashboard">Logout</NavLink>
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

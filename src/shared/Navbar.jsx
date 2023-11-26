import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  Avatar,
  Container,
  Menu,
  MenuItem,
  Tooltip,
  createTheme,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import mainLogo from "../assets/images/main-logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import useAuth from "../hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";
import { ColorRing } from "react-loader-spinner";
import toast from "react-hot-toast";

const drawerWidth = 240;

function Navbar(props) {
  const { user, loading, userSignOut } = useAuth();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // logout function
  const handleLogOut = () => {
    userSignOut()
      .then(() => {
        toast.success("Logged Out Successfully");
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{
          my: 2,
          display: "flex",
          justifyContent: "center",
          gap: ".5rem",
          fontFamily: '"Playfair Display", serif',
        }}
      >
        <img style={{ width: "2rem" }} src={mainLogo}></img>
        Echo Estates
      </Typography>
      <Divider />
      <List
        className="space-y-6 "
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "miniLink" : "")}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "miniLink" : "")}
          to="/all-properties"
        >
          All Properties
        </NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        {user ? (
          <>
            <NavLink
              className={"text-red-600 font-semibold"}
              onClick={handleLogOut}
            >
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const theme = createTheme({
    palette: {
      primary: {
        main: "#fff", // Set your desired primary color
      },
    },
  });

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        sx={{
          backgroundColor: "white",
          paddingTop: ".4rem",
          paddingBottom: ".4rem",
        }}
        component="nav"
        position="fixed"
      >
        <ThemeProvider theme={theme}>
          <Container maxWidth="xl">
            <Toolbar
              sx={{
                color: "#000",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {/* menu icon */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
                <div className="flex items-center gap-2 ml-4 md:hidden">
                  <img style={{ width: "2rem" }} src={mainLogo}></img>
                  <Typography
                    sx={{ fontFamily: '"Playfair Display", serif' }}
                    variant="h6"
                  >
                    Echo Estates
                  </Typography>
                </div>
              </IconButton>

              {/* website logo */}

              <Typography
                onClick={() => navigate("/")}
                variant="h6"
                component="div"
                className="text-black cursor-pointer"
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "flex" },
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "2rem",
                  alignItems: "center",
                  gap: "1rem",
                  color: "#323377",
                  fontWeight: "700",
                }}
              >
                <img style={{ width: "2rem" }} src={mainLogo}></img>
                Echo Estates
              </Typography>

              {/* navitems */}

              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  },
                  fontFamily: '"Libre Franklin", sans-serif',
                }}
              >
                <NavLink to="/">
                  <Button size="sm" sx={{ color: "#000" }}>
                    Home
                  </Button>
                </NavLink>
                <NavLink to="/all-properties">
                  <Button size="sm" sx={{ color: "#000" }}>
                    All Properties
                  </Button>
                </NavLink>
                <NavLink to="/dashboard">
                  <Button sx={{ color: "#000" }}>Dashboard</Button>
                </NavLink>

                {loading ? (
                  <ColorRing
                    visible={true}
                    height="60"
                    width="60"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={[
                      "#323377",
                      "#505690",
                      "#6E79A9",
                      "#9AADCE",
                      "#D6F2FF",
                    ]}
                  />
                ) : user ? (
                  <></>
                ) : (
                  <>
                    <Link to="/login">
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          color: "#fff",
                          px: "1.5rem",
                          py: ".5rem",
                          borderRadius: "25px",
                          backgroundColor: "#323377",
                        }}
                        endIcon={<LoginIcon></LoginIcon>}
                      >
                        Login
                      </Button>
                    </Link>
                  </>
                )}
              </Box>

              {/* user avatar */}

              {user && (
                <Box sx={{ flexGrow: 0, ml: "1rem" }}>
                  <Tooltip title="Profile">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="User Image" src={user?.photoURL} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem
                      sx={{ textAlign: "center" }}
                      onClick={handleCloseUserMenu}
                    >
                      <div className="mx-auto space-y-4">
                        <Typography
                          sx={{ mx: "auto" }}
                          variant="h6"
                          align="center"
                        >
                          {user?.displayName}
                        </Typography>
                        <Typography
                          sx={{
                            mx: "auto",
                            border: "2px solid",
                            borderRadius: "20px",
                            p: ".4rem",
                          }}
                          variant="subtitle2"
                          align="center"
                        >
                          {user?.email}
                        </Typography>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handleCloseUserMenu}>
                      <Button
                        sx={{ mx: "auto", borderRadius: "20px" }}
                        onClick={handleLogOut}
                        endIcon={<LogoutIcon></LogoutIcon>}
                        variant="contained"
                        color="error"
                      >
                        Logout
                      </Button>
                    </MenuItem>
                  </Menu>
                </Box>
              )}
            </Toolbar>
          </Container>
        </ThemeProvider>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;

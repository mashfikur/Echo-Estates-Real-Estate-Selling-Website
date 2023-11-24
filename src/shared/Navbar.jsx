import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import mainLogo from "../assets/images/main-logo.png";
import { NavLink } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

const drawerWidth = 240;

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
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
      <List>
        <ListItem disablePadding>
          <ListItemButton href="/" sx={{ textAlign: "center" }}>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/" sx={{ textAlign: "center" }}>
            <ListItemText primary={"All Properties"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/" sx={{ textAlign: "center" }}>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/" sx={{ textAlign: "center" }}>
            <ListItemText primary={"Login"} />
          </ListItemButton>
        </ListItem>
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
            <Toolbar sx={{ color: "#000" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                variant="h6"
                component="div"
                className="text-black"
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

              <Box
                sx={{
                  display: { xs: "none", sm: "block" },
                  fontFamily: '"Libre Franklin", sans-serif',
                }}
              >
                <NavLink to="/">
                  <Button sx={{ color: "#000" }}>Home</Button>
                </NavLink>
                <NavLink to="/demo">
                  <Button sx={{ color: "#000" }}>All Properties</Button>
                </NavLink>
                <NavLink to="/demo">
                  <Button sx={{ color: "#000" }}>Dashboard</Button>
                </NavLink>
                <NavLink to="/demo">
                  <Button
                    variant="contained"
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
                </NavLink>
              </Box>
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

import { Button, Container, Typography } from "@mui/material";
import erroGif from "../assets/images/error.jpg";
import { NavLink } from "react-router-dom";
import HouseIcon from "@mui/icons-material/House";

const ErrorPage = () => {
  return (
    <div>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
        }}
      >
        <div style={{ marginTop: "4rem" }} className="flex error ">
          <Typography align="center" variant="h4">
            THIS PAGE IS CURRENTLY UNAVIALBLE
          </Typography>
          <img style={{ width: "60%", margin: "" }} src={erroGif} alt="" />
          <NavLink to="/">
            <Button
              startIcon={<HouseIcon></HouseIcon>}
              variant="contained"
              color="success"
              sx={{borderRadius:"20px"}}
            >
              Go Home
            </Button>
          </NavLink>
        </div>
      </Container>
    </div>
  );
};

export default ErrorPage;

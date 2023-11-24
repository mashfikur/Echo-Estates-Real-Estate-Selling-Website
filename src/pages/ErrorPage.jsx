import { Button, Container, Typography } from "@mui/material";
import erroGif from "../assets/images/error.jpg";
import { NavLink } from "react-router-dom";

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
            <Button variant="contained" color="success">
              Go Home
            </Button>
          </NavLink>
        </div>
      </Container>
    </div>
  );
};

export default ErrorPage;

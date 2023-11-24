import {  Container, Typography } from "@mui/material";
import mainLogo from "../assets/images/main-logo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const Footer = () => {
  return (
    <div className="bg-[#d6f2ffb8] py-20 ">
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
        maxWidth="xl"
      >
        <div className="flex items-center gap-4">
          <img style={{ width: "2rem" }} src={mainLogo} alt="" />
          <Typography
            sx={{ fontFamily: '"Playfair Display", serif', fontWeight: "600" }}
            variant="h5"
          >
            Echo Estates
          </Typography>
        </div>
        <div className="cursor-pointer my-5 flex items-center gap-5">
          <FacebookIcon></FacebookIcon>
          <InstagramIcon></InstagramIcon>
          <TwitterIcon></TwitterIcon>
          <LinkedInIcon></LinkedInIcon>
        </div>
        <div>
          <Typography align="center" variant="body1">
            © {new Date().getFullYear()} Echo Estates . All rights reserved{" "}
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default Footer;

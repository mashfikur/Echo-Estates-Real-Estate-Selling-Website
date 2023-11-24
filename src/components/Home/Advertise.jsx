import { Container, Typography } from "@mui/material";

const Advertise = () => {
  return (
    <div className="my-20">
      <Container maxWidth="xl">
        <Typography
          sx={{
            fontWeight: "600",
            textDecoration: "underline",
            fontFamily: '"Playfair Display", serif ',
          }}
          align="center"
          variant="h3"
        >
          Top Picks For You
        </Typography>
        <Typography sx={{ mt: "1.5rem" }} align="center" variant="subtitle1">
          Unlock Your Dream Home: Explore Our Exclusive Listings Today!
        </Typography>
      </Container>
    </div>
  );
};

export default Advertise;

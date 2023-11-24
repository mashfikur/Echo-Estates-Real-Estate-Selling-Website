import {
  Button,
  Container,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";

import ExploreIcon from "@mui/icons-material/Explore";

const Banner = () => {
  const itemData = [
    "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1565402170291-8491f14678db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1448630360428-65456885c650?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D",
  ];

  return (
    <div className="banner">
      <Container sx={{ pt: "10rem" }} maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Typography
              sx={{ fontFamily: '"Playfair Display", serif' }}
              variant="h1"
            >
              Resonating Dreams, Building Tomorrows
            </Typography>
            <Typography sx={{ mt: "2rem", fontWeight: "700" }} variant="h4">
              Your Home, Your Future.
            </Typography>

            <Button
              sx={{
                borderRadius: "1.5rem",
                mt: "1.5rem",
                backgroundColor: "#323377",
                py: ".6rem",
              }}
              variant="contained"
              color="primary"
              endIcon={<ExploreIcon></ExploreIcon>}
            >
              Explore Now
            </Button>
          </Grid>
          <Grid item xs={12} md={5}>
            <ImageList
              sx={{ width: "100%", height: "100%" }}
              variant="quilted"
              cols={4}
              rowHeight={121}
            >
              {itemData.map((item, idx) => (
                <ImageListItem
                  key={idx}
                  cols={item.cols || 1}
                  rows={item.rows || 4}
                >
                  <img
                    style={{ objectFit: "cover" }}
                    src={item}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Banner;

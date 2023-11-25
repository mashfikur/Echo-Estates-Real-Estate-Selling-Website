import { Button, Container } from "@mui/material";
import UpcomingIcon from "@mui/icons-material/Upcoming";

const Blogs = () => {
  return (
    <div className="my-40">
      <Container maxWidth="xl">
        <div className="text-center">
          <h3 className="font-playfair text-5xl mb-4">
            Insights & Inspiration
          </h3>
          <p className="font-semibold text-gray-400">
            Explore our Blog for a wealth of insights into real estate trends,
            home improvement tips, and local community highlights
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 lg:grid-cols-3">
            {/* card */}
            <div>
              <div className="overflow-hidden">
                <img
                  className="rounded-lg hover:scale-125 ease-in-out duration-300 "
                  src="https://images.unsplash.com/photo-1592595896551-12b371d546d5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="card-image"
                />
              </div>
              <h3 className="font-bold text-2xl tracking-wider my-4">
                The Impact of Location on Property Value
              </h3>
              <Button
                sx={{ borderRadius: "30px", backgroundColor: "#323377" }}
                variant="contained"
                color="primary"
                endIcon={<UpcomingIcon></UpcomingIcon>}
              >
                Upcoming
              </Button>
            </div>
            {/* card */}
            <div>
              <div className="overflow-hidden">
                <img
                  className="rounded-lg hover:scale-125 ease-in-out duration-300"
                  src="https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="card-image"
                />
              </div>
              <h3 className="font-bold text-2xl tracking-wider my-4">
                Tips for First Sellers: From Listing to Closing
              </h3>
              <Button
                sx={{ borderRadius: "30px", backgroundColor: "#323377" }}
                variant="contained"
                color="primary"
                endIcon={<UpcomingIcon></UpcomingIcon>}
              >
                Upcoming
              </Button>
            </div>
            {/* card */}
            <div>
              <div className="overflow-hidden">
                <img
                  className="rounded-lg hover:scale-125 ease-in-out duration-300"
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="card-image"
                />
              </div>
              <h3 className="font-bold text-2xl tracking-wider my-4">
                Spotting a Good Real Estate Investment Opportunity
              </h3>
              <Button
                sx={{ borderRadius: "30px", backgroundColor: "#323377" }}
                variant="contained"
                color="primary"
                endIcon={<UpcomingIcon></UpcomingIcon>}
              >
                Upcoming
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Blogs;

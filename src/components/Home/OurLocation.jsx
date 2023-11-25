import { Button, Container, TextField } from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import NearMeIcon from "@mui/icons-material/NearMe";
import { useRef } from "react";
import toast from "react-hot-toast";
const OurLocation = () => {
  const locationRef = useRef();
  const handleRequest = () => {
    locationRef.current.value = "";
    setTimeout(() => {
      toast.success("We will review your request");
    }, 500);
  };

  const position = [40.712776, -74.005974];
  const position2 = [40.744459, -73.982708];
  const position3 = [40.772412, -74.069912];
  const position4 = [40.674995, -73.970054];
  const position5 = [40.820225, -73.99159];

  return (
    <div className="my-20">
      <Container maxWidth="xl">
        <div className="flex flex-col lg:text-left text-center lg:flex-row gap-5 justify-between">
          <div className="flex-1">
            <h1 className="font-playfair  text-5xl lg:text-6xl">
              Explore Our <br /> Provided Areas
            </h1>
            <p className="my-5 lg:w-[80%]">
              Uncover the breadth of our real estate expertise across diverse
              landscapes. Our dedicated service areas cover a spectrum of
              opportunities, from urban gems to tranquil retreats.
            </p>
            <div className="flex flex-col lg:flex-row items-center w-full gap-4 ">
              <TextField
                inputRef={locationRef}
                id="outlined-basic"
                label=" Request Location"
                variant="outlined"
                sx={{ width: "60%" }}
              />
              <Button
                onClick={handleRequest}
                sx={{ py: ".5rem", borderRadius: "35px" }}
                variant="contained"
                endIcon={<NearMeIcon></NearMeIcon>}
              >
                Request
              </Button>
            </div>
          </div>
          <div className=" overflow-hidden h-[45vh] flex-1">
            <MapContainer
              className="rounded-md"
              center={position}
              zoom={10}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>Location 1</Popup>
              </Marker>
              <Marker position={position2}>
                <Popup>Location 2</Popup>
              </Marker>
              <Marker position={position3}>
                <Popup>Location 3</Popup>
              </Marker>
              <Marker position={position4}>
                <Popup>Location 4</Popup>
              </Marker>
              <Marker position={position5}>
                <Popup>Location 5</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OurLocation;

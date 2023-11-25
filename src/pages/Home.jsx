import { Helmet } from "react-helmet-async";
import Banner from "../components/Home/Banner";
import Advertise from "../components/Home/Advertise";
import OurLocation from "../components/Home/OurLocation";
import Blogs from "../components/Home/Blogs";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> Echo Estates | Home </title>
      </Helmet>
      <Banner></Banner>
      <Advertise></Advertise>
      <Blogs></Blogs>
      <OurLocation></OurLocation>
    </div>
  );
};

export default Home;

import { Helmet } from "react-helmet-async";
import Banner from "../components/Home/Banner";
import Advertise from "../components/Home/Advertise";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> Echo Estates | Home </title>
      </Helmet>
      <Banner></Banner>
      <Advertise></Advertise>
    </div>
  );
};

export default Home;

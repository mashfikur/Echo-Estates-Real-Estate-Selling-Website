import { Helmet } from "react-helmet-async";
import Banner from "../components/Home/Banner";
import Advertise from "../components/Home/Advertise";
import OurLocation from "../components/Home/OurLocation";
import HomepageBlogs from "../components/Home/HomePageBlog";
import LatestReviews from "../components/Home/LatestReviews";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> Echo Estates | Home </title>
      </Helmet>
      <Banner></Banner>
      <Advertise></Advertise>
      <LatestReviews></LatestReviews>
      <HomepageBlogs></HomepageBlogs>
      <OurLocation></OurLocation>
    </div>
  );
};

export default Home;

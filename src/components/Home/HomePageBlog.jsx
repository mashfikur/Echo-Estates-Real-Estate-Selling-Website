import { Container } from "@mui/material";
import { LuArrowUpRight } from "react-icons/lu";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { MdMenuBook } from "react-icons/md";
import BlogModal from "../Blog/BlogModal";
import { useState } from "react";
import { Link } from "react-router-dom";

const HomepageBlogs = () => {
  const axiosPublic = useAxiosPublic();

  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState("657489033ed9b97755346486");

  const handleClickOpen = (_id) => {
    setOpen(true);
    setBlogId(_id);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { data } = useQuery({
    queryKey: ["all-blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/v1/user/get-blogs?limit=3");
      return res.data;
    },
  });

  return (
    <div className=" my-24 lg:my-40">
      <Container maxWidth="xl">
        <div className="text-center">
          <h3 className="font-playfair text-3xl font-semibold md:text-5xl mb-4 underline">
            Insights & Inspiration
          </h3>
          <p className="font-semibold text-gray-400">
            Explore our Blog for a wealth of insights into real estate trends,
            home improvement tips, and local community highlights
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 lg:grid-cols-3">
            {data &&
              data.map((blog, idx) => (
                <div
                  key={idx}
                  className="card  bg-base-100 shadow-md hover:-translate-y-4 duration-300 "
                >
                  <figure>
                    <img src={blog.blog_image} alt="Blog-Cover" />
                  </figure>
                  <div className="text-left p-5">
                    <h2 className=" text-2xl font-semibold">
                      {blog.blog_title}
                    </h2>
                    <div className="card-actions justify-center mt-3">
                      <button
                        onClick={() => handleClickOpen(blog._id)}
                        className="btn btn-neutral rounded-full shadow-md border-none px-6 text-white "
                      >
                        Read Blog <MdMenuBook className="text-xl" />{" "}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <BlogModal
            open={open}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            _id={blogId}
          ></BlogModal>

          <Link to="/blogs">
            <button className="btn shadow-2xl border-none btn-success rounded-lg  text-white font-bold">
              See More <LuArrowUpRight className="text-xl" />{" "}
            </button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default HomepageBlogs;

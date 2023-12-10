import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Container } from "@mui/material";
import { ThreeCircles } from "react-loader-spinner";
import { MdMenuBook } from "react-icons/md";
import { useEffect, useState } from "react";
import BlogModal from "../components/Blog/BlogModal";

const Blogs = () => {
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

  const { data, isPending } = useQuery({
    queryKey: ["all-blogs"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/v1/user/get-blogs");
      return res.data;
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="all-banner pt-24">
      <div className="min-h-screen">
        <Container maxWidth="xl">
          <div>
            <h3 className="text-center text-white font-playfair text-4xl lg:text-6xl">
              Blogs
            </h3>
            <p className="text-center p-4 lg:p-0 font-semibold capitalize lg:my-4 text-white">
              Find your correct blog & get ideas from our industry experts
            </p>
          </div>

          <div>
            {isPending ? (
              <div className="mt-32 flex items-center justify-center ">
                <ThreeCircles
                  height="100"
                  width="100"
                  color="white"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="three-circles-rotating"
                  outerCircleColor=""
                  innerCircleColor=""
                  middleCircleColor=""
                />
              </div>
            ) : (
              <div className=" grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-12">
                {data &&
                  data.map((blog, idx) => (
                    <div key={idx} className="card  bg-base-100 shadow-md  ">
                      <figure>
                        <img src={blog.blog_image} alt="Blog-Cover" />
                      </figure>
                      <div className="pl-5 flex items-center mt-4 gap-2">
                        {" "}
                        <img
                          className="w-10 h-10 object-cover rounded-full"
                          src={blog.author_info.userImage}
                          alt="author-image"
                        />
                        <div>
                          <h3>{blog.author_info.userName} </h3>
                          <h3 className="font-semibold text-gray-400 text-sm">
                            {blog.author_info.email}{" "}
                          </h3>
                        </div>
                      </div>
                      <div className="text-left pl-5 pt-4 ">
                        <div>
                          <h2 className=" text-2xl font-semibold">
                            {blog.blog_title}
                          </h2>
                        </div>
                        <div className=" flex justify-center my-3">
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

                <BlogModal
                  _id={blogId}
                  handleClickOpen={handleClickOpen}
                  handleClose={handleClose}
                  open={open}
                ></BlogModal>
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Blogs;

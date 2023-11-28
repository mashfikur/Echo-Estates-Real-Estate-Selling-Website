import SectionHeading from "../../components/Dashboard/SectionHeading";
import * as React from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { RotatingLines, ThreeCircles } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const apiKey = import.meta.env.VITE_IMAGE_API_KEY;
const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const UpdateProperty = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data, isPending, refetch } = useQuery({
    queryKey: ["update-property", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/user/property/details/${id}`);
      return res.data;
    },
  });

  const [addingData, setAddingData] = React.useState(null);

  // handling form
  const { register, handleSubmit } = useForm();

  const onSubmit = (formData) => {
    setAddingData(true);

    // if the image is updated
    if (formData.image.length) {
      axiosPublic
        .post(
          url,
          { image: formData.image[0] },
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.data.success) {
            // adding to database
            const updated_info = {
              property_title: formData.title,
              property_location: formData.location,
              property_image: res?.data?.data?.display_url,
              price_range: [
                parseFloat(formData.start),
                parseFloat(formData.end),
              ],
            };

            axiosSecure
              .patch(`/api/v1/user/update-user/${id}`, updated_info)
              .then((res) => {
                if (res.data.modifiedCount) {
                  toast.success("Updated Property Successfully");
                  setAddingData(false);
                  refetch();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // updating the property info if no image is updated
      const updated_info = {
        property_title: formData.title,
        property_image: formData.previous_image,
        property_location: formData.location,
        price_range: [parseFloat(formData.start), parseFloat(formData.end)],
      };

      axiosSecure
        .patch(`/api/v1/user/update-user/${id}`, updated_info)
        .then((res) => {
          if (res.data.modifiedCount) {
            toast.success("Updated Property Successfully");
            setAddingData(false);
            refetch();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <SectionHeading title={"Update Property"}></SectionHeading>

      {isPending ? (
        <div className="mt-32 flex items-center justify-center ">
          <ThreeCircles
            height="100"
            width="100"
            color="#A9BEDA"
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
        <div className="max-w-6xl mx-auto">
          <div className="mx-auto flex justify-center xl:justify-start">
            <IconButton
              sx={{ backgroundColor: "#323377" }}
              color="primary"
              size="medium"
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon color="warning"></ArrowBackIcon>
            </IconButton>
          </div>
          <div>
            <div className=" lg:mt-14 xl:mt-20">
              <div className="flex flex-col p-3">
                <div className="card w-full  shadow-lg border-main border-2 bg-base-100">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="card-body space-y-2"
                  >
                    {/* first row */}
                    <div className="flex flex-col lg:flex-row items-center gap-5">
                      <div className="form-control flex-1">
                        <label className="label">
                          <span className="label-text">Property Title</span>
                        </label>
                        <input
                          defaultValue={data?.property_title}
                          type="text"
                          placeholder="Title"
                          className="input focus:outline-none input-bordered"
                          required
                          {...register("title")}
                        />
                      </div>
                      <div className="form-control  flex-1">
                        <label className="label">
                          <span className="label-text">Property location</span>
                        </label>
                        <input
                          defaultValue={data?.property_location}
                          type="text"
                          placeholder="Location"
                          className="input focus:outline-none input-bordered"
                          required
                          {...register("location")}
                        />
                      </div>
                    </div>

                    {/* second row */}
                    <div className="flex gap-5   flex-col lg:flex-row items-center">
                      <div className="flex flex-1 scale-90 lg:scale-100 flex-col  ">
                        <div className="flex flex-col xl:flex-row items-center gap-2">
                          <div className="form-control flex-1">
                            <label className="label">
                              <span className="label-text">Previous Image</span>
                            </label>
                            <input
                              value={data?.property_image}
                              type="text"
                              placeholder="Previous Image"
                              className="input focus:outline-none input-bordered"
                              required
                              readOnly
                              {...register("previous_image")}
                            />
                          </div>
                          <div className="flex-1 mt-3">
                            <div>
                              <h3 className=" text-sm mb-1">Property Image </h3>
                            </div>
                            <div>
                              <input
                                type="file"
                                className="file-input  file-focus:outline-none input-bordered w-full rounded-lg"
                                {...register("image")}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col xl:flex-row items-center gap-4">
                          <div className="form-control flex-1">
                            <label className="label">
                              <span className="label-text">
                                Starting Range($k){" "}
                              </span>
                            </label>
                            <input
                              defaultValue={data?.price_range[0]}
                              step={0.1}
                              type="number"
                              placeholder="Title"
                              className="input focus:outline-none input-bordered"
                              required
                              {...register("start")}
                            />
                          </div>
                          <div className="form-control flex-1">
                            <label className="label">
                              <span className="label-text">
                                Ending Range ($k){" "}
                              </span>
                            </label>
                            <input
                              defaultValue={data?.price_range[1]}
                              step={0.1}
                              type="number"
                              placeholder="start"
                              className="input focus:outline-none input-bordered"
                              required
                              {...register("end")}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* third row */}
                    <div className="flex flex-col lg:flex-row items-center gap-5">
                      <div className="form-control flex-1">
                        <label className="label">
                          <span className="label-text">Agent Name</span>
                        </label>
                        <input
                          value={user?.displayName}
                          type="text"
                          placeholder="Agent Name"
                          className="input focus:outline-none input-bordered"
                          required
                          readOnly
                          {...register("name")}
                        />
                      </div>
                      <div className="form-control flex-1">
                        <label className="label">
                          <span className="label-text">Agent email</span>
                        </label>
                        <input
                          value={user?.email}
                          type="email"
                          placeholder="Agent Email"
                          className="input focus:outline-none input-bordered"
                          required
                          readOnly
                          {...register("email")}
                        />
                      </div>
                    </div>

                    {/* fourth row */}
                    <div className="form-control ">
                      <button className="btn mx-auto rounded-full px-12 shadow-xl border-none  text-white hover:bg-[#323377] bg-[#323377]">
                        {addingData ? (
                          <>
                            {" "}
                            <RotatingLines
                              strokeColor="grey"
                              strokeWidth="5"
                              animationDuration="0.75"
                              width="30"
                              visible={true}
                            />{" "}
                            {"Updating.."}
                          </>
                        ) : (
                          "Update Property"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProperty;

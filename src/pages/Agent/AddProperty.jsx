import SectionHeading from "../../components/Dashboard/SectionHeading";
import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { RotatingLines } from "react-loader-spinner";

const apiKey = import.meta.env.VITE_IMAGE_API_KEY;
const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const AddProperty = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const [addingData, setAddingData] = React.useState(null);
  const [value, setValue] = React.useState([10, 30]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // handling form
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log({ ...data, price: value });
    setAddingData(true);

    axiosPublic
      .post(
        url,
        { image: data.image[0] },
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          // adding to database
          const info = {
            property_title: data.title,
            property_location: data.location,
            property_image: res?.data?.data?.display_url,
            agent_name: data.name,
            agent_image: user.photoURL,
            agent_email: data.email,
            agent_id: user.uid,
            price_range: value,
            verification_status: "pending",
            isfraud: true,
          };

          axiosSecure
            .post("/api/v1/user/add-property", info)
            .then((res) => {
              if (res.data.insertedId) {
                reset();
                setAddingData(false);
                setValue([10, 30]);
                toast.success("Successfully Added Your Property");
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
  };

  return (
    <div>
      <SectionHeading title={"Add Property"}></SectionHeading>

      <h3 className="text-center font-semibold text-gray-400 ">
        Explore the possibilities. Sell your property hassle-free with our
        expertise
      </h3>

      <div className="max-w-6xl mx-auto">
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
                      <div>
                        <h3 className=" text-sm mb-1">Property Image </h3>
                      </div>
                      <div>
                        <input
                          type="file"
                          className="file-input  file-focus:outline-none input-bordered w-full rounded-lg"
                          {...register("image")}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm mb-3">
                        Price Range ( {value[0]}$k-{value[1]}$k ){" "}
                      </h3>
                      <Box sx={{ width: "100%" }}>
                        <Slider
                          getAriaLabel={() => "Temperature range"}
                          value={value}
                          onChange={handleChange}
                          valueLabelDisplay="auto"
                        />
                      </Box>
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
                          {"Adding.."}
                        </>
                      ) : (
                        "Add Property"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;

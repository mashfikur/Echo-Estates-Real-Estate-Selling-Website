import { useParams } from "react-router-dom";
import SectionHeading from "../../components/Dashboard/SectionHeading";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { ThreeCircles } from "react-loader-spinner";
import toast from "react-hot-toast";

const MakeOffer = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isPending } = useQuery({
    queryKey: ["offer-property", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/user/property/details/${id}`);

      return res.data;
    },
  });

  //current date
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1; // Months are zero-indexed
    let day = today.getDate();

    // Add leading zeros to month and day if needed
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    // Format: YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }

  // creating form
  const { register, handleSubmit } = useForm();

  const onSubmit = (formData) => {
    const startingRange = data.price_range[0];
    const endingRange = data.price_range[1];
    const amount = parseFloat(formData.offered_amount);

    if (!(startingRange <= amount && amount <= endingRange)) {
      return toast.error("You have offered Invalid amount");
    }

    // adding data to database
    const offered = {
      agent_id: data.agent_id,
      property_title: formData.title,
      property_location: formData.location,
      buyer_name: formData.buyer_name,
      buyer_email: formData.buyer_email,
      buyer_id: user.uid,
      offered_price: formData.offered_amount,
      buying_date: formData.buying_date,
    };

    console.log(offered);
  };
  return (
    <div>
      <SectionHeading title={"Make Your Offer"}></SectionHeading>
      <p className="text-center font-semibold text-gray-400 my-6 text-lg">
        Propose Your offer to the owner . You will get the update as soon as the
        owner responds
      </p>

      <div className="max-w-6xl mx-auto my-10">
        {isPending ? (
          <>
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
          </>
        ) : (
          data && (
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
                            defaultValue={data?.property_title}
                            readOnly
                            {...register("title")}
                          />
                        </div>
                        <div className="form-control  flex-1">
                          <label className="label">
                            <span className="label-text">
                              Property location
                            </span>
                          </label>
                          <input
                            type="text"
                            placeholder="Location"
                            className="input focus:outline-none input-bordered"
                            required
                            defaultValue={data?.property_location}
                            readOnly
                            {...register("location")}
                          />
                        </div>
                      </div>

                      {/* second row */}
                      <div className="flex flex-col lg:flex-row items-center gap-5">
                        <div className="form-control flex-1">
                          <label className="label">
                            <span className="label-text">Agent Name</span>
                          </label>
                          <input
                            defaultValue={data?.agent_name}
                            type="text"
                            placeholder="Agent Name"
                            className="input focus:outline-none input-bordered"
                            required
                            readOnly
                            {...register("agent_name")}
                          />
                        </div>
                        <div className="form-control flex-1">
                          <label className="label">
                            <span className="label-text">Agent email</span>
                          </label>
                          <input
                            defaultValue={data?.agent_email}
                            type="email"
                            placeholder="Agent Email"
                            className="input focus:outline-none input-bordered"
                            required
                            readOnly
                            {...register("agent_email")}
                          />
                        </div>
                      </div>

                      {/* third row */}
                      <div className="flex flex-col lg:flex-row items-center gap-5">
                        <div className="form-control flex-1">
                          <label className="label">
                            <span className="label-text">Buyer Name</span>
                          </label>
                          <input
                            defaultValue={user?.displayName}
                            type="text"
                            placeholder="Buyer Name"
                            className="input focus:outline-none input-bordered"
                            required
                            readOnly
                            {...register("buyer_name")}
                          />
                        </div>
                        <div className="form-control flex-1">
                          <label className="label">
                            <span className="label-text">Buyer email</span>
                          </label>
                          <input
                            defaultValue={user?.email}
                            type="email"
                            placeholder="Agent Email"
                            className="input focus:outline-none input-bordered"
                            required
                            readOnly
                            {...register("buyer_email")}
                          />
                        </div>
                      </div>
                      {/* third row */}
                      <div className="flex flex-col lg:flex-row items-center gap-5">
                        <div className="form-control flex-1">
                          <label className="label">
                            <span className="label-text">
                              Offered Amount{" "}
                              <span className="px-2 font-semibold">
                                (${data?.price_range[0]}k - $
                                {data?.price_range[1]}k)
                              </span>
                            </span>
                          </label>
                          <input
                            step={0.1}
                            type="number"
                            placeholder="Place Your Offer ($k) "
                            className="input focus:outline-none input-bordered"
                            required
                            {...register("offered_amount")}
                          />
                        </div>
                        <div className="form-control flex-1 ">
                          <label className="label">
                            <span className="label-text">Buying Date </span>
                          </label>
                          <input
                          min={getCurrentDate()}
                            type="date"
                            className="input focus:outline-none input-bordered"
                            required
                            {...register("buying_date")}
                          />
                        </div>
                      </div>

                      <div className="form-control ">
                        <button className="btn mx-auto rounded-full px-12 shadow-xl border-none  text-white hover:bg-[#323377] bg-[#323377]">
                          Make Offer
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MakeOffer;

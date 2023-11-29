import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../components/Dashboard/SectionHeading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ThreeCircles } from "react-loader-spinner";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const AdvertiseProperty = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isPending, refetch } = useQuery({
    queryKey: ["agent-propeties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/v1/user/verified-properties");

      return res.data;
    },
  });

  const handleUpdateProperty = (_id, status) => {
    if (status) {
      if (
        data.filter((property) => property.isAdvertised === "true").length >= 6
      ) {
        return toast.error("You can't advertise more than 6 property");
      }
    }

    Swal.fire({
      title: `Do you want to ${
        status ? "Advertise" : "Remove Advertise from"
      } this property?`,
      text: "It will update the property!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes , Do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/api/v1/admin/advertise-property/${_id}?status=${status}`)
          .then((res) => {
            if (res.data.modifiedCount) {
              toast.success(`Successfully Completed`);
              refetch();
            }
          });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Echo Estates | Advertise Properties </title>
      </Helmet>
      <SectionHeading title={"Advertise Properties"}></SectionHeading>

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
          {data.length ? (
            <div className="flex px-4 lg:flex-row flex-col gap-3 items-center justify-between   text-3xl mt-16">
              <h3>Total Property : {data.length} </h3>
              <h3>
                Advertised Property :{" "}
                {
                  data.filter((property) => property.isAdvertised === "true")
                    .length
                }{" "}
              </h3>
            </div>
          ) : (
            <div>
              <h3 className="capitalize font-semibold text-center text-lg text-gray-400">
                No verified properties Available for Advertisement
              </h3>
            </div>
          )}

          <div className="mt-8 px-2 mb-10 ">
            <div className=" border-main border-2 shadow-lg rounded-md h-[80vh] lg:h-[60vh] overflow-auto">
              <table className="table text-base font-semibold  ">
                {/* head */}
                <thead className="text-lg sticky top-0 bg-blue-950 text-white z-50 ">
                  <tr>
                    <th></th>
                    <th>Property Title</th>
                    <th>Property Locaiton</th>
                    <th>Agent name</th>
                    <th>Agent email</th>
                    <th>Price range</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {data &&
                    data.map((property, idx) => (
                      <tr key={property._id}>
                        <th> {idx + 1} </th>
                        <td> {property.property_title} </td>
                        <td>{property.property_location}</td>
                        <td>{property.agent_name}</td>
                        <td>{property.agent_email}</td>
                        <td>
                          {" "}
                          {`$${property.price_range[0]}k - $${property.price_range[1]}k`}{" "}
                        </td>
                        <td>
                          <button
                            disabled={
                              property?.isAdvertised === "true" ? true : false
                            }
                            className="btn bg-green-700 text-white"
                            onClick={() =>
                              handleUpdateProperty(property._id, true)
                            }
                          >
                            Advertise
                          </button>
                        </td>
                        <td>
                          <button
                            disabled={
                              property?.isAdvertised === "true" ? false : true
                            }
                            className="btn bg-red-500 text-white"
                            onClick={() =>
                              handleUpdateProperty(property._id, false)
                            }
                          >
                            Remove Advertise
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvertiseProperty;

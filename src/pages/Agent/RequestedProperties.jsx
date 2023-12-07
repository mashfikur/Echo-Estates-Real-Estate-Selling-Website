import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../components/Dashboard/SectionHeading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ThreeCircles } from "react-loader-spinner";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const RequestedProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isPending, refetch } = useQuery({
    queryKey: ["requested-propeties", user?.uid],
    queryFn: async () => {
      if (user) {
        const res = await axiosSecure.get(
          `/api/v1/agent/get-requested-properties/${user.uid}`
        );

        return res.data;
      }
    },
  });

  const handleConfirmProperty = (_id, property_id, status) => {
    Swal.fire({
      title: `Do you want to ${
        status === "accepted" ? "accept" : status === "rejected" ? "reject" : ""
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
          .patch(
            `/api/v1/agent/change-property-status/${_id}?status=${status}&property=${property_id}`
          )
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
        <title>Echo Estates | Requested Properties </title>
      </Helmet>
      <SectionHeading title={"Requested Properties"}></SectionHeading>

      <h3 className="text-center font-semibold text-gray-400 ">
        Find out about your property that people are interested about.
      </h3>

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
      ) : data.length ? (
        <div className="max-w-6xl mx-auto">
          {data.length ? (
            <div className="flex px-4 lg:flex-row flex-col gap-3 items-center justify-between   text-3xl mt-16">
              <h3>Total Property : {data.length} </h3>
              <h3>
                Accepted Property :{" "}
                {
                  data.filter((property) => property.status === "accepted")
                    .length
                }{" "}
              </h3>
            </div>
          ) : (
            <></>
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
                    <th>Buyer name</th>
                    <th>Buyer email</th>
                    <th>Offered Price</th>
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
                        <td className="text-center">{property.buyer_name}</td>
                        <td>{property.buyer_email}</td>
                        <td className="text-center">
                          ${property.offered_price}k
                        </td>

                        {property.status === "accepted" ? (
                          <td>
                            {" "}
                            <div className="badge badge-success text-white py-3">
                              Accepted
                            </div>{" "}
                          </td>
                        ) : property.status === "bought" ? (
                          <td>
                            {" "}
                            <div className="badge badge-warning text-white py-3 px-6">
                              sold
                            </div>{" "}
                          </td>
                        ) : property.status === "rejected" ? (
                          <td>
                            {" "}
                            <div className="badge badge-error text-white py-3">
                              Rejected
                            </div>
                          </td>
                        ) : (
                          <>
                            <td>
                              {" "}
                              <button
                                onClick={() =>
                                  handleConfirmProperty(
                                    property._id,
                                    property.property_id,
                                    "accepted"
                                  )
                                }
                                className="btn btn-success rounded-full shadow-lg text-white"
                              >
                                Accept
                              </button>{" "}
                            </td>
                            <td>
                              {" "}
                              <button
                                onClick={() =>
                                  handleConfirmProperty(
                                    property._id,
                                    property.property_id,
                                    "rejected"
                                  )
                                }
                                className="btn btn-error rounded-full shadow-lg text-white"
                              >
                                Reject
                              </button>{" "}
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-center text-4xl mt-20 text-gray-400 font-semibold">
            No properties requested yet{" "}
          </h3>
        </div>
      )}
    </div>
  );
};

export default RequestedProperties;

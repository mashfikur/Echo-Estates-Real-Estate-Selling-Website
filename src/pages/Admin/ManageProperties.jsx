import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../components/Dashboard/SectionHeading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ThreeCircles } from "react-loader-spinner";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const ManageProperties = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isPending, refetch } = useQuery({
    queryKey: ["agent-propeties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/v1/admin/agent-properties");

      return res.data;
    },
  });

  const handleUpdateProperty = (_id, status) => {
    const target =
      status === "verify" ? "verified" : status === "reject" ? "rejected" : "";

    Swal.fire({
      title: `Do you want to ${status} this property?`,
      text: "It will update the property!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes , Do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/api/v1/admin/update-property/${_id}?status=${target}`)
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
        <title>Echo Estates | Manage Properties </title>
      </Helmet>
      <SectionHeading title={"Manage Properties"}></SectionHeading>

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
          {data.length && (
            <div className="flex px-4 lg:flex-row flex-col gap-3 items-center justify-between   text-3xl mt-16">
              <h3>Total Property : {data.length} </h3>
              <h3>
                Verified Property :{" "}
                {
                  data.filter(
                    (property) => property.verification_status === "verified"
                  ).length
                }{" "}
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
                          {property.verification_status === "verified" ? (
                            <h1 className="text-center badge badge-success text-md font-semibold p-3 text-white ">
                              Verified
                            </h1>
                          ) : property.verification_status === "rejected" ? (
                            <h1 className="text-center badge badge-error text-md font-semibold p-3 text-white ">
                              Rejected
                            </h1>
                          ) : (
                            <Button
                              onClick={() =>
                                handleUpdateProperty(property._id, "verify")
                              }
                              sx={{
                                borderRadius: "25px",
                                py: ".6rem",
                                px: "1rem",
                              }}
                              variant="contained"
                              size="small"
                              color="success"
                            >
                              Verify
                            </Button>
                          )}
                        </td>
                        <td>
                          {property.verification_status === "verified" ? (
                            <></>
                          ) : property.verification_status === "rejected" ? (
                            <></>
                          ) : (
                            <Button
                              onClick={() =>
                                handleUpdateProperty(property._id, "reject")
                              }
                              sx={{
                                borderRadius: "25px",
                                py: ".6rem",
                                px: "1rem",
                              }}
                              variant="contained"
                              size="small"
                              color="error"
                            >
                              Reject
                            </Button>
                          )}
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

export default ManageProperties;

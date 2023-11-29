import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../components/Dashboard/SectionHeading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ThreeCircles } from "react-loader-spinner";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const MySoldProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isPending } = useQuery({
    queryKey: ["sold-propeties", user?.uid],
    queryFn: async () => {
      if (user) {
        const res = await axiosSecure.get(
          `/api/v1/agent/sold-properties/${user.uid}`
        );

        return res.data;
      }
    },
  });

  return (
    <div>
       <Helmet>
        <title>Echo Estates | Sold Properties </title>
      </Helmet>
      <SectionHeading title={"Sold Properties"}></SectionHeading>

      <h3 className="text-center font-semibold text-gray-400 ">
        Here is the detailed List of all the properties you have sold on this
        platform
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
      ) : (
        <div className="max-w-6xl mx-auto">
          {data.length ? (
            <div className="flex px-4 lg:flex-row flex-col gap-3 items-center justify-between   text-3xl mt-16">
              <h3>Sold Properties : {data.length} </h3>
              <h3>
                Total Sold :{" "}
                ${data.reduce(
                  (accumulator, current) => accumulator + current.offered_price,
                  0
                )}k
              </h3>
            </div>
          ) : (
            <></>
          )}

          {data.length ? (
            <div className="mt-8 px-2 mb-10 ">
              <div className=" border-main border-2 shadow-lg rounded-md h-[80vh] lg:h-[60vh] overflow-auto">
                <table className="table text-base font-semibold  ">
                  {/* head */}
                  <thead className="text-lg sticky top-0 bg-blue-950 text-white z-50 ">
                    <tr>
                      <th></th>
                      <th>Property Title</th>
                      <th>Property Locaiton</th>
                      <th>Buyer Name</th>
                      <th>Buyer Email</th>
                      <th>Sold Price (USD) </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {data &&
                      data.map((property, idx) => (
                        <tr key={property._id}>
                          <th> {idx + 1} </th>
                          <td>{property.property_title}</td>
                          <td>{property.property_location}</td>
                          <td>{property.buyer_name}</td>
                          <td>{property.buyer_email}</td>
                          <td className="text-center">
                            ${property.offered_price}k
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="my-20 text-center font-semibold text-gray-400 text-4xl">
                You {"haven't sold any property yet"}{" "}
              </h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MySoldProperties;

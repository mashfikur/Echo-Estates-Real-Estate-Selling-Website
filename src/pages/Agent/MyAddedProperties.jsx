import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../components/Dashboard/SectionHeading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import PropertyCard from "../../components/Dashboard/Agent/PropertyCard";
import { ThreeCircles } from "react-loader-spinner";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyAddedProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data, isPending, refetch } = useQuery({
    queryKey: ["added-properties", user?.email],
    queryFn: async () => {
      if (user) {
        const res = await axiosSecure.get(
          `/api/v1/agent/added-properties/${user.uid}`
        );
        return res.data;
      }
    },
  });

  const handlePropertyDelete = (_id) => {
    Swal.fire({
      title: "Do you want to delete this property?",
      text: "It can't be reverted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes , Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/api/v1/user/delete-property/${_id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              toast.success("Deleted property successfully");
              refetch();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div>
      <SectionHeading title={"My Added Properties"}> </SectionHeading>

      <h3 className="text-center font-semibold text-gray-400 ">
        Find out all the properties you have added to our website . Manage them
        easily
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
        <div className=" max-w-6xl mt-12 mx-auto">
          {data.length > 0 ? (
            <div className="grid  grid-cols-1 gap-10 lg:gap-5 lg:grid-cols-2 xl:grid-cols-3">
              {data &&
                data.map((info, idx) => (
                  <PropertyCard
                    handlePropertyDelete={handlePropertyDelete}
                    info={info}
                    key={idx}
                  ></PropertyCard>
                ))}
            </div>
          ) : (
            <div>
              <h3 className="my-20 text-center font-semibold text-gray-400 text-4xl">
                You {"haven't added any property yet"}{" "}
              </h3>
              <div className=" flex items-center justify-center">
                <Button
                  onClick={() => navigate("/dashboard/add-property")}
                  variant="contained"
                  color="secondary"
                  sx={{ py: ".7rem" }}
                >
                  Add Property
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyAddedProperties;

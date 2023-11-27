import { useQuery } from "@tanstack/react-query";
import SectionHeading from "../../components/Dashboard/SectionHeading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { ThreeCircles } from "react-loader-spinner";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [agents, setAgents] = useState([]);

  const { data, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/v1/admin/get-users");

      const usersArr = res.data.filter((user) => user.role === "user");
      const agentsArr = res.data.filter((user) => user.role === "agent");

      setUsers(usersArr);
      setAgents(agentsArr);

      return res.data;
    },
  });

  return (
    <div>
      <SectionHeading title={"Manage Users"}></SectionHeading>

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
              <h3>Total Users : {data.length} </h3>
              <h3>
                Total Agents :{" "}
                {data.filter((user) => user.role === "agent").length}{" "}
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
                    <th>User Name</th>
                    <th>User Email</th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {data &&
                    data.map((user, idx) => (
                      <tr key={user._id}>
                        <th> {idx + 1} </th>
                        <td> {user.userName} </td>
                        <td>{user.email}</td>
                        <td>
                          {user.role === "admin" ? (
                            <Button
                              sx={{
                                borderRadius: "25px",
                                px: "2rem",
                                py: ".6rem",
                              }}
                              variant="contained"
                              size="small"
                              color="secondary"
                            >
                              Admin
                            </Button>
                          ) : (
                            <Button
                              sx={{ borderRadius: "25px", py: ".6rem" }}
                              variant="contained"
                              size="small"
                            >
                              Make Admin
                            </Button>
                          )}
                        </td>
                        <td>
                          {user.role === "agent" ? (
                            <></>
                          ) : (
                            <Button
                              sx={{ borderRadius: "25px", py: ".6rem" }}
                              variant="contained"
                              size="small"
                              color="success"
                            >
                              Make Agent
                            </Button>
                          )}
                        </td>
                        <td>
                          {user.role === "agent" && (
                            <Button
                              sx={{ borderRadius: "25px", py: ".6rem" }}
                              variant="contained"
                              size="small"
                              color="warning"
                            >
                              Mark as Fraud
                            </Button>
                          )}
                        </td>
                        <td>
                          <Button
                            sx={{ borderRadius: "25px", py: ".6rem" }}
                            variant="contained"
                            color="error"
                            size="small"
                            endIcon={<DeleteIcon></DeleteIcon>}
                          >
                            Delete User
                          </Button>
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

export default ManageUsers;

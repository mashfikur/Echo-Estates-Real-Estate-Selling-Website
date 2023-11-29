import { CirclesWithBar } from "react-loader-spinner";
import SectionHeading from "../../components/Dashboard/SectionHeading";
import useAuth from "../../hooks/useAuth";
import useCheckAgent from "../../hooks/useCheckAgent";
import useCheckAdmin from "../../hooks/useCheckAdmin";
import { Button } from "@mui/material";
import EditProfile from "../../components/Dashboard/User/EditProfile";

const MyProfile = () => {
  const { user, loading } = useAuth();
  const [isAgentData, isAgentLoading] = useCheckAgent();
  const [isAdmin, isAdminLoading] = useCheckAdmin();

  const month = Date(user?.metadata?.lastLoginAt).split(" ")[1];
  const date = Date(user?.metadata?.lastLoginAt).split(" ")[2];
  const year = Date(user?.metadata?.lastLoginAt).split(" ")[3];

  return (
    <div className="my-20">
      <SectionHeading title={"My Profile"}></SectionHeading>

      {loading ? (
        <div className="flex items-center justify-center mt-14">
          <CirclesWithBar
            height="100"
            width="100"
            color="#323377"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            outerCircleColor=""
            innerCircleColor=""
            barColor=""
            ariaLabel="circles-with-bar-loading"
          />
        </div>
      ) : (
        <div className="max-w-5xl mx-auto h-full mt-12 lg:px-10 xl:px-0">
          <div className="flex items-center gap-8 flex-col-reverse lg:flex-row">
            <div className="flex-1 space-y-8 scale-90 lg:scale-100">
              <div>
                <span className="text-gray-400 font-bold">user name :</span>
                <h3 className="font-bold text-2xl"> {user?.displayName} </h3>
              </div>
              <div>
                <span className="text-gray-400 font-bold">email :</span>
                <h3 className="font-bold text-2xl"> {user?.email} </h3>
              </div>
              <div>
                <span className="text-gray-400 font-bold">last login :</span>
                <h3 className="font-bold text-2xl">
                  {" "}
                  {`${month} ${date} , ${year}`}{" "}
                </h3>
              </div>
              <div>
                <EditProfile></EditProfile>
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center gap-5">
              <div></div>
              <img
                className="mx-auto w-[15rem] h-[15rem] object-cover rounded-full"
                src={user?.photoURL}
                alt="user-profile"
              />
              {isAgentLoading || isAdminLoading ? (
                <></>
              ) : isAgentData.isAgent || isAdmin ? (
                <div>
                  <h3 className="font-semibold bg-black text-white px-5 py-1 rounded-lg text-md">
                    {isAgentData.isAgent && "Agent"}
                    {isAdmin && "Admin"}
                  </h3>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;

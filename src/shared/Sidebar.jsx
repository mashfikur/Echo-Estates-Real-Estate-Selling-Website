import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import useCheckAgent from "../hooks/useCheckAgent";
import { Bars } from "react-loader-spinner";

const Sidebar = () => {
  const { userSignOut } = useAuth();
  const [isAgentData, isAgentLoading] = useCheckAgent();

  const handleSignOut = () => {
    userSignOut().then(() => {
      toast.success("Logged Out Successfully");
    });
  };

  return (
    <div className="bg-[#323377] text-white text-lg min-h-screen">
      <div className="flex flex-col text-sm lg:text-base px-8 py-12 space-y-6 font-semibold">
        <NavLink to="/dashboard">
          <h3 className="text-3xl font-playfair underline">Dashboard</h3>
        </NavLink>
        {isAgentLoading ? (
          <Bars
            height="80"
            width="80"
            color="#fff"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : isAgentData?.isAgent ? (
          <>
            <NavLink
              className={({ isActive }) => (isActive ? "sideLink" : "")}
              to="/dashboard/my-profile"
            >
              Agent Profile
            </NavLink>{" "}
            <NavLink
              className={({ isActive }) => (isActive ? "sideLink" : "")}
              to="/dashboard/add-property"
            >
              Add Property
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "sideLink" : "")}
              to="/dashboard/added-properties"
            >
              My Added Properties
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "sideLink" : "")}
              to="/dashboard/sold-properties"
            >
              My Sold properties
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "sideLink" : "")}
              to="/dashboard/requested-properties"
            >
              Requested properties
            </NavLink>
          </>
        ) : (
          <>
            {" "}
            <NavLink
              className={({ isActive }) => (isActive ? "sideLink" : "")}
              to="/dashboard/my-profile"
            >
              My Profile
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "sideLink" : "")}
              to="/dashboard/wishlist"
            >
              Wishlist
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "sideLink" : "")}
              to="/dashboard/propeties-bought"
            >
              Property Bought
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "sideLink" : "")}
              to="/dashboard/my-reviews"
            >
              My Reviews
            </NavLink>
          </>
        )}

        <hr />
        <NavLink to="/">Home</NavLink>
        <NavLink to="/all-propeties">All Properties</NavLink>
        <button
          onClick={handleSignOut}
          className="btn rounded-full bg-red-500 border-none text-white font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

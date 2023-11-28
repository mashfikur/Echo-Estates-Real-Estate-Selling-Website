import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import Links from "../components/Navbar/Links";
import HomeIcon from "@mui/icons-material/Home";
import ClearAllIcon from "@mui/icons-material/ClearAll";

const Sidebar = () => {
  const { userSignOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    userSignOut().then(() => {
      toast.success("Logged Out Successfully");
      navigate("/");
    });
  };

  return (
    <div className="bg-[#323377] text-white text-lg min-h-screen">
      <div className="flex flex-col text-sm lg:text-base px-8 py-12 space-y-6 font-semibold">
        <NavLink to="/dashboard">
          <h3 className="text-3xl font-playfair underline">Dashboard</h3>
        </NavLink>
        {/* condtional links */}
        <Links></Links>
        <hr />
        {/* common links */}
        <NavLink to="/">
          {" "}
          <span className="flex items-center gap-2">
            <HomeIcon></HomeIcon> Home
          </span>
        </NavLink>
        <NavLink to="/all-properties">
          {" "}
          <span className="flex items-center gap-2">
            <ClearAllIcon></ClearAllIcon> All Properties
          </span>
        </NavLink>
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

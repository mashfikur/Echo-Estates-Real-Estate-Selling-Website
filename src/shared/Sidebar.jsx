import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-[#323377] text-white text-lg min-h-screen">
      <div className="flex flex-col px-8 py-12 space-y-6 font-semibold">
        <NavLink to="/dashboard">
          <h3 className="text-3xl font-playfair underline">Dashboard</h3>
        </NavLink>
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
        <hr />
        <NavLink to="/">Home</NavLink>
        <NavLink to="/all-propeties">All Properties</NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

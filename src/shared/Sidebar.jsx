import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-[#323377] text-white text-lg min-h-screen">
      <div className="flex flex-col px-8 py-12 space-y-6 font-semibold">
        <NavLink>My Profile</NavLink>
        <NavLink>Wishlist</NavLink>
        <NavLink>Property Bought</NavLink>
        <NavLink>My Reviews</NavLink>
        <NavLink to="/">Home</NavLink>
        <NavLink>All Properties</NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

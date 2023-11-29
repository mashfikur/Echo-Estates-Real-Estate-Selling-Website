import { List } from "@mui/material";
import { NavLink } from "react-router-dom";
import useCheckAgent from "../../hooks/useCheckAgent";
import { Bars } from "react-loader-spinner";
import useCheckAdmin from "../../hooks/useCheckAdmin";

const Links = () => {
  const [isAgentData, isAgentLoading] = useCheckAgent();
  const [isAdmin, isAdminLoading] = useCheckAdmin();
  return (
    <div>
      {isAgentLoading || isAdminLoading ? (
        <Bars
          height="80"
          width="80"
          color="#8B9BC1"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : isAgentData?.isAgent ? (
        // agent links
        <List className="flex flex-col space-y-5  ">
          <NavLink
            className={({ isActive }) => (isActive ? "miniLink" : "")}
            to="/dashboard/my-profile"
          >
            Agent Profile
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "miniLink" : "")}
            to="/dashboard/add-property"
          >
            Add Property
          </NavLink>
          <NavLink
            to="/dashboard/added-properties"
            className={({ isActive }) => (isActive ? "miniLink" : "")}
          >
            My Added Properties
          </NavLink>
          <NavLink
            to="/dashboard/sold-properties"
            className={({ isActive }) => (isActive ? "miniLink" : "")}
          >
            My Sold Properties
          </NavLink>
          <NavLink
            to="/dashboard/requested-properties"
            className={({ isActive }) => (isActive ? "miniLink" : "")}
          >
            Requested Properties
          </NavLink>
        </List>
      ) : isAdmin ? (
        // admin links
        <List className="flex flex-col space-y-5  ">
          <NavLink
            className={({ isActive }) => (isActive ? "miniLink" : "")}
            to="/dashboard/my-profile"
          >
            Admin Profile
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "miniLink" : "")}
            to="/dashboard/manage-properties"
          >
            Manage Properties
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "miniLink" : "")}
            to="/dashboard/advertise-properties"
          >
            Advertise Properties
          </NavLink>
          <NavLink
            to="/dashboard/manage-users"
            className={({ isActive }) => (isActive ? "miniLink" : "")}
          >
            Manage Users
          </NavLink>
          <NavLink
            to="/dashboard/manage-reviews"
            className={({ isActive }) => (isActive ? "miniLink" : "")}
          >
            Manage Reviews
          </NavLink>
        </List>
      ) : (
        // user links
        <List className="flex flex-col space-y-5  ">
          <NavLink
            className={({ isActive }) => (isActive ? "miniLink" : "")}
            to="/dashboard/my-profile"
          >
            My Profile
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "miniLink" : "")}
            to="/dashboard/wishlist"
          >
            Wishlist
          </NavLink>
          <NavLink
            to="/dashboard/property-bought"
            className={({ isActive }) => (isActive ? "miniLink" : "")}
          >
            Property Bought
          </NavLink>
          <NavLink
            to="/dashboard/my-reviews"
            className={({ isActive }) => (isActive ? "miniLink" : "")}
          >
            My Reviews
          </NavLink>
        </List>
      )}
    </div>
  );
};

export default Links;

import { List } from "@mui/material";
import { NavLink } from "react-router-dom";
import useCheckAgent from "../../hooks/useCheckAgent";
import { Bars } from "react-loader-spinner";

const Links = () => {
  const [isAgentData, isAgentLoading] = useCheckAgent();
  return (
    <div>
      {isAgentLoading ? (
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
            My Sold properties
          </NavLink>
          <NavLink
            to="/dashboard/requested-properties"
            className={({ isActive }) => (isActive ? "miniLink" : "")}
          >
            Requested properties
          </NavLink>
        </List>
      ) : (
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
            to="/demo"
            className={({ isActive }) => (isActive ? "miniLink" : "")}
          >
            Property Bought
          </NavLink>
          <NavLink
            to="/demo"
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

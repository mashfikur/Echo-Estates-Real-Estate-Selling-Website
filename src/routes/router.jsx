import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import MyProfile from "../pages/User/MyProfile";
import Wishlist from "../pages/User/Wishlist";
import DefaultDashboard from "../pages/DefaultDashboard";
import PrivateRoute from "./PrivateRoute";
import AddProperty from "../pages/Agent/AddProperty";
import MyAddedProperties from "../pages/Agent/MyAddedProperties";
import AllProperties from "../pages/AllProperties";
import AgentRoute from "./AgentRoute";
import PropertyDetails from "../pages/PropertyDetails";
import MakeOffer from "../pages/User/MakeOffer";
import ManageUsers from "../pages/Admin/ManageUsers";
import ManageProperties from "../pages/Admin/ManageProperties";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/all-properties",
        element: (
          <PrivateRoute>
            <AllProperties></AllProperties>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-properties/property/details/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails></PropertyDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DefaultDashboard></DefaultDashboard>,
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist></Wishlist>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/wishlist/make-offer/:id",
        element: (
          <PrivateRoute>
            <MakeOffer></MakeOffer>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-property",
        element: (
          <AgentRoute>
            <AddProperty></AddProperty>
          </AgentRoute>
        ),
      },
      {
        path: "/dashboard/added-properties",
        element: (
          <AgentRoute>
            <MyAddedProperties></MyAddedProperties>
          </AgentRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers></ManageUsers>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-properties",
        element: (
          <PrivateRoute>
            <ManageProperties></ManageProperties>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;

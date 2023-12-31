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
import AdvertiseProperty from "../pages/Admin/AdvertiseProperty";
import AdminRoute from "./AdminRoute";
import UpdateProperty from "../pages/Agent/UpdateProperty";
import PropertyBought from "../pages/User/PropertyBought";
import RequestedProperties from "../pages/Agent/RequestedProperties";
import MyReviews from "../pages/User/MyReviews";
import ManageReviews from "../pages/Admin/ManageReviews";
import Payment from "../pages/User/Payment";
import MySoldProperties from "../pages/Agent/MySoldProperties";
import Blogs from "../pages/Blogs";

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
        path: "/blogs",
        element: <Blogs></Blogs>,
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
        path: "/dashboard/property-bought",
        element: (
          <PrivateRoute>
            <PropertyBought></PropertyBought>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
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
        path: "/dashboard/update-property/:id",
        element: (
          <AgentRoute>
            <UpdateProperty></UpdateProperty>
          </AgentRoute>
        ),
      },
      {
        path: "/dashboard/requested-properties",
        element: (
          <AgentRoute>
            <RequestedProperties></RequestedProperties>
          </AgentRoute>
        ),
      },
      {
        path: "/dashboard/sold-properties",
        element: (
          <AgentRoute>
            <MySoldProperties></MySoldProperties>
          </AgentRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-properties",
        element: (
          <AdminRoute>
            <ManageProperties></ManageProperties>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-reviews",
        element: (
          <AdminRoute>
            <ManageReviews></ManageReviews>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/advertise-properties",
        element: (
          <AdminRoute>
            <AdvertiseProperty></AdvertiseProperty>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;

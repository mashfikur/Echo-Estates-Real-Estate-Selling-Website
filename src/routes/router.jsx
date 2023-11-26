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
    element: <Dashboard></Dashboard>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard",
        element: <DefaultDashboard></DefaultDashboard>,
      },
      {
        path: "/dashboard/my-profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "/dashboard/wishlist",
        element: <Wishlist></Wishlist>,
      },
    ],
  },
]);

export default router;

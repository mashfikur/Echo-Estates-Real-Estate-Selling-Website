import { Outlet } from "react-router-dom";
import Sidebar from "../shared/Sidebar";
import ResponsiveBar from "../shared/ResponsiveBar";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <div className=" hidden md:grid-cols-12   md:grid ">
        <div className=" md:col-span-3 xl:col-span-2">
          <Sidebar></Sidebar>
        </div>
        <div className=" md:col-span-9 xl:col-span-10">
          <Outlet></Outlet>
        </div>
      </div>

      {/* smaller devices */}
      <div className="md:hidden">
        <div className="py-2 px-3 bg-main">
          <ResponsiveBar></ResponsiveBar>
        </div>

        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;

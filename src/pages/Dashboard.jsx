import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen mt-20">
      <h3 className="text-center font-bold text-3xl">Welcome to Dashboard</h3>
      <Outlet></Outlet>
    </div>
  );
};

export default Dashboard;

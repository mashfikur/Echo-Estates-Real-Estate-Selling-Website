import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { BallTriangle } from "react-loader-spinner";
import { Navigate, useLocation } from "react-router-dom";
import useCheckAdmin from "../hooks/useCheckAdmin";
import toast from "react-hot-toast";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useCheckAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#505690"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }

  toast.error("You are not allowed to this route");

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;

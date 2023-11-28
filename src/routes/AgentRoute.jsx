import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { BallTriangle } from "react-loader-spinner";
import { Navigate, useLocation } from "react-router-dom";
import useCheckAgent from "../hooks/useCheckAgent";
import toast from "react-hot-toast";


const AgentRoute = ({ children }) => {
  const { user, loading,userSignOut } = useAuth();
  const [isAgentData, isAgentLoading] = useCheckAgent();
  const location = useLocation();

  if (loading || isAgentLoading) {
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

  if (user && isAgentData?.isAgent) {
    return children;
  }

  userSignOut()
  toast.error("Your are not allowed , Login first");

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

AgentRoute.propTypes = {
  children: PropTypes.node,
};

export default AgentRoute;

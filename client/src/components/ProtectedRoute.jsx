import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin = false }) => {
  const user = localStorage.getItem("token");

  if (!user) return <Navigate to="/login" />;
  if (isAdmin && user.role !== "admin") return <Navigate to="/dashboard" />;

  return <Outlet />;
};

export default ProtectedRoute;

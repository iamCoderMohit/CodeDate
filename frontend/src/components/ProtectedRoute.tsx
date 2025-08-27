import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactElement;
  isAuthenticated: boolean;
}

function ProtectedRoute({ children, isAuthenticated }: ProtectedRouteProps) {
  if (!isAuthenticated) {
    // if not logged in, redirect to login
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;

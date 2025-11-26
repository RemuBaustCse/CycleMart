/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "../redux/features/hooks";
import { useCurrentToken } from "../redux/features/auth/authSlice";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = useAppSelector(useCurrentToken);
  const location = useLocation();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setUserRole(decodedToken?.role || null);
      } catch (error:any) {
        toast.error(error.errorMessage)
        setUserRole(null);
      }
    }
    setLoading(false);
  }, [token]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If user is trying to access /dashboard directly, redirect them based on role
  if (location.pathname === "/dashboard") {
    return <Navigate to={userRole === "admin" ? "/dashboard/admin" : "/dashboard/user"} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

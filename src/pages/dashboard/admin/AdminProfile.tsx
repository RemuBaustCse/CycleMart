/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/features/hooks";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { logOut } from "../../../redux/features/auth/authSlice";

const AdminProfile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
    const { token } = useAppSelector((state) => state.auth);
  
  const [userRole, setUserRole] = useState<string>("customer");

  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (userRole === "admin") {
      navigate("/dashboard/admin");
    }
  }, [userRole, navigate]);
  useEffect(() => {
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setUserRole(decodedToken?.role || "customer");
      } catch (error: any) {
        toast.error(error.errorMessage);
      }
    }
    setLoading(false);
  }, [token]);
  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div className="navbar-end">
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : token ? (
        <button
          onClick={handleLogOut}
          className="btn bg-black text-white"
        >
          Logout
        </button>
      ) : (
        <a href="/login" className="btn bg-yellow-400 hover:bg-yellow-500">
          Login
        </a>
      )}
    </div>
  );
};

export default AdminProfile;

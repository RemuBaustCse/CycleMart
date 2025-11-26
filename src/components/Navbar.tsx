/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logOut } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/features/hooks";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import Logo from "./Logo";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
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

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="sticky h-8 top-0 z-40 bg-yellow-50 navbar rounded-md w-11/12 mx-auto mb-4">
      {/* Navbar Start */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a
                href="/"
                className={isActive("/") ? "bg-yellow-400 font-bold" : ""}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/products"
                className={
                  isActive("/products") ? "bg-yellow-400 font-bold" : ""
                }
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="/about"
                className={isActive("/about") ? "bg-yellow-400 font-bold" : ""}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/blogs"
                className={isActive("/blogs") ? "bg-yellow-400 font-bold" : ""}
              >
                Blogs
              </a>
            </li>
            <li>
              <a
                href="/faq"
                className={isActive("/faq") ? "bg-yellow-400 font-bold" : ""}
              >
                Faq
              </a>
            </li>

            {userRole === "admin" && (
              <li>
                <a
                  href="/dashboard/admin"
                  className={
                    isActive("/dashboard/admin")
                      ? "bg-yellow-400 font-bold"
                      : ""
                  }
                >
                  Admin Dashboard
                </a>
              </li>
            )}
            {userRole === "customer" && (
              <li>
                <a
                  href="/dashboard/user"
                  className={
                    isActive("/dashboard/user") ? "bg-yellow-400 font-bold" : ""
                  }
                >
                  Customer Dashboard
                </a>
              </li>
            )}
          </ul>
        </div>
        <Logo></Logo>
      </div>

      {/* Navbar Center (Desktop Menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a
              href="/"
              className={isActive("/") ? "bg-yellow-400 font-bold" : ""}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/products"
              className={isActive("/products") ? "bg-yellow-400 font-bold" : ""}
            >
              Products
            </a>
          </li>
          <li>
            <a
              href="/about"
              className={isActive("/about") ? "bg-yellow-400 font-bold" : ""}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/blogs"
              className={isActive("/blogs") ? "bg-yellow-400 font-bold" : ""}
            >
              Blogs
            </a>
          </li>
          <li>
            <a
              href="/faq"
              className={isActive("/faq") ? "bg-yellow-400 font-bold" : ""}
            >
              FAQ
            </a>
          </li>

          {userRole === "admin" && (
            <li>
              <a
                href="/dashboard/admin"
                className={
                  isActive("/dashboard/admin") ? "bg-yellow-400 font-bold" : ""
                }
              >
                Admin Dashboard
              </a>
            </li>
          )}
          {userRole === "customer" && (
            <li>
              <a
                href="/dashboard/user"
                className={
                  isActive("/dashboard/user") ? "bg-yellow-400 font-bold" : ""
                }
              >
                Customer Dashboard
              </a>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end">
        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : token ? (
          <button
            onClick={handleLogOut}
            className="btn bg-yellow-400 hover:bg-yellow-500"
          >
            Logout
          </button>
        ) : (
          <a href="/login" className="btn bg-yellow-400 hover:bg-yellow-500">
            Login
          </a>
        )}
      </div>
    </div>
  );
};

export default Navbar;

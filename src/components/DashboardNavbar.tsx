// src/components/DashboardNavbar.tsx
import { Link } from "react-router-dom";

const DashboardNavbar = () => {
  return (
    <nav className="bg-yellow-400 text-black px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline font-medium">Home</Link>
        <Link to="/dashboard/customer" className="hover:underline font-medium">Customer</Link>
        <Link to="/dashboard/admin" className="hover:underline font-medium">Admin</Link>
      </div>
    </nav>
  );
};

export default DashboardNavbar;

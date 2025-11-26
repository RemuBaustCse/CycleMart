
import { useState, useEffect } from "react";
import ManageUsers from "./ManageUsers";
import ManageProducts from "./ManageProducts";
import ManageOrders from "./ManageOrders";
import { Menu } from "lucide-react";
import AdminProfile from "./AdminProfile";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem("adminActiveTab") || "users";
  });
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("adminActiveTab", activeTab);
  }, [activeTab]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed z-40 top-0 left-0 h-full w-1/6 bg-gray-900 text-white p-5 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:relative md:translate-x-0 md:flex-shrink-0`}
      >
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-3">
          <li>
            <button
              className={`w-full text-left p-2 rounded-md ${
                activeTab === "users" ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
              onClick={() => {
                setActiveTab("users");
                setSidebarOpen(false); // Close sidebar on mobile after selection
              }}
            >
              Manage Users
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded-md ${
                activeTab === "products" ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
              onClick={() => {
                setActiveTab("products");
                setSidebarOpen(false);
              }}
            >
              Manage Products
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded-md ${
                activeTab === "orders" ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
              onClick={() => {
                setActiveTab("orders");
                setSidebarOpen(false);
              }}
            >
              Manage Orders
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded-md ${
                activeTab === "profile" ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
              onClick={() => {
                setActiveTab("profile");
                setSidebarOpen(false);
              }}
            >
              Profile
            </button>
          </li>
        </ul>
      </div>

      {/* Overlay on mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto w-full">
        {/* Mobile menu button */}
        <button
          className="md:hidden mb-4 inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="w-5 h-5" />
          Menu
        </button>

        {activeTab === "users" && <ManageUsers />}
        {activeTab === "products" && <ManageProducts />}
        {activeTab === "orders" && <ManageOrders />}
        {activeTab === "profile" && <AdminProfile />}
      </div>
    </div>
  );
};

export default AdminDashboard;

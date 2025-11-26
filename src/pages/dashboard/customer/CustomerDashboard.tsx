import { useState } from "react";
import ViewOrders from "./ViewOrders";
import ManageProfile from "./ManageProfile";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Address from "./Address";

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate()

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-black text-white p-5 space-y-4 shadow-lg transition-transform duration-300 lg:relative lg:translate-x-0 
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <h2 className="text-2xl font-bold border-b-2 border-yellow-400 pb-2">
          User Dashboard
        </h2>
        <ul className="space-y-3">
          <li>
            <button
              className={`w-full text-left p-2 rounded-md transition-all duration-300 ${
                activeTab === "Home"
                  ? "bg-yellow-500 text-black font-bold"
                  : "hover:bg-yellow-400 hover:text-black"
              }`}
              onClick={() => {
                // setActiveTab("orders");
                navigate('/')
                setIsSidebarOpen(false);
              }}
            >
              Home
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded-md transition-all duration-300 ${
                activeTab === "orders"
                  ? "bg-yellow-500 text-black font-bold"
                  : "hover:bg-yellow-400 hover:text-black"
              }`}
              onClick={() => {
                setActiveTab("orders");
                setIsSidebarOpen(false);
              }}
            >
              View Orders
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded-md transition-all duration-300 ${
                activeTab === "profile"
                  ? "bg-yellow-500 text-black font-bold"
                  : "hover:bg-yellow-400 hover:text-black"
              }`}
              onClick={() => {
                setActiveTab("profile");
                setIsSidebarOpen(false);
              }}
            >
              Manage Profile
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 rounded-md transition-all duration-300 ${
                activeTab === "address"
                  ? "bg-yellow-500 text-black font-bold"
                  : "hover:bg-yellow-400 hover:text-black"
              }`}
              onClick={() => {
                setActiveTab("address");
                setIsSidebarOpen(false);
              }}
            >
              Address
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Sidebar Toggle Button */}
      <button
        className="absolute top-4 left-4 z-50 lg:hidden btn btn-sm bg-yellow-400 hover:bg-yellow-500"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white overflow-y-auto shadow-inner border-l-4 border-yellow-400">
        {activeTab === "orders" && <ViewOrders />}
        {activeTab === "profile" && <ManageProfile />}
        {activeTab === "address" && <Address />}

      </div>
    </div>
  );
};

export default CustomerDashboard;

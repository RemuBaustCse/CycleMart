import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  useEffect(() => {
      document.title = "Dashboard | Bi-Cycle Store";
    }, []);
return (
  <div>
    <Outlet /> 
  </div>
);
};

export default DashboardLayout;

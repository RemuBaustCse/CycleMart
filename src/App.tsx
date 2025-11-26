import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";
import BikeDetails from "./pages/BikeDetails";
import Checkout from "./pages/Checkout";
import Bicycles from "./pages/Bicycles";
import Dashboard from "./pages/dashboard/Dashboard";
import CustomerDashboard from "./pages/dashboard/customer/CustomerDashboard";
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import Products from "./pages/dashboard/customer/Products";
import BlogDetail from "./pages/BlogDetails";
import Blogs from "./pages/Blog";
import Faq from "./pages/Faq";
// import moduleName from './pages/'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "bicycles", element: <Bicycles /> },
      { path: "about", element: <About /> },
      { path: "products", element: <Products /> },
      { path: "blog/:id", element: <BlogDetail /> },
      { path: "blogs", element: <Blogs /> },
      { path: "faq", element: <Faq></Faq>},

      { path: "products/:id", element: <BikeDetails /> },
      {
        path: "products/checkout/:id",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Dashboard /> },
      { path: "user", element: <CustomerDashboard /> },
      { path: "admin", element: <AdminDashboard /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

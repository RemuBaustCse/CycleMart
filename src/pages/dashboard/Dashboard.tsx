import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/features/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const Dashboard = () => {
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    navigate("/dashboard/admin");
  }, [user, navigate]);

  return <div>Redirecting...</div>;
};

export default Dashboard;

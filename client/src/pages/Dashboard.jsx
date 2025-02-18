import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import api from "../utils/api";
import UserProfile from "./UserProfile";
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/users/me");
        setUser(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader color="#3B82F6" />
      </div>
    );
  }

  return (
    <>
      <div className="p-4">
        {user.role === "admin" ? (
          <AdminDashboard />
        ) : (
          <UserProfile user={user} />
        )}
      </div>
    </>
  );
};

export default Dashboard;

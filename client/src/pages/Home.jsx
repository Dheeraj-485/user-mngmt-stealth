import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../utils/api";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await api.get("/users/me");
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold text-blue-600">
          Welcome to User Management
        </h1>
        {user ? (
          <p>
            Welcome Back, {user.name} ({user.role})
          </p>
        ) : (
          <p className="mt-4 text-gray-600">
            Please login or signup to continue.
          </p>
        )}
      </div>
    </>
  );
};

export default Home;

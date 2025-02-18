import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);

    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold">
        User Management
      </Link>
      <div>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="mr-4">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className="mr-4">
              Signup
            </Link>
            <Link to="/login" className="bg-blue-500 px-3 py-1 rounded">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

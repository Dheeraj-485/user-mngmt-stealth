import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "user" });

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (err) {
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [users, loading]);

  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  const handleCreateUser = async () => {
    try {
      setIsSubmitting(true);
      const response = await api.post("/users", newUser);
      setUsers((prev) => [...prev, response.data]);
      toast.success("User created successfully.");
      setIsModalOpen(false);
      setNewUser({ name: "", email: "", role: "user" });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create user");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader color="#3B82F6" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Admin Dashboard
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          + Create User
        </button>

        {/* Create User Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Create User</h2>
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
                className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mr-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  disabled={isSubmitting ? true : false}
                  onClick={handleCreateUser}
                  className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
                >
                  {isSubmitting ? "Wait..." : "Create"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Users List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <p className="font-semibold text-lg text-gray-800">{user.name}</p>
              <p className="text-gray-600">{user.email}</p>
              <p
                className={`text-sm mt-2 font-bold ${
                  user.role === "admin" ? "text-red-500" : "text-green-500"
                }`}
              >
                {user?.role?.toUpperCase()}
              </p>
              <button
                onClick={() => deleteUser(user._id)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition duration-300 w-full"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

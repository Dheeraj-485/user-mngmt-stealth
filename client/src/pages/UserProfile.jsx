import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import api from "../utils/api";
import Navbar from "../components/Navbar";

const UserProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await api.put(`/users/${user._id}`, data);
      toast.success("Profile updated successfully");
      setIsEditing(false);
      reset(response.data);
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onChangePassword = async (data) => {
    try {
      setIsSubmitting(true);
      await api.put(`/users/${user._id}/change-password`, data);
      toast.success("Password changed successfully");
      setIsChangingPassword(false);
    } catch (err) {
      toast.error("Failed to change password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                {...register("email", { required: "Email is required" })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="mr-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
              >
                {isSubmitting ? "Wait..." : "Save"}
              </button>
            </div>
          </form>
        ) : (
          <div>
            <p className="text-gray-700">Name: {user.name}</p>
            <p className="text-gray-700">Email: {user.email}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Edit Profile
            </button>
            <button
              onClick={() => setIsChangingPassword(true)}
              className="mt-4 bg-green-600 text-white p-2 rounded hover:bg-green-700 transition duration-300 ml-2"
            >
              Change Password
            </button>
          </div>
        )}

        {isChangingPassword && (
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Change Password</h3>
            <form onSubmit={handleSubmit(onChangePassword)}>
              <div className="mb-4">
                <label className="block text-gray-700">New Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(false)}
                  className="mr-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
                >
                  {isSubmitting ? "Wait..." : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;

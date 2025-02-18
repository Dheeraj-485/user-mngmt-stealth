import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import { useState } from "react";

const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await api.post("/auth/signup", data);
      toast.success("Signup successful");

      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-lg w-96"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
          <div className="mb-4">
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Name"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Admin super secret key  to create admin account but not a good approach */}
          {/* <div className="mb-6">
            <input
              {...register("adminSecret")}
              type="text"
              placeholder="Enter Super secret for admin role"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {errors.adminSecret && (
              <p className="text-red-500 text-sm mt-1">
                {errors.adminSecret.message}
              </p>
            )}
          </div> */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
          >
            {isSubmitting ? "Wait..." : "Signup"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/auth/login", formData);
      console.log("res", res);
      if (res.status == 200) {
        localStorage.setItem("token", res.data.token);
        toast.success(res.data.message || "Login Successfully");
        // alert(res.data.message)
        navigate("/");
        setFormData({
          email: "",
          password: "",
        });
      } 
    //   else {
    //     toast.error(res.data.message || "Internal Server Error");
    //   }
    } catch (error) {
      console.error("error on login", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <div className="p-8 shadow-lg bg-white rounded-xl w-[350px]">
        <h1 className="font-bold text-3xl mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="px-4 py-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none"
          />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="text-sm text-center mt-4">
          Don't have an account?
          <Link
            to="/signup"
            className="text-indigo-600 font-medium hover:underline ml-1"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

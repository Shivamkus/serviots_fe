import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: "",
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate()

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axiosInstance.post("/auth/register", formData);
      console.log("res", res);
      if(res.status == 201){
        toast.success(res.data.message)
        
        setFormData({
            name: '',
            email: '',
            password: ''
        })

        navigate('/login')
      }
    } catch (error) {
      console.error("error on Signup", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <div className="p-8 shadow-lg bg-white rounded-xl w-[350px]">
        <h1 className="font-bold text-3xl mb-6 text-center">Signup</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="px-4 py-2 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none"
          />

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

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Signup
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="text-sm text-center mt-4">
          Already have an account?
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

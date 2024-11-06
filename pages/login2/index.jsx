import React, { useEffect, useState } from "react";
import Link from "next/link";
import logo from "./logo.jpg";
import { toast } from 'react-toastify';
import Modal from "./Modal";
import Signup from "./Signup";
import Image from "next/image";

import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "../Navbar/Navbar";


const Login2 = () => {
  const [isThirdstepOpen, setThirdstepOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Email and Password are required");
      return;
    }

    try {
      const response = await axios.post(
        'https://api.resumeintellect.com/api/user/auth/login',
        formData,
      );

      if (response.status === 200) {
        console.log(response);
        console.log("Token", response.data.data.token);
        localStorage.setItem("token", response.data.data.token);
        toast.success(`${response.data.message}`|| "Login Successfully")
router.push("/dashboard/page");
      } else {
        toast.error("Failed to login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  return (
    <>
    <Navbar/>
      <div className="flex justify-center items-center h-screen w-full">
        <div className="p-8 rounded-xl shadow-lg shadow-slate-700 w-full max-w-lg bg-white">
          <div className="flex justify-center mb-6">
            <Image src={logo} className="w-40 h-10" alt="Logo" />
          </div>
          <div className="text-2xl text-black text-center font-bold mb-4">
            Welcome Back
          </div>
          <p className="text-black text-base text-center mb-6">
            People across the globe are joining us to upgrade their career with our Robust AI.
          </p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-black mb-2">Email ID</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter your email ID"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-black mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Toggle between "text" and "password" types
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? "🕵🏻 Hide " : "👁 View"}
                </button>
              </div>
            </div>
            <div className="text-center py-2">
              <button
                type="button"
                className="text-blue-500 hover:text-yellow-500"
                onClick={() => setThirdstepOpen(true)}
              >
                New User? Create Account
              </button>
            </div>
            <div className="text-center py-2">
              <Link href="/forgotpassword">
                <label className="text-black cursor-pointer">Forgot Password?</label>
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <Modal isOpen={isThirdstepOpen} onClose={() => setThirdstepOpen(false)}>
        <Signup />
      </Modal>
    </>
  );
}

export default Login2;
